# RefGenTopApp — Minimal Product Spec (MVP)

## Goal
Deliver a premium, local creator-style UI for RefGen workflows: Identity (Block A) + Shot/Styling (Block B) + Run → QC → Export (Block C). Runtime remains stubbed.

## MVP features
- IdentitySpec creation/edit (form + JSON editor toggle).
- ShotSpec creation/edit (form + JSON editor toggle + presets).
- Outputs feed with filters and status badges.
- Run screen to compose Identity + Shot and trigger a stubbed pipeline.
- Output detail view with QC summary, lineage (`parent_output_id`), and post-gen actions.
- Export view to inspect manifest files.

## Screens (MVP)
1. Outputs Feed
2. Character Library
3. Shot Library
4. Run Screen
5. Output Details
6. Export View

## Non-goals
- No ML/Model execution.
- No DB or server-side auth.
- No new post-gen actions beyond Regenerate and Edit-by-Prompt.
