# UI_BLOCK — GLOBAL UI SPEC (A + B + C) (NO-LOGIC)
Status: DRAFT · Version: v1.0-ui
Scope: UI only (layout + controls + mapping to JSON). NO business logic.
Owner: RefGen UI Layer
Single Source of Truth: UI behavior and UI→Spec mapping. (Core logic stays in Block A/B/C)

---

## 0) Purpose
UI_BLOCK defines the unified interface that “covers” Block A + Block B + Block C.

UI_BLOCK:
- renders controls and panels
- provides input validation (UI-level)
- maps UI fields to JSON specs (A/B/C)
- shows read-only versioning header
- controls pipeline flags (use_text/use_image/export options)

UI_BLOCK NEVER:
- redefines identity/styling/output logic
- changes invariants (Block A)
- stores canonical truth (A/B/C files are canonical)

---

## 1) Global Layout (Shell)
### 1.1 Header (top bar)
Elements (left → right):
1) Project / Workspace label (read-only): `RefGen / Antigravity`
2) Active Character selector (Character ID + Name)
3) Active Mode selector (Model + Mode: Pro/Flash/etc.)
4) Global Versioning Header (read-only, 4 fields):
   - A: identity_spec_version
   - B: shot_spec_version
   - C: workflow_version
   - UI: ui_spec_version
5) Language switch (UI locale):
   - RU / EN / DE
6) Save / Export shortcuts (icons):
   - Save Draft
   - Export Package
7) System status indicator:
   - Vision: ON
   - Validation: ON
   - Storage: OK

### 1.2 Main body (3 zones)
- Left Sidebar: Block navigation + presets + library
- Center Canvas: prompt composer + preview/result gallery
- Right Sidebar: Context inspector + JSON preview + QC results

Rule: UI keeps strict separation:
- Block A panel
- Block B panel
- Block C panel
But user can navigate via tabs.

---

## 2) Navigation (Left Sidebar)
### 2.1 Block tabs
- TAB A: Identity
- TAB B: Styling / Scene / Pose / Objects
- TAB C: Output / QC / Export

### 2.2 Preset Library
- B1 Presets list (filterable)
- Camera angle presets (filterable)
- Scene templates (optional)
- Recent used presets

### 2.3 Asset Library
- Identity refset thumbnails (A)
- Visual refs (B2)
- Output history (C)

---

## 3) Center Canvas (Composer + Preview)
### 3.1 Composer sections
A) Instruction (text)
- high-level request (“Generate image …”)
- should remain neutral, non-triggering

B) Structured JSON panel (collapsed by default)
- shows composed JSON payload assembled from A/B/C state
- copy button

C) Attachments row
- drag-drop images (identity refs / B2 refs)
- shows role chips per image

### 3.2 Preview / Results
- result gallery grid
- click → open inspector (Right Sidebar)
- actions: download, mark favorite, add to pack

---

## 4) Block A UI (Identity) — Panel Spec
### 4.1 Identity header
Fields:
- Character ID (text, required)
- Character Name (text, recommended)
- Refset ID (text, required)
- Allowed variations (multiselect toggles, optional)

### 4.2 Reference Set manager
Upload slots (with role + priority):
- identity_front (required) priority 1.0
- identity_3q (required) priority 0.9
- identity_profile (required) priority 0.85
- identity_body (recommended) priority 0.7

Controls:
- Replace ref (forces re-analyze)
- Lock refset (prevents accidental changes)
- Re-analyze button (manual)
- Drift warnings (from QC)

### 4.3 Semantic profile (non-biometrics)
Select fields:
- Gender (select)
- Age range (select) [cohort]
- Body type bucket (select)
- Height bucket (select)
- Skin tone bucket (select)
- Hair color (select)
- Hair length (select)
- Eye color (select)

Note: UI labels must avoid biometric language. Buckets only.

---

## 5) Block B UI (Styling) — Panel Spec
Block B is split into two UI sub-tabs:
- B1 Text Presets
- B2 Visual References

### 5.1 B1 Text Presets tab
Sections (each has a text area + preset picker):
- Camera
- Lighting / Mood
- Pose (spatial)
- Action / Interaction

