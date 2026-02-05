# PROJECT_INDEX — RefGen

Project: RefGen  
Owner: Igor  
Status: ACTIVE  
Current Phase: PRE-BUILD / SPEC FINALIZATION  
Active Checkpoint: CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md  
Last Updated: 2026-02-03  

---

## 1. SOURCE OF TRUTH

Rules:
- Active Checkpoint defines runtime behavior.
- BLOCK_A / BLOCK_B / BLOCK_C are canonical specs.
- Files marked ARCHIVE must not be used for decisions.
- Any change to logic or architecture requires a new checkpoint.
- UI Polish is a mandatory phase before launch.

---

## 2. FILE INVENTORY (CANONICAL / WORKING SET)

| File Name | Category | Status | Notes |
|---------|---------|--------|------|
| PROJECT_INDEX — RefGen.md | index | ACTIVE | authoritative file inventory |
| CHECKPOINT v1.0.md | checkpoint | HISTORY | project start |
| CHECKPOINT — RefGen Project v1.1.md | checkpoint | HISTORY | transition |
| CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md | checkpoint | ACTIVE | source of truth |
| BLOCK_A_IDENTITY.md | spec | ACTIVE | identity logic |
| BLOCK_B_STYLING.md | spec | ACTIVE | styling & refs |
| BLOCK_C_OUTPUT.md | spec | ACTIVE | output, QC, export |
| NEXT — BUILD PHASE CHECKLIST (Antigravity).md | build | ACTIVE | implementation plan |
| UI_BLOCK — GLOBAL UI SPEC A;B;C.md | legacy | ARCHIVE | do not use |
| C-Blocks-V.1.0.md | legacy | ARCHIVE | superseded |

---

## 3. ARCHITECTURE SNAPSHOT (CURRENT)

- Models:
  - Gemini 3 Pro
  - Gemini 3 Flash
- Identity:
  - IdentitySpec is model-specific
  - Cached per (character_id, reference_set_id, model_id/mode)
- Vision:
  - Automatic Vision (internal hooks only)
  - No “Agentic Vision” term, no toggles
- Post-generation actions:
  - Regenerate
  - Edit by Prompt
- Explicit exclusions:
  - No masks
  - No sketch tools
  - No Vertex / Imagen editing

---

## 4. CONTEXT LOADING RULES

Context rules:
1. Always start from Active Checkpoint.
2. Use only files marked ACTIVE.
3. Archived files are forbidden for decisions.
4. PROJECT_INDEX file inventory is authoritative.
5. No assumptions outside what is documented in ACTIVE checkpoint + ACTIVE blocks.

---

## 5. PROJECT STATUS OVERVIEW

| Area | Item | Status | Notes |
|----|----|----|----|
| Specs | Checkpoints | DONE | v1.2 consolidated is active |
| Specs | Block A / B / C | DONE | canonical |
| Runtime | IdentitySpec schema | TODO | not created |
| Runtime | OutputRecord schema | TODO | not created |
| Runtime | QC report schema | TODO | not created |
| Runtime | Export manifest | TODO | not created |
| Pipeline | Execution order | PARTIAL | described, not formalized |
| Pipeline | Model switch logic | PARTIAL | needs formal spec |
| Build | Antigravity agent plan | TODO | not started |

---

## 6. UI POLISH — MANDATORY PHASE

Definition:
UI Polish is the final operational refinement phase performed after pipeline implementation and before launch.  
It does not change architecture or specs.

### UI Polish Scope

| Area | Item | Status | Notes |
|----|----|----|----|
| Output Card | Info layout | PLANNED | name, model, QC |
| Output Card | Action icons | PLANNED | regen, edit, download |
| Actions | Regenerate UX | PLANNED | hover, disabled states |
| Actions | Edit by Prompt UX | PLANNED | modal, copy behavior |
| Feedback | Error states | PLANNED | empty, failed runs |
| Feedback | Loading states | PLANNED | async clarity |
| Locks | Disabled actions | PLANNED | prevent invalid clicks |

Rule:
- UI Polish must be completed and reviewed before any system launch.
- UI Polish does not introduce new features.

---

## 7. RECENT DECISIONS (LOG)

- IdentitySpec is model-specific.
- character_name is a stable semantic anchor.
- Automatic Vision only as internal hooks (B2 hints + QC), no identity extraction from B2.
- No mask / sketch tools allowed.
- No Vertex / Imagen integration.

---

## 8. NEXT INTENDED PHASES

Planned:
1. Runtime schema definitions (IdentitySpec, OutputRecord, QC, Export)
2. Antigravity agent architecture
3. Pipeline implementation
4. UI Polish
5. Freeze & launch

---

## 9. NON-CANONICAL FILES PRESENT (REFERENCE / ARCHIVE / TEMP)

| File Name | Category | Status | Notes |
|---------|---------|--------|------|
| deep-research-report.md | reference | ARCHIVE | research notes, not a spec |
| Gemini 3 Technical Report.pdf | reference | ARCHIVE | model report, not a spec |
| подробный технический обзор с хо.md | reference | ARCHIVE | analysis, not a spec |
| ai-character-ui-params.md | reference | ARCHIVE | UI params notes, not canonical |
| [https___antigravity.google_docs_get-started](http.md | reference | ARCHIVE | external doc snapshot |
| __AI Fitness & Lifestyle Content Generator _ Notio.md | other-project | ARCHIVE | not RefGen |
| copy-of-copy-of-robert’s-tech-tool (1).zip | temp | TEMP | sample app/code archive |
| Screenshot 2026-02-03 144033.png | temp | TEMP | debug evidence |
| Screenshot 2026-02-03 144357.png | temp | TEMP | debug evidence |
| Screenshot 2026-02-03 144415.png | temp | TEMP | debug evidence |

---

## 10. USAGE INSTRUCTIONS

In a new chat:
“Work strictly according to PROJECT_INDEX — RefGen.md and the Active Checkpoint.”

If a file is not listed in this index:
- it does not participate in the project workflow.
