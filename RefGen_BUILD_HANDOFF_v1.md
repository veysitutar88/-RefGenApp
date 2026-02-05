# RefGen — BUILD HANDOFF v1
Status: PRE-BUILD COMPLETE → READY FOR BUILD/INTEGRATION
Mode: Supervisor Edge + Antigravity

---

## 1. Контекст

Проект: RefGen (Identity Consistency System)  
Фаза: PRE-BUILD → переход к BUILD / интеграции с Antigravity.

Этот документ фиксирует:
- что уже сделано и принято;
- какие файлы считаются опорными;
- как стартовать новую BUILD-сессию (новый чат + Antigravity);
- общие правила работы (Supervisor Edge).

---

## 2. Канонические файлы проекта (источник истины)

Обязательные:

1. `PROJECT_INDEX.md`
2. `CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md`
3. `BLOCK_A_IDENTITY.md`
4. `BLOCK_B_STYLING.md`
5. `BLOCK_C_OUTPUT.md`
6. `BLOCK_C_POST_GEN_ACTIONS.md`
7. `ANTIGRAVITY_WORKING_MODEL.md`  (рабочая модель Antigravity и Supervisor)
8. `Antigravity-deep-research.md` (исследование, вспомогательно)

Правило:
- любые решения, противоречащие этим файлам, считаются неверными, пока не выпущен новый CHECKPOINT.

---

## 3. Что уже сделано по сути (результат этой фазы)

1. **Уточнена модель Antigravity**
   - Antigravity = agent-first IDE, не runtime.
   - Она должна выполнять работу (schemas, code, тесты) по задачам и критериям.
   - Человек + ChatGPT действуют как Supervisor, а не кодеры.

2. **Зафиксирован режим Supervisor Edge**
   - ChatGPT работает как архитектор и контролёр, а не как исполнитель кода.
   - Пользователь не должен быть “прокладкой” между LLM и редактором.
   - Любая работа идёт по цепочке: контекст → критерии → задача → артефакты → проверка.

3. **Определены основные артефакты BUILD-фазы**
   (часть описана в этом чате текстом, сами файлы могут быть созданы Antigravity):
   - runtime-схемы: IdentitySpec / ShotSpec / OutputRecord / QCReport / ExportManifest / UISessionState
   - runtime skeleton (pipeline + post-gen)
   - QC-интеграция и экспорт (manifest + ZIP-структура)
   - UISessionState-адаптер (UI как зеркало, без логики)

4. **Выявлены ключевые риски и инварианты**
   - строгая разделённость Identity / Shot / Output / QC / Export;
   - только два post-gen действия: Regenerate / Edit by Prompt;
   - UI не принимает бизнес-решений, только отображает state/permissions;
   - QC (Hook C) — единственный авторитет для качества, если включён;
   - экспорт всегда проходит через манифест и проверку целостности.

---

## 4. Как стартовать НОВЫЙ ЧАТ (Anchor)

При запуске нового чата для RefGen / Antigravity:

1. Вставить в первое сообщение фразу-якорь:

   > **Supervisor Edge / RefGen Anchor**

2. Кратко указать:
   - что используется этот документ: `RefGen_BUILD_HANDOFF_v1.md`;
   - что в проекте уже лежат:
     - `CHECKPOINT — RefGen Project v1.2 (CONSOLIDATED).md`
     - `BLOCK_*`
     - `BLOCK_C_POST_GEN_ACTIONS.md`
     - `ANTIGRAVITY_WORKING_MODEL.md`.

3. Далее сформулировать цель сессии, например:
   - “Phase 1: schemas via Antigravity по существующим acceptance-criteria”
   - или “Phase 2: runtime skeleton implementation”, и т.д.

Этого достаточно, чтобы ChatGPT мгновенно вошёл в правильный режим без разогрева.

---

## 5. Как стартовать BUILD вместе с Antigravity (общая схема)

В новом чате, после якоря, последовательность такая:

1. **Bootstrap**
   - Прочитать: PROJECT_INDEX, CHECKPOINT v1.2, BLOCK A/B/C, BLOCK_C_POST_GEN_ACTIONS, ANTIGRAVITY_WORKING_MODEL.
   - Убедиться, что цель сессии понятна (schemas / runtime / QC / export).

2. **Определить фазу (по EXECUTION_ORDER в интеграции)**
   - Phase 1: схемы
   - Phase 2: runtime skeleton
   - Phase 3: QC integration
   - Phase 4: export
   - Phase 5: UI adapter
   - Phase 6: tests

3. **Сформулировать задачу для Antigravity**
   - не “пиши код абзацами”,
   - а: цель + рамки + файлы, которые она должна читать + ожидаемые артефакты (schemas, code, tests, report).

4. **Проверить артефакты**
   - смотреть на diff, схемы, тесты;
   - сравнивать с CHECKPOINT и Block A/B/C;
   - фиксировать PASS / FAIL / FIX.

---

## 6. Что СЧИТАЕМ СДЕЛАННЫМ после этого документа

Считается завершённым:

- Понимание роли Antigravity (через `ANTIGRAVITY_WORKING_MODEL.md`).
- Фиксация Supervisor Edge как рабочего режима.
- Завершение “бумажной” фазы: архитектура, правила, риски, инварианты.
- Готовность к переходу в BUILD-фазу с участием Antigravity.

Не сделано и переносится в BUILD:

- Реальная реализация JSON-схем.
- Реальный runtime-код и интеграция.
- Реальные тесты и CI.
- Любой UI-код.

---

## 7. Мини-правило на будущее

Если в новом чате снова начинает появляться ощущение:
- что пользователь становится “прокладкой”,
- что ChatGPT пишет код вместо Antigravity,
- что мы теряем Supervisor-ракурс,

нужно:
1. Сослаться на этот документ.
2. Вернуться к модели: **задача → артефакты → проверка**.
3. Остановить попытки “вытащить всё руками”.

---
