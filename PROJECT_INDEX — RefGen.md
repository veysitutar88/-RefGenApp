# PROJECT_INDEX — RefGen

Project: RefGen  
Owner: Igor  
Status: ACTIVE  
Current Phase: PRE-BUILD / SPEC FINALIZATION  
Active Checkpoint: CHECKPOINT v1.2 (CONSOLIDATED)  
Last Updated: 2026-02-03  

---

## 1. SOURCE OF TRUTH

Rules:
- Active Checkpoint defines runtime behavior.
- BLOCK_A / BLOCK_B / BLOCK_C are canonical specs.
- Files marked ARCHIVE must not be used.
- Any change to logic or architecture requires a new checkpoint.
- UI Polish is a mandatory phase before launch.

---

## 2. FILE INVENTORY (CANONICAL)

| File Name | Category | Status | Notes |
|---------|---------|--------|------|
| CHECKPOINT v1.0.md | checkpoint | HISTORY | project start |
| CHECKPOINT v1.1.md | checkpoint | HISTORY | transition |
| CHECKPOINT v1.2 (CONSOLIDATED).md | checkpoint | ACTIVE | source of truth |
| BLOCK_A_IDENTITY.md | spec | ACTIVE | identity logic |
| BLOCK_B_STYLING.md | spec | ACTIVE | styling & refs |
| BLOCK_C_OUTPUT.md | spec | ACTIVE | output, QC, export |
| NEXT — BUILD PHASE CHECKLIST.md | build | ACTIVE | implementation plan |
| UI_BLOCK — GLOBAL UI SPEC A;B;C.md | legacy | ARCHIVE | do not use |
| C-Blocks-V.1.0.md | legacy | ARCHIVE | superseded |

---

## 3. ARCHITECTURE SNAPSHOT (CURRENT)

- Models:
  - Gemini 3 Pro
  - Gemini 3 Flash
- Identity:
  - IdentitySpec is model-specific
  - Cached per (character_id, reference_set_id, model)
- Vision:
  - Automatic Vision (internal hooks only)
  - No Agentic Vision term, no toggles
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
4. PROJECT_INDEX.md is the authoritative file list.
5. No assumptions outside listed files.

---

## 5. PROJECT STATUS OVERVIEW

| Area | Item | Status | Notes |
|----|----|----|----|
| Specs | Checkpoints | DONE | v1.2 consolidated |
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
- No mask / sketch tools allowed.
- No Vertex integration.

---

## 8. NEXT INTENDED PHASES

Planned:
1. Runtime schema definitions (JSON / contracts)
2. Antigravity agent architecture
3. Pipeline implementation
4. UI Polish
5. Freeze & launch

---

## 9. USAGE INSTRUCTIONS

In a new chat:
“Work strictly according to PROJECT_INDEX.md and the Active Checkpoint.”

If a file is not listed here:
- it does not participate in the project.
