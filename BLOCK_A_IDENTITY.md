# BLOCK A — IDENTITY / CHARACTER DNA
Versioning:
- identity_spec_version: 1.1.0
- workflow_version: 1.0.0
- ui_spec_version: 0.1.0

_Last updated: 2026-02-03 03:16 Europe/Berlin_

## Назначение
Block A отвечает за **идентичность персонажа** и её консистентность.
Block A — immutable-слой. Любое изменение требует новой версии.

## Обязательные поля
- character_id (stable, technical)
- character_name (semantic anchor for Gemini 3 Pro / Nano Banana)
- identity_semantic_profile
- reference_images (multi-view)

## Правило имени (Gemini 3 Pro / Nano Banana)
Имя персонажа является логическим якорем консистентности и
должно использоваться стабильно во всех генерациях.

## Identity Semantic Profile (пример)
```json
{
  "character_id": "char_female_001",
  "character_name": "Anna",
  "age_range": "24-28",
  "gender": "female",
  "body_type": "slim-athletic",
  "skin_tone": "light_olive",
  "hair": {
    "color": "dark_brown",
    "length": "medium"
  }
}
```

## Reference Images
- front (face close)
- three-quarter (face + body)
- profile (face)
- optional: full body

## Invariants
- лицо
- пропорции
- возрастной диапазон
- тон кожи

Block A передаёт данные в Block B и Block C **только по ссылке**.
