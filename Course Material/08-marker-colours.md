# Module 8: Marker Colours

## What You'll Learn
- Write precise visual specs that AI can actually implement correctly
- Understand why "add colour support" fails and a detailed spec succeeds
- Propagate a data model change end-to-end: storage → UI → map

---

## The Problem: All Pins Look the Same

Every marker is the same blue pin. That works fine for a handful of locations, but once you're tracking different types of places — restaurants, hiking trails, accommodation, things to see — visual differentiation is immediately useful.

The feature: each marker gets a colour. Pick it from a small palette of presets. The map pin updates to match. The colour persists in localStorage alongside the other marker data.

---

## The AI Lesson: Visual Features Need Exact Specs

Tell an engineer "add colour support to the markers" and they'll ask ten follow-up questions. Tell an AI agent the same thing and it'll make ten silent assumptions — some right, some wrong.

Visual features are where vague prompts cost the most time. The AI can't see your mental image. If you don't describe where the colour picker appears, what it looks like, how selection is indicated, and how the map pin changes — you'll get something that doesn't match what you had in mind.

**The fix is a spec, not a conversation.** Write out exactly what you want before you prompt. Think of it as a mini design brief.

> [!TIP]
> For any feature with a visual component, write the spec as if you were briefing a contractor who has never seen the app. Include: where does it appear, what does it look like, what happens when you interact with it, what state does it save.

---

## Exercise: Add Per-Marker Colour Pickers

| | |
|---|---|
| **Goal** | Add a colour picker to each marker that updates both the sidebar and the map pin |
| **Concepts** | Writing precise visual specs, end-to-end data model changes |

### What you're building

Each marker row in the sidebar shows a small set of colour swatches. Clicking a swatch sets that marker's colour. The map pin for that marker immediately updates to the selected colour. The colour is saved to localStorage and restored on refresh.

**The 6 preset colours:** blue, red, green, yellow, purple, pink.

### Steps

1. **Before you open Claude**, write your spec. Answer these questions in your own words:
   - Where in the sidebar row do the swatches appear?
   - What do the swatches look like (shape, size)?
   - How is the selected colour shown as selected?
   - What does the map pin look like when the colour changes?
   - What's the default colour for a new marker?

   This is your prompt. Don't skip this step — it's the lesson.

2. Give Claude your spec and let it implement. Don't describe the pattern or the architecture; just describe what you want to see and how it should behave.

3. Review Claude's plan — check that it touches all three layers:
   - Data model (`color` field, default value, localStorage)
   - Sidebar rendering (swatches per marker, click handler, selected indicator)
   - Map pin (colour reflected on the pin)

4. Test:
   - Add a marker — pin should use the default colour
   - Click a colour swatch — pin on the map should change immediately
   - Refresh the page — colour should persist
   - Change the colour again — new colour should take effect and persist

5. Compare your result to your spec from Step 1. Did Claude match it? Where it didn't, was your spec ambiguous?

### Acceptance Criteria
- [ ] Each marker row shows colour swatches
- [ ] Clicking a swatch updates the marker's colour
- [ ] The map pin colour updates immediately
- [ ] Active colour has a visible selected indicator
- [ ] Colour persists across page refresh
- [ ] New markers get a sensible default colour

> [!NOTE]
> **The takeaway**: The quality of the output matched the quality of the spec. Where you were precise, Claude was correct. Where you were vague, it guessed. That's not a bug in AI — it's the design of prompting. The spec is your job.

---

---

## If You Finish Early

**Extension: Colour filter**

The sidebar has category filters (All / Favorites / Visited). Add a second filter row — or extend the existing one — so you can filter by colour too. Clicking a colour swatch in the filter row shows only markers of that colour. Clicking it again clears the colour filter.

Write the spec yourself first before prompting: where does the colour filter row appear, how does it interact with the category filter, where does the `currentColorFilter` state live?

← [Previous: Search & Live Filter](7-search-and-filter.md) | [Next: Import & Export →](9-import-export.md)
