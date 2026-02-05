# CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED)
Date: 2026-02-03
Status: ACTIVE
Scope: Vision defaults + Post-Gen actions + Model-specific IdentitySpec caching + Canonical docs cleanup
Supersedes: CHECKPOINT v1.1 (rules fully included here)

---

## 0) Purpose / Why this checkpoint exists
This checkpoint consolidates and finalizes:
1) Vision terminology and default behavior (project-level, no extra toggles).
2) Post-generation actions allowed in the system (Regenerate + Prompt Edit only).
3) IdentitySpec lifecycle resolution: model-specific IdentitySpec caching and loading on model switch.
4) Canonical docs hygiene: removing legacy/outdated UI “global spec ABC” from project context.

Important constraint:
- Block A/B/C source spec files are NOT modified in this checkpoint.
- This checkpoint is the authoritative “overlay” describing runtime behavior and allowed features.

---

## 1) Current Architecture (as of v1.2)
### 1.1 Model Mode (UI level)
- System supports selecting the active generation/analyze model mode:
  - Gemini 3 Pro
  - Gemini 3 Flash
- Model selection happens in UI via model selector and applies to:
  - Block A analysis calls (IdentitySpec creation)
  - Generation calls (image generation)
  - QC calls (vision-based QC)

### 1.2 Terminology policy (Vision words)
- The term “Agentic Vision” MUST NOT appear in RefGen docs/specs/UI.
- Any Flash-specific agentic behaviors are treated as provider implementation detail (“out of the box”).
- No project-level toggle/flag/policy branching for “Agentic Vision”.

---

## 2) Vision defaults (internal RefGen concept only)
### 2.1 Definition
“Automatic Vision” is an internal RefGen concept meaning:
- the pipeline may run vision analysis automatically at defined hook points,
- to produce tags or QC flags,
- without changing identity rules.

Automatic Vision is allowed ONLY in these hooks:

### 2.2 Hook B (Block B2 refs) — optional UX hints
When the user uploads a B2 visual reference (roles: scene / clothing / pose / object):
- The system MAY extract scene/style/lighting tags as non-blocking hint chips.

Hard rule (mandatory):
- NO identity extraction from B2.
- Even if a person/face is present in B2, it MUST NOT influence identity.

Non-impact rule (mandatory):
- Extracted tags MUST NOT auto-modify ShotSpec or generation inputs.
- Tags are hints only; ignoring them must not block the pipeline.

Performance rule (recommended):
- Hook B should be best-effort and non-blocking.
- Tags should be cached per ref_id to avoid repeated costs.

### 2.3 Hook C (Block C QC) — primary value
After any generation or edit that produces an image result:
- The system SHOULD run QC vision to validate output:
  - identity match (pass/fail + confidence)
  - style/scene match (pass/fail + confidence)
  - artifact flags (hands/face/reflective surfaces etc.)
- Default: QC enabled (auto-run allowed).

---

## 3) IdentitySpec lifecycle (resolved in v1.2)
### 3.1 Core rule
IdentitySpec is model-dependent.

### 3.2 IdentitySpec key
IdentitySpec is uniquely identified by the tuple:
- (character_id, reference_set_id, model_id/mode)

This means:
- The same character_id + reference_set_id can have multiple IdentitySpecs, one per model mode.
- These IdentitySpecs can coexist and be loaded as needed.

### 3.3 Model switch behavior
When the active model mode is changed (Pro ↔ Flash):
- If IdentitySpec exists for the selected model key:
  - load it (no re-analysis).
- If IdentitySpec does not exist for the selected model key:
  - Block A analysis MUST be executed for that model to create it
  - (pipeline must not silently guess or reuse the other model’s IdentitySpec).

### 3.4 When IdentitySpec is recreated
IdentitySpec is recreated ONLY if the reference set changes:
- new reference_set_id
- or the refset is replaced (new ref images under a new refset version)

Model switching alone does NOT force re-analyze if a cached IdentitySpec exists.

---

## 4) Character name rule (semantic anchor)
### 4.1 Rule
character_name is a semantic anchor and MUST remain stable across all generations for the same character_id.

