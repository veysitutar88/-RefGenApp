# RefGenTopApp Build Report

## File operations
Created:
- `refgen-top-app/` app scaffold (React + Vite + Express API)
- `refgen-top-app/data/*.json` local persistence files
- `refgen-top-app/server/index.js` API + stubbed pipeline
- `refgen-top-app/src/**` UI + styles
- `refgen-top-app/docs/ProductSpec.md`
- `refgen-top-app/docs/UI_README.md`

Modified: none (new app only).

## Tree (refgen-top-app)
```
refgen-top-app/
├── README.md
├── data/
│   ├── characters.json
│   ├── exports.json
│   ├── outputs.json
│   └── shots.json
├── docs/
│   ├── ProductSpec.md
│   └── UI_README.md
├── index.html
├── package.json
├── server/
│   └── index.js
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Inspector.css
│   │   ├── Inspector.tsx
│   │   ├── Layout.css
│   │   └── Layout.tsx
│   ├── context/
│   │   └── SelectionContext.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── main.tsx
│   ├── pages/
│   │   ├── CharactersPage.tsx
│   │   ├── ExportsPage.tsx
│   │   ├── FormPage.css
│   │   ├── OutputDetailsPage.css
│   │   ├── OutputDetailsPage.tsx
│   │   ├── OutputsPage.css
│   │   ├── OutputsPage.tsx
│   │   ├── RunPage.css
│   │   ├── RunPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── ShotsPage.tsx
│   ├── styles/
│   │   ├── global.css
│   │   └── ui.css
│   ├── types.ts
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

## Diff summary
- Added React + Vite UI with sidebar layout, inspector, and six MVP screens.
- Added Express API server with JSON-file persistence and stubbed pipeline.
- Added local data JSON files and MVP docs.

## How to run
```bash
cd refgen-top-app
npm install
npm start
```

## Screenshots
- Not available: `npm install` failed due to registry access (403), so UI could not be launched for capture.

## Validation
- FAIL: `npm install` (403 Forbidden on registry).
