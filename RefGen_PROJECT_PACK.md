--- FILE: RefGen/RefGen_PROJECT_PACK.md ---
# RefGen_PROJECT_PACK
Status: CANONICAL PACK (single source for chat handoff)
Rule: NO versions (no v1/v2). This file is the only “pack”.

This pack contains:
- Handoff + operational audit layer + next-chat bootstrap.
This pack does NOT contain:
- JSON schemas
- runtime code
Those are created in BUILD via Antigravity missions.

======================================================================

--- FILE: RefGen/RefGen_BUILD_HANDOFF_v1.md ---
# RefGen — BUILD HANDOFF
Status: PRE-BUILD COMPLETE → READY FOR BUILD/INTEGRATION
Mode: Supervisor Edge + Antigravity

## 1) Context
Project: RefGen (Identity Consistency System)  
Phase: PRE-BUILD → BUILD (Antigravity integration)

Purpose:
- lock the working mode and boundaries
- define the next execution order
- prevent drift in new chats

## 2) Source of truth
Canonical (must read first):
- PROJECT_INDEX.md
- CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md
- BLOCK_A_IDENTITY.md
- BLOCK_B_STYLING.md
- BLOCK_C_OUTPUT.md
- BLOCK_C_POST_GEN_ACTIONS.md

Optional (only if present in repository; do not assume):
- RULES_PROJECT.md
- RULES_RUNTIME.md
- ARTEFACTS.md

Support (reference, never overrides canonical):
- Antigravity-deep-research.md

## 3) Working mode (Supervisor Edge)
- Antigravity is the implementation environment (agent-first IDE).
- ChatGPT acts as Supervisor:
  - sets intent + boundaries + acceptance criteria
  - requests artifacts (diff/tests/reports), not prose
  - reviews for compliance with canonical docs
- No “user as manual executor” workflow.

## 4) Non-negotiables (canon locks)
- Strict separation Block A/B/C.
- Post-gen actions allowed only:
  - Regenerate
  - Edit by Prompt
- Forbidden: masks, inpaint/outpaint, sketch/scribble, advanced editor modes.
- UI mirrors runtime state; UI does not decide.

## 5) BUILD work sequence (high-level)
Phase A: Audit remediation (P0 → P1) via Antigravity  
Phase B: Schemas (6 JSON schemas) via Antigravity  
Phase C: Runtime skeleton via Antigravity  
Phase D: QC integration + export + tests

Note: schemas and code are NOT included in this pack; they are generated during BUILD.

## 6) To-Do (BUILD)
A) Audit remediation
- apply P0 fixes first, then P1
- require: CHANGELOG + DIFF SUMMARY + UNRESOLVED + validation

B) Schemas (create)
- identity_spec.schema.json
- shot_spec.schema.json
- output_record.schema.json
- qc_report.schema.json
- export_manifest.schema.json
- ui_session_state.schema.json

C) Runtime skeleton (create)
- pipeline: IdentitySpec + ShotSpec → generation → QCReport → OutputRecord → export

D) Tests (create)
- schema validation
- lineage correctness
- QC gating mapping
- export integrity

======================================================================

--- FILE: RefGen/audit/AUDIT_REPORT_v1.md ---
# AUDIT_REPORT_v1 — RefGen Canon Audit
Version: 1.0
Status: READY (for Antigravity remediation)
Scope: Canonical docs + integration-facing texts only
Goal: remove ambiguity, contradictions, and drift vectors

## A) Audit method
Rules:
- Apply ONLY the listed remediation.
- If remediation would change canonical meaning → do NOT edit the source; create an addendum and link it.

Severity:
- P0 = blocks BUILD / causes drift
- P1 = high-risk ambiguity
- P2 = clarity/polish

Remediation type:
- EDIT = safe to edit without changing meaning
- ADDENDUM = overlay doc; do not edit source
- QUARANTINE = reference-only; never used for decisions

## B) Findings

### P0-TERM-001 — “Agentic Vision” vs “Automatic Vision”
Risk: wrong hook implementation / wrong terminology.
Remediation: EDIT + QUARANTINE
1) Add explicit “Terminology lock” note in PROJECT_INDEX.
2) Quarantine any file containing “Agentic Vision” as reference-only.

