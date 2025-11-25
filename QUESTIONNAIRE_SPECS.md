# Questionnaire Specifications (from Figma)

## Overview

There are 6 questionnaire types. **ALL 6 use the same 5-part questionnaire structure.** The ONLY difference between them is the product name displayed in the sidebar.

### All 6 Questionnaire Types (5 parts each):
1. **vivity** - Shows "Vivity® and PureSee*" / "Vivity® / Vivity® Toric"
2. **puresee** - Shows "Vivity® and PureSee*" / "PureSee* / PureSee* Toric"
3. **panoptix1** - Shows "PanOptix® and Odyssey*" / "PanOptix® / PanOptix® Toric"
4. **odyssey** - Shows "PanOptix® and Odyssey*" / "Odyssey* / Odyssey* Toric"
5. **panoptix2** - Shows "PanOptix® and Galaxy*" / "PanOptix® / PanOptix® Toric"
6. **galaxy** - Shows "PanOptix® and Galaxy*" / "Galaxy* / Galaxy* Toric"

---

## Questionnaire Structure (All 6 Types)

### Part 1: Spectacle Independence
**Widget:** QuestionRadioTasks
**Title:** "Spectacle independence:"
**Question:** "On a typical day, how often do you wear glasses for the following tasks?"

**Tasks:**
1. Far (e.g., Driving, watching TV)
2. Intermediate (e.g., Computer, car dashboard)
3. Near (e.g., Reading newspaper, phone)
4. Very Near (e.g., Ingredient list, drug indications)

**Options:** Never, Occasionally, Often, Always

### Part 2: Visual Quality - Clarity of Vision
**Widget:** QuestionRadioTasks
**Title:** "Visual Quality – Clarity of Vision"
**Question:** "Please rate the sharpness or clarity of your vision in bright light, dim light."

**Tasks:**
1. Bright light
2. Dim light
3. Low contrast (e.g. fog, dusk)

**Options:** Very Clear, Somewhat Clear, Slightly Blurry, Very Blurry

### Part 3: Visual Disturbances
**Widget:** QuestionDualRadio (NEW COMPONENT NEEDED)
**Title:** "Visual disturbances:"

**Question 1:**
- Text: "Do you ever notice a 'shadow,' 'ghost,' or faint double image around objects even in good lighting?"
- Options: Never, Occasionally, Often, Always

**Question 2:**
- Text: "If yes, when do you notice it the most?"
- Options: Reading, Watching TV, In low light conditions, No specific time

### Part 4: Overall Vision Experience
**Widget:** QuestionScale
**Title:** "Overall Vision Experience:"
**Question:** "On a scale of 0 to 10, how satisfied are you with your vision after surgery?"
**Scale:** 0-10
**Label:** "(0 = very dissatisfied, 10 = extremely satisfied)"

### Part 5: Visual Acuity Measurements
**Widget:** QuestionVisualAcuity
**Title:** "Visual Acuity Measurements"

**Measurements:**
1. UNVA (33cm) - phone icon
2. UNVA (40cm) - laptop icon
3. UNIA (66cm) - laptop icon
4. UDVA - eye dropper icon

**Options:** 20/20, 20/25, 20/30, 20/40, 20/50, 20/60, 20/80, 20/100

---

## Summary

All 6 questionnaire types share the same 5-part structure:

| Part | Widget | Purpose |
|------|--------|---------|
| **Part 1** | QuestionRadioTasks | Spectacle independence (4 tasks) |
| **Part 2** | QuestionRadioTasks | Clarity of Vision (3 tasks) |
| **Part 3** | QuestionDualRadio | Visual Disturbances (2 questions) |
| **Part 4** | QuestionScale | Overall Vision Experience (0-10 scale) |
| **Part 5** | QuestionVisualAcuity | Visual Acuity (4 measurements) |

---

## Component Requirements

### Existing Components (Already Built)
1. ✅ QuestionRadioTasks
2. ✅ QuestionScale
3. ✅ QuestionVisualAcuity

### New Component Needed
4. ❌ QuestionDualRadio - Two separate radio questions displayed vertically
