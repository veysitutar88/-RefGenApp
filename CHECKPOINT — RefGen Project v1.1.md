# CHECKPOINT — RefGen Project v1.1
Date: 2026-02-03
Status: ACTIVE
Scope: Vision defaults + Post-Gen actions (no new block edits) + Canonical docs cleanup

---

## 0) Purpose
This checkpoint updates RefGen v1.0 with:
- finalized stance on Vision terminology and default behavior,
- finalized decision on post-generation actions (Regenerate + Prompt Edit only),
- canonical docs cleanup (remove legacy UI global spec ABC).

Block A/B/C source files are NOT modified in this step.

---

## 1) Vision terminology + defaults
1.1 Terminology cleanup
- Remove the term “Agentic Vision” from RefGen docs/specs/UI.
- Treat any Flash-specific agentic behaviors as provider implementation detail (“out of the box”).
- No toggle/flag/policy branching for “Agentic Vision”.

1.2 Automatic Vision (internal RefGen hooks only)
Automatic Vision is allowed ONLY as internal hooks:
A) Hook B (B2 refs, optional UX hints)
- On B2 upload: extract scene/style/lighting tags as non-blocking hint chips.
- HARD RULE: NO identity extraction from B2.
- Extracted tags MUST NOT auto-modify ShotSpec or generation inputs.

B) Hook C (QC, primary value)
- After generation: run QC vision to validate output:
  - identity match (pass/fail + confidence)
  - style/scene match (pass/fail + confidence)
  - artifact flags
- Default: QC enabled (auto-run allowed).

---

## 2) Post-generation actions (Block C addendum, without editing Block C file)
RefGen adds ONLY these post-gen actions (no masks/sketches):

2.1 Regenerate (repeat same shot)
- Action: Regenerate
- Behavior: re-run generation with the SAME composed inputs (Identity refs + ShotSpec + controls snapshot).
- UI: overlay “circular arrows” icon on result card, watermark style (semi-transparent; brighter on hover).
- Storage: persist as a new output attempt (linked to parent_image_id or parent_attempt_id).

2.2 Edit by Prompt (AI edit)
- Action: Edit by Prompt
- Behavior: take an existing generated image + text instruction → produce edited image.
- UI: overlay “magic wand / brush-pencil” icon → modal with:
  - prompt textarea (“Describe the change…”)
  - run edit
  - Save Copy (creates a new output item)
- Storage: persist edited result as a new output item linked to source_image_id.

2.3 Download / Export
- Keep existing export model:
  - single download (PNG + metadata)
  - ZIP export (images + meta + qc + manifest)

---

## 3) Explicit exclusions (final)
- NO selection masks, NO inpainting/outpainting tools.
- NO sketch/scribble/pose-by-sketch features.
- NO Vertex / Imagen integration for editing.
- No additional editor modes beyond “Edit by Prompt”.

---

## 4) Canonical docs set (hygiene)
- Remove/ignore legacy “global spec ABC” UI document from project context (has outdated artifacts).
- Canonical sources remain:
  - CHECKPOINT v1.x
  - BLOCK A (Identity)
  - BLOCK B (Styling)
  - BLOCK C (Output/QC/Export)
  - NEXT — BUILD PHASE CHECKLIST
- UI mapping/spec will be taken only from the rewritten/replacement UI doc (to be provided by owner).

---

## 5) No-change statements
- Model selector remains: Gemini 3 Pro / Gemini 3 Flash (UI).
- Block order and model-dependency for Block A remains intentionally unresolved unless updated in later checkpoints.
- No changes to existing Block A/B/C spec files in this checkpoint.