Controls:
- Preset picker (select by preset_id)
- Apply preset (fills fields)
- Save as preset (creates new preset draft)
- Clear section

Important: B1 fields must not include identity descriptors.

### 5.2 B2 Visual References tab
For each role: Scene / Clothing / Pose / Object
UI block template (same structure per role):

- Role icon (scene/clothing/pose/object)
- Text field (annotation or correction)
- Image upload field
- Flags (real pipeline flags):
  - [ ] Use Text  -> maps to use_text
  - [ ] Use Image -> maps to use_image

Role-specific constraints shown as helper text:
- Scene: ignore people as identity
- Clothing: silhouette/fabric only (no brands)
- Pose: spatial only
- Object: if interaction required, add B1.4 text

### 5.3 Makeup selector (style)
- makeup_profile: none / light_natural / evening_soft
- notes field (optional)

### 5.4 Anti-trigger mode (wording guidance)
Toggle:
- anti_trigger_mode: neutral_wording (default ON)
This does NOT bypass policy; it reduces accidental triggering.

---

## 6) Automatic Vision UI behavior (B + C)
Vision is always ON by default (no user toggle).

### 6.1 When user uploads B2 image
UI shows:
- extracted tags (scene/style/lighting) as chips
- “identity extraction forbidden” notice (internal rule)
- user can accept/reject tags for use in ShotSpec notes (optional)

### 6.2 When QC runs in Block C
UI shows:
- QC vision flags: scene mismatch, style mismatch, artifact flags
- confidence scores

---

## 7) Block C UI (Output / QC / Export) — Panel Spec
Sub-tabs:
- C1 Output
- C2 QC
- C3 Reproducibility
- C4 Export

### 7.1 C1 Output
Fields (read-only per image, populated automatically):
- image_id
- created_at
- model_id + mode
- prompt_hash
- ref manifest summary
- controls_snapshot summary

Actions:
- Save as favorite
- Add to export pack
- Download single

### 7.2 C2 QC
QC controls:
- Run QC (manual)
- Auto-run QC (toggle, default ON)

Displays QCReport:
- Identity match: pass/fail + confidence + issues
- Style/scene match: pass/fail + confidence + issues
- Artifacts: issues list
- Final: status + score

### 7.3 C3 Reproducibility
UI display depends on availability:
- If seed exists: show seed (copy)
- Else: show trace_id + hashes (copy)

Note: UI must never claim deterministic reproducibility if only trace exists.

### 7.4 C4 Export / Packaging
Export options:
- Export single (PNG + sidecar JSON)
- Export selected batch
- Export ZIP package (canonical)

ZIP contents preview:
- images/
- meta/
- qc/
- specs/
- manifest.json

Device-agnostic download:
- one-click download
- user chooses destination on device

---

## 8) UI → JSON Mapping (canonical)
UI does not invent fields; it maps to A/B/C.

### 8.1 Block A mapping
- Character ID -> identity.character_id
- Character Name -> identity.character_name
- Refset ID -> identity.reference_set.refset_id
- Reference uploads -> identity.reference_set.images[]
- Semantic profile selects -> identity.semantic_profile.*

### 8.2 Block B mapping
- B1 text fields or preset refs -> shot.preset_refs + shot.camera/lighting/pose_action
- B2 flags -> shot.b2_visual_refs.<role>.use_image/use_text (+ ref_id if image present)
- Makeup profile -> shot.styling.makeup_profile
- Anti-trigger mode -> controls_snapshot.anti_trigger_mode

### 8.3 Block C mapping
- OutputRecord is created automatically from generation result
- QCReport created by QC pipeline
- Export options -> export_config

---

## 9) Validation rules (UI-level)
UI must prevent these mistakes:
- mixing identity descriptors into Block B fields
- enabling B2 “Use Image” without image attached
- enabling B2 “Use Text” with empty text (warn or auto-disable)
- missing required identity refs (front/3q/profile)
- exporting without manifest

---

## 10) Status
UI_BLOCK v1.0-ui: DRAFT
Next action: implement UI in Antigravity with strict mapping to A/B/C specs.
No UI canon decisions beyond layout + mapping are assumed here.