### P0-SCOPE-001 — Archive snapshot can override canon
Target: `[https___antigravity.google_docs_get-started](http (1).md` (ARCHIVE/REFERENCE)
Risk: agents treat it as spec.
Remediation: QUARANTINE
- add “ARCHIVE ONLY — MUST NOT be used for implementation decisions” note.

### P0-CONTRACT-001 — OutputItem vs OutputRecord vs Attempt ambiguity
Risk: schema/runtime mismatch.
Remediation: EDIT (Glossary + Operational rules)
- Canon: OutputRecord is runtime record. OutputItem only as UI alias (or ban term).
- Canonical id: output_id.

### P0-LINEAGE-001 — Parent linkage ambiguity
Risk: broken traceability for regenerate/edit.
Remediation: ADDENDUM
- Canon: only parent_output_id as the parent pointer.

### P0-HOOKB-001 — Hook B non-impact not operationalized
Risk: silent mutation of IdentitySpec/ShotSpec.
Remediation: ADDENDUM
- Hook B produces hints only; never mutates specs automatically.

### P0-POSTGEN-001 — Post-gen action scope must be enforced everywhere
Risk: extra edit modes implemented.
Remediation: EDIT + Operational lock
- enforce “Regenerate + Edit by Prompt only” and forbidden list.

### P0-EXPORT-001 — Export specs/ folder policy ambiguous
Risk: consumer/importer expects missing folder/manifest mismatch.
Remediation: ADDENDUM
- decide A) specs/ always present OR B) conditional via include_specs_snapshots.

### P1-MODEL-001 — Model switch labeling vs character_name stability
Remediation: EDIT
- character_name immutable; Flash/Pro labels only metadata/badge.

### P1-SEED-001 — seed semantics
Remediation: ADDENDUM
- define seed as trace-only OR rename to trace_id.

### P1-QC-001 — QC gating mapping needs deterministic rule
Remediation: ADDENDUM
- QCReport.overall_status → OutputRecord.flags/status → UISessionState.permissions.

### P1-UI-001 — UI responsibility leaks into runtime
Remediation: EDIT + rule
- runtime decides; UI mirrors.

## C) Remediation order
1) Terminology lock + quarantine
2) Contract unification + lineage
3) Hook B + post-gen enforcement
4) Export policy decision
5) Model/seed/QC/UI mapping
6) Procedure polish

======================================================================

--- FILE: RefGen/audit/GLOSSARY_CANON_v1.md ---
# GLOSSARY_CANON_v1 — RefGen Canon Glossary
Version: 1.0
Status: CANONICAL (Terminology lock)

## Purpose
Prevent interpretation drift across chats/agents.
Rule: if term is missing → do NOT invent; add via audit flow.

## Core entities
Character:
- character_id (canonical)
- character_name (stable; MUST NOT include Flash/Pro)

IdentitySpec (Block A):
- identity-only constraints
- MUST NOT include: scene/lighting/camera/pose/styling

ShotSpec (Block B):
- shot + styling constraints
- MUST NOT redefine identity

OutputRecord (Block C / BUILD):
- canonical append-only runtime record
- canonical id: output_id

OutputItem (UI view):
- UI alias of OutputRecord (1:1 mapping to output_id)
- if undesired, ban term and use OutputRecord only

QCReport:
- post-gen QC result linked to output_id
- includes overall_status

ExportManifest:
- canonical export manifest describing package paths/contents

UISessionState:
- UI-only mirror state (selected ids, active tab, permissions mirror)
- UI never decides business logic

## Vision terminology
Automatic Vision (CANON):
- Hook B: hints only (non-blocking, no identity mutation)
- Hook C: QC

Agentic Vision (FORBIDDEN):
- MUST NOT appear in active specs/docs/UI
- allowed only inside quarantined archive/research with explicit label

## Post-gen actions
Allowed:
- Regenerate
- Edit by Prompt

Forbidden always:
- masks, inpaint/outpaint
- sketch/scribble
- advanced editor modes

## Lineage / trace
parent_output_id (CANON):
- only canonical parent pointer

trace_id (recommended):
- trace-only id (no determinism promise)
If “seed” exists:
- MUST be defined as trace-only OR replaced by trace_id

