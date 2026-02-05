# BLOCK C — OUTPUT / QC / SEED / EXPORT
Versioning:
- identity_spec_version: 1.1.0
- shot_spec_version: 1.0.0
- workflow_version: 1.0.0
- ui_spec_version: 0.1.0

_Last updated: 2026-02-03 03:16 Europe/Berlin_

## Назначение
Block C отвечает за:
- Output model
- Quality Control (без цензуры)
- Reproducibility (seed / trace)
- Export (PNG / ZIP)

## C1 Output
- image_id
- metadata
- prompt_hash
- model_id

## C2 QC
- identity_match
- style_match
- drift_detection
- final verdict

## C3 Seed
- Gemini Nano Banana: no deterministic seed
- seed используется как trace-id

## C4 Export
- PNG with embedded metadata
- ZIP (images + manifest.json + qc.json)

## Manifest (пример)
```json
{
  "character_id": "char_female_001",
  "export_id": "exp_001",
  "items": [
    {
      "image": "img_001.png",
      "qc": "qc_001.json"
    }
  ]
}
```
