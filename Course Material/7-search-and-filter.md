# Module 6: Search & Live Filter

## What You'll Learn
- Extend an existing feature rather than building from scratch
- Guide AI by showing it the pattern that already works
- Compose multiple filter states cleanly

---

## The Problem: Finding Markers Gets Hard Fast

The category filters work well when you have a handful of markers. But once you've dropped 30 pins across a city, "Favorites" alone doesn't help you find "the café near the station". You need to search by name.

The feature is simple: a text input that narrows the sidebar list in real time as you type. The interesting part is *how you get there with AI* — by showing it the pattern that already exists and asking it to follow it.

---

## The AI Lesson: Follow the Pattern

When a codebase already has a working example of something similar, the best prompt is not "add a search feature". It's "here's how the category filter works — implement search the same way."

This tells Claude:
- Where state lives
- Which function to extend
- What conventions to follow

Showing existing code as the spec is one of the fastest ways to get a correct first attempt. When AI already has access to the code, you can just say "follow the same pattern as X" — you don't need to explain the architecture from scratch.

> [!TIP]
> Before prompting, read `main.js` and understand how `currentFilter`, `getFilteredMarkers`, and `setFilter` work together. That understanding is your prompt.

---

## Exercise: Add Live Search

| | |
|---|---|
| **Goal** | Add a search input to the sidebar that filters markers by name in real time |
| **Concepts** | Pattern-guided prompting, composing multiple filter conditions |

### What you're building

A search box above the filter buttons. As you type, the marker list narrows to only show markers whose names contain the typed text. The search and category filter should work together — typing "park" with "Favorites" active shows only favorited markers with "park" in the name.

### Steps

1. Read `main.js` and understand how the existing category filter works before you write a single prompt. Ask Claude to explain it if you want — but don't ask it to change anything yet.

2. Write your own prompt. The AI lesson here is the technique: point Claude at the existing pattern and ask it to follow it. Don't describe the architecture from scratch — show it what already works and ask for the same approach.

3. Review Claude's plan before it executes. Does it follow the existing conventions?

4. Test:
   - Add 5–6 markers with different names
   - Type part of a name — the list should narrow in real time
   - Apply a category filter while searching — only matching markers in that category should show
   - Clear the search — all filtered markers should return
   - Verify no console errors

### Acceptance Criteria
- [ ] Search input appears above the filter buttons in the sidebar
- [ ] Typing narrows the marker list in real time (case-insensitive)
- [ ] Search and category filter compose correctly
- [ ] Clearing the input restores the full filtered list
- [ ] No console errors

---

---

## If You Finish Early

**Extension: Highlight matched text**

The search narrows the list, but it doesn't show *why* a marker matched. When a search is active, wrap the matching part of each marker name in a `<mark>` tag so it appears highlighted. For example, searching "park" makes "Hyde **park**" render with the match highlighted.

This is a pure rendering change in `renderMarkerList` — think through how to do it without breaking the XSS protection that `escapeHtml` provides.

← [Previous: Skills & Slash Commands](6-skills-and-slash-commands.md) | [Next: Marker Colours →](8-marker-colours.md)
