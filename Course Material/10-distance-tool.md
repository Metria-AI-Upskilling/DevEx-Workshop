# Module 10: Distance Tool

## What You'll Learn
- Plan interactive UX before writing code — especially when the interaction model is non-obvious
- Use Leaflet's built-in map utilities instead of reinventing the wheel
- Build a feature that involves multi-step user interaction

---

## The Problem: How Far Apart Are These Places?

You've got markers scattered across a map. Sometimes you want to know: how far is this café from the hotel? Is that viewpoint within walking distance of the trailhead?

A distance tool lets you select two markers and see the straight-line distance between them, with a line drawn on the map to make it visual.

The feature itself is straightforward to implement — Leaflet can calculate distances and draw lines. The interesting challenge is the *interaction design*: how does a user select the first marker, then the second? How is the selection shown? How do they clear it and start again?

This is exactly where planning before coding pays off.

---

## The AI Lesson: Plan the Interaction Before the Implementation

Some features have a clear implementation path — the hard part is just writing the code. But other features have an ambiguous *interaction model* — the hard part is deciding how they work before any code makes sense.

The distance tool is the second kind. If you prompt "add a distance tool" without specifying the interaction, Claude will make every decision for you — and the result may work, but it won't necessarily match what you had in mind.

> [!TIP]
> If you're unsure what you want the interaction to feel like, describe it in words first: "I click Marker A in the sidebar, it highlights, then I click Marker B, a line appears." That sentence is the spec. `/plan` turns it into an implementation.

---

## Exercise: Add a Distance Measurement Tool

| | |
|---|---|
| **Goal** | Let users select two markers and see the straight-line distance between them |
| **Concepts** | Planning interactive UX, Leaflet distance utilities, multi-step interaction state |

### What you're building

A way to select two markers and see the straight-line distance between them, with a line drawn on the map. You decide exactly how the interaction works.

### Steps

1. **Before prompting**, decide how the interaction should work. Write it out in plain language — a sentence or two describing what a user does and what happens at each step. This is your spec.

2. Use `/plan` with your interaction description. Don't ask Claude to write code yet — ask it to describe the state variables, the functions it'll need, and which existing functions it'll modify.

3. Review the plan. Things to check:
   - Does it handle what happens if you select the same marker twice?
   - Does it handle deleting a selected marker?
   - Does it cleanly restore normal behaviour when the tool is deactivated?

   Ask follow-up questions before proceeding.

4. Execute the plan:
   ```
   Implement the plan.
   ```

5. Test the full interaction end-to-end, including the edge cases from Step 3.

### Acceptance Criteria
- [ ] Users can select two markers and see the distance between them
- [ ] A line is drawn on the map between the selected markers
- [ ] Distance is shown in a readable unit (kilometres or metres)
- [ ] The tool can be deactivated, removing the line and clearing selection state
- [ ] Normal marker behaviour is unaffected when the tool is inactive
- [ ] Selecting the same marker twice doesn't crash

> [!NOTE]
> **Straight-line vs road distance**: This tool measures straight-line ("as the crow flies") distance. Real road distance would require a routing API. For most "how far apart are these?" questions, straight-line is useful and honest.

---

## Day Reflection

The app you've built today is a toy — but it has real features: it saves markers, clusters them, persists them, lets you search and colour-code them, export and share them, and now measure distances between them.

More importantly: look back at how you built each feature. The pattern that worked every time was the same:

1. **Understand the existing code first** — before asking Claude to change anything
2. **Write a precise spec** — especially for anything with a visual or interactive component
3. **Plan before executing** — especially when the interaction model is non-obvious
4. **Verify the output** — test every acceptance criterion yourself

That's not an AI workflow. That's good engineering. AI just makes each step faster.

---

## If You Finish Early

**Extension: Multi-stop distance**

The current tool measures point-to-point between two markers. Extend it to support a chain of stops: keep adding markers to the selection, each new one extends the line and the total distance updates. Show both the total distance and each individual leg (e.g. "A→B: 2.1 km, B→C: 3.4 km, Total: 5.5 km").

Use `/plan` first — the interaction model changes significantly when you go from 2 fixed points to an open-ended selection.

← [Previous: Import & Export](9-import-export.md) | [Back to Course Overview](README.md)