======================================================================

--- FILE: RefGen/audit/OPERATIONAL_RULES_v1.md ---
# OPERATIONAL_RULES_v1 — RefGen Executable Rules
Version: 1.0
Status: ACTIVE (procedure layer)
Format: Trigger → Action → Done Criteria

## R-001 Anti-Proxy Rule
Trigger:
- user is forced into repeated manual copy/paste between chat and IDE
Action:
- convert to single Antigravity mission
- require artifacts: diff + file list + validation
Done:
- user reviews; user is not manual executor

## R-010 Hook B (Automatic Vision hints only)
Trigger:
- B2 references present
Action:
- produce hint tags only; cache per ref_id
- MUST NOT mutate IdentitySpec/ShotSpec
- MUST NOT block generation
Done:
- hints visible; no silent changes

## R-020 Hook C QC (post-gen)
Trigger:
- any new output produced
Action:
- produce QCReport linked to output_id
- map QCReport.overall_status → OutputRecord.flags/status → UISessionState.permissions
Done:
- deterministic gating and UI mirroring

## R-030 Post-gen actions scope lock
Trigger:
- user requests changes after generation
Action:
- allow only Regenerate or Edit by Prompt
- refuse forbidden edit modes (masks/inpaint/outpaint/sketch/advanced editors)
Done:
- only canonical post-gen actions exist

## R-040 Model switch & character stability
Trigger:
- model mode/provider/model_id changes
Action:
- character_name remains unchanged
- store model tuple in OutputRecord metadata
Done:
- no identity drift via label mutation

## R-050 Lineage canonicalization
Trigger:
- regenerate/edit created from existing output
Action:
- store only parent_output_id
- store generation_type: initial/regenerate/edit_by_prompt
Done:
- single consistent lineage chain

## R-060 Export policy lock
Trigger:
- export invoked
Action:
- always create ExportManifest
- enforce one policy: specs/ always present OR conditional via include_specs_snapshots
- validate manifest paths exist
Done:
- deterministic, valid export package

## R-070 UI boundary
Trigger:
- UI feature implemented/changed
Action:
- UI mirrors runtime decisions only
- UI MUST NOT decide QC/export eligibility or mutate specs automatically
Done:
- runtime remains source of truth

======================================================================

--- FILE: RefGen/audit/UNRESOLVED.md ---
# UNRESOLVED — RefGen Open Decisions
Version: 1.0
Status: OPEN (requires Supervisor decision)
Rule: do not implement until decided.

## U-001 Export specs/ folder policy
A) specs/ always present (may be empty)
B) conditional via include_specs_snapshots + manifest references
Decision needed: choose A or B

## U-010 OutputItem term policy
A) ban OutputItem; use OutputRecord everywhere
B) allow OutputItem as UI alias mapping 1:1 to output_id
Decision needed: choose A or B

## U-020 seed vs trace_id naming
A) keep “seed” but define as trace-only (no determinism promise)
B) rename to trace_id everywhere
Decision needed: choose A or B

======================================================================

--- FILE: RefGen/NEXT_CHAT_START.md ---
# RefGen — NEXT CHAT START (Supervisor Edge)
Purpose: instant boot + immediate execution order (no warm-up)

## Anchor line (first line in new chat)
Supervisor Edge / RefGen Anchor

## Execution plan
Phase A: Antigravity Mission — Audit remediation (P0 only) → artifacts (diff/changelog/validation)
Phase B: Antigravity Mission — Schemas (6 JSON schemas) → review PASS/FAIL per schema
Phase C: Antigravity Mission — Runtime skeleton → minimal tests
Stop conditions:
- contradiction with canonical docs
- changes that alter canonical meaning
- any need to rename/move files
Action on stop:
- write UNRESOLVED entry; propose A/B; no implementation

======================================================================

--- FILE: RefGen/ANTIGRAVITY_WORKING_MODEL.md ---
# ANTIGRAVITY_WORKING_MODEL
Status: PLACEHOLDER (PASTE CANON TEXT HERE)

Instruction:
Paste the already agreed “Antigravity working model” text into this file.
Do NOT rewrite it from scratch. Do NOT invent new rules.

======================================================================
--- END OF RefGen_PROJECT_PACK.md ---
