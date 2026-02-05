# BLOCK B — STYLING / SCENE / POSE / OBJECTS
Versioning:
- identity_spec_version: 1.1.0
- shot_spec_version: 1.0.0
- workflow_version: 1.0.0
- ui_spec_version: 0.1.0

_Last updated: 2026-02-03 03:16 Europe/Berlin_

## Назначение
Block B управляет **изменяемыми визуальными параметрами**.
Identity в Block B не описывается.

## B1 — Text Presets
- Camera
- Lighting / Mood
- Pose (spatial)
- Action / Interaction

## B2 — Visual References
- Scene
- Clothing
- Pose
- Object / Prop

## Makeup Policy (минимум)
- none — private/home scenes
- light_natural — public/modern scenes
- evening_soft — events

## Комбинация
- Image = база
- Text = корректировка
- Identity не переопределяется

## ShotSpec (пример)
```json
{
  "character_id": "char_female_001",
  "scene": "park_day",
  "camera": {
    "angle": "eye_level",
    "framing": "half_body"
  },
  "lighting": "natural daylight",
  "pose": "relaxed stance",
  "makeup_profile": "light_natural"
}
```
