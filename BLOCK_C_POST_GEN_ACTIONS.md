# BLOCK C — POST-GEN ACTIONS (ADDENDUM)
Versioning:
- block_c_addendum_version: 1.0.0
- references:
  - CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md (authoritative overlay)
  - BLOCK_C_OUTPUT.md (base output/qc/export model)

_Last updated: 2026-02-03 Europe/Berlin_

---

## 0) Назначение и границы
Этот документ фиксирует логику **дополнительных действий после получения сгенерированного изображения** (post-generation actions) в RefGen.

Разрешённые действия (final):
1) Regenerate (повторить тот же шот)
2) Edit by Prompt (доработка готового изображения через текстовую инструкцию)

Запрещено (final):
- любые mask / selection / inpainting / outpainting
- sketch / scribble / pose-by-sketch
- Vertex / Imagen интеграции для editing
- любые editor-режимы кроме “Edit by Prompt”

Важно:
- Этот addendum **НЕ изменяет** Block C base-файл, а дополняет его как runtime-overlay.
- Все результаты Regenerate/Edit сохраняются как **новые output items**, исходники не перезаписываются.

---

## 1) Термины
- OutputItem: единица результата (изображение + метаданные + QC + trace)
- Attempt: попытка генерации (каждый “Run” создаёт новый attempt)
- Parent link: связь “новая попытка получена из предыдущей”
- Source image: исходное изображение для Edit by Prompt
- Controls snapshot: снимок входных параметров (IdentitySpec ref + ShotSpec + model mode + др.)

---

## 2) Где это находится в пайплайне (высокоуровнево)
Block C начинается после того, как модель вернула изображение.

Post-gen actions применяются к уже существующему OutputItem.

ASCII flow:

USER -> [Generated OutputItem] -> (optional auto QC)
                |
                +-- Regenerate ---------------------> [New OutputItem] -> QC -> Export
                |
                +-- Edit by Prompt (image+text) ----> [New OutputItem] -> QC -> Export

Правило QC (hook C):
- После Regenerate и после Edit by Prompt система должна запускать QC (если QC в проекте включён по умолчанию).

---

## 3) UI-логика (только то, что влияет на runtime)
UI показывает результат как карточку OutputItem. На карточке есть overlay-иконки (watermark style).

### 3.1 Regenerate
- Icon: circular arrows (sync)
- Поведение:
  - создаёт новую попытку с теми же входными данными (controls snapshot)
  - не меняет ShotSpec / IdentitySpec
- UX:
  - по умолчанию полупрозрачно
  - на hover ярче
  - при active-run: disabled/loader

### 3.2 Edit by Prompt
- Icon: magic wand или brush-pencil
- Открывает modal:
  - textarea: “Describe the change…”
  - кнопка Run edit
  - Save Copy (всегда создаёт новый OutputItem)
- Поведение:
  - исходный OutputItem не меняется
  - новый OutputItem получает source link на исходник

---

## 4) Данные и связи (минимальный контракт)
Ниже — минимальный JSON-контракт для хранения и воспроизводимости.

### 4.1 OutputItem (storage record)
```json
{
  "output_id": "out_000123",
  "image_id": "img_000123",
  "created_at": "2026-02-03T17:10:00+01:00",

  "character_id": "char_female_001",
  "reference_set_id": "refset_0009",
  "identity_spec_id": "idspec_flash_0009_v1",
  "shot_spec_id": "shotspec_0042",

  "model": {
    "provider": "gemini",
    "model_id": "gemini-3",
    "mode": "flash"
  },

  "prompt_hash": "sha256:...",
  "controls_snapshot_hash": "sha256:...",

  "action_origin": {
    "type": "generate",
    "source_output_id": null,
    "parent_attempt_id": null
  },

  "qc": {
    "qc_id": "qc_000123",
    "verdict": "pass",
    "confidence": 0.86
  },

  "export": {
    "png_path": "images/img_000123.png",
    "meta_path": "meta/out_000123.json"
  }
}
