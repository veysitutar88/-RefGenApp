# RefGenTopApp

RefGenTopApp is a local, UI-first React workspace for RefGen workflows (Identity → Shot → Run → QC → Export). It uses the canon docs in the parent repo as reference and stores local data in JSON files.

## Local persistence
Data is stored as JSON in `refgen-top-app/data/`:
- `characters.json`
- `shots.json`
- `outputs.json`
- `exports.json`

## Run locally
```bash
cd refgen-top-app
npm install
npm start
```

- UI: http://localhost:5173
- API: http://localhost:5174

## Main routes
- `/outputs` — Outputs feed
- `/characters` — Character library (IdentitySpec)
- `/shots` — Shot library (ShotSpec)
- `/run` — Run pipeline stub
- `/outputs/:outputId` — Output details + post-gen actions
- `/exports` — Export manifests
- `/settings` — Local UI settings stub

## Notes
- Generation, QC, and export are stubbed but consistent with canon rules.
- Export is only enabled when status is `APPROVED`.
- Post-gen actions are limited to Regenerate and Edit-by-Prompt.