### 4.2 Prohibited pattern
- Do NOT use "Name + Flash/Pro" as character_name.
  Example (forbidden):
  - "Anna Flash"
  - "Anna Pro"

### 4.3 Allowed labeling for model mode
Flash/Pro labeling is allowed only as:
- UI badge near the character name
- filename tag
- metadata fields (model_id + mode)
- OutputRecord / manifest fields

But NOT as a change to character_name itself.

---

## 5) Post-generation actions (final scope)
RefGen adds ONLY these post-gen actions (no masks/sketches).

### 5.1 Regenerate (repeat same shot)
Action:
- Regenerate

Behavior:
- Re-run generation with the SAME composed inputs:
  - Identity refs
  - ShotSpec
  - controls snapshot
- The purpose is to get a new attempt without changing the spec.

UI requirement:
- Overlay action icon on the result card:
  - “circular arrows” (sync/regen symbol)
- Watermark style:
  - semi-transparent by default
  - becomes brighter on hover

Storage requirement:
- Persist as a NEW output attempt
- Must be linked to original:
  - parent_image_id OR parent_attempt_id (implementation choice)
- Must persist model_id + mode in the new output record.

### 5.2 Edit by Prompt (AI edit)
Action:
- Edit by Prompt

Behavior:
- Take an existing generated image + a text instruction
- Produce an edited image as a new result

UI requirement:
- Overlay action icon on the result card:
  - “magic wand” or “brush-pencil” symbol
- Modal editor:
  - prompt textarea ("Describe the change…")
  - Run edit
  - Save Copy (creates a new output item; does not overwrite source)

Storage requirement:
- Persist edited result as a NEW output item
- Must be linked to original:
  - source_image_id
- Must persist model_id + mode for the edit call result.

### 5.3 Download / Export (existing export model kept)
Export options remain:
- Single download:
  - PNG + metadata
- ZIP export:
  - images/ + meta/ + qc/ + manifest (plus specs/ if already present in system)

---

## 6) Output labeling and reproducibility-by-pack
### 6.1 Output labeling (mandatory)
Every OutputRecord MUST persist:
- model_id + mode

This applies to:
- initial generation results
- regenerated results
- edit-by-prompt results

### 6.2 Trace packaging (mandatory)
Reproducibility-by-pack MUST include model_id + mode as part of the trace bundle / manifest.

Note:
- This checkpoint does not claim deterministic seed behavior.
- If seed is absent, trace/hashes are the reproducibility mechanism.

---

## 7) Explicit exclusions (final)
The following are explicitly NOT part of RefGen:
- NO selection masks, NO inpainting/outpainting tools.
- NO sketch/scribble/pose-by-sketch features.
- NO Vertex / Imagen integration for editing.
- No additional editor modes beyond “Edit by Prompt”.

---

## 8) Canonical docs set (hygiene)
### 8.1 Remove legacy UI global spec ABC
- Remove/ignore the legacy “global spec ABC” UI document from project context.
- It contains outdated artifacts and must not be used as source of truth.

### 8.2 Canonical sources (active set)
Canonical sources remain:
- CHECKPOINT v1.x (this file and prior versions for history)
- BLOCK A (Identity)
- BLOCK B (Styling)
- BLOCK C (Output/QC/Export)
- NEXT — BUILD PHASE CHECKLIST

UI mapping/spec source:
- Only the rewritten/replacement UI document provided by the owner (current valid UI spec).
- No other legacy UI doc is considered canonical.

---

## 9) No-change statements
- Model selector remains: Gemini 3 Pro / Gemini 3 Flash (UI).
- No mask/sketch tools.
- No Vertex integration.
- No modifications to Block A/B/C source spec files in this checkpoint.

---

## 10) Version history note
- v1.1 established:
  - Vision terminology cleanup + Automatic Vision hooks policy
  - Post-gen actions scope (Regenerate + Edit by Prompt only)
  - Canonical docs cleanup (remove legacy UI global spec ABC)
- v1.2 (this consolidated file) adds:
  - Model-specific IdentitySpec caching + loading rules
  - Output labeling requirements and stable character_name rule
