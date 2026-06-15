# Module EF3: Import & Export

## What You'll Learn
- Use MCP to fetch a data format specification — the same technique as Module 3, now applied to a standard instead of a library
- Understand why export/import is about data shape agreement, not just file I/O
- Build a feature that makes the app genuinely portable

---

## The Problem: Your Markers Are Trapped

Right now, everything you've saved lives in your browser's localStorage. It's tied to one browser on one machine. You can't share a collection of markers with someone else. You can't back them up. You can't open them in another mapping tool.

The fix is export and import using **GeoJSON** — the open standard format for geographic data. GeoJSON is understood by almost every mapping tool in existence: QGIS, Google Maps, Mapbox, GitHub (which renders it automatically), and dozens more. Export to GeoJSON, and your markers speak a universal language.

---

## The AI Lesson: MCP for Standards, Not Just Libraries

In Module 3, you used Context7 MCP to fetch live documentation for the Leaflet.markercluster library. The same principle applies here — but instead of a library, you're fetching the spec for a data standard.

The GeoJSON format (RFC 7946) has precise requirements. Getting the structure wrong means other tools can't read your files. Rather than guessing at the format or relying on an outdated example, ask Claude to fetch the GeoJSON spec via Context7 first — then implement against it.

> [!NOTE]
> **MCP isn't just for library docs.** Any authoritative specification, standard, or documentation that Context7 indexes can be fetched on-demand. This is the same workflow — just a different type of source.

---

## Exercise: Add GeoJSON Export and Import

| | |
|---|---|
| **Goal** | Export markers as a GeoJSON file and import them back from disk |
| **Concepts** | MCP for data standards, file I/O in the browser, data portability |

### What you're building

**Export**: A button in the sidebar that downloads the current marker collection as a `.geojson` file, with each marker's name, category, and colour preserved.

**Import**: A way to read a `.geojson` file and add those markers back to the map.

### Steps

1. Have Claude fetch the GeoJSON specification via Context7 MCP **before writing any code**. Understand the structure you're implementing against — particularly how coordinates are ordered (it's the opposite of Leaflet's convention).

2. Implement export and import. You decide how it looks and where the controls live.

3. Test the full round-trip:
   - Add markers with different colours and categories
   - Export to file — open it and verify it looks right
   - Refresh the page, then import the file
   - Verify names, categories, and colours survived the round-trip

4. Optional: drag the exported file into [geojson.io](https://geojson.io) to verify it renders correctly in another tool.

### Acceptance Criteria
- [ ] Export produces a valid GeoJSON file (FeatureCollection of Point Features)
- [ ] Exported properties include name, category, and colour
- [ ] Import reads a `.geojson` file and adds markers to the map
- [ ] Names, categories, and colours are preserved through the round-trip
- [ ] Invalid files show a clear error message instead of crashing
- [ ] Coordinates are correctly handled between Leaflet and GeoJSON conventions

> [!TIP]
> **Test against a real tool**: Upload your exported `.geojson` to [geojson.io](https://geojson.io) — if it renders correctly, the format is valid. This is a fast sanity check.

---

---

## If You Finish Early

**Extension: Export only the current view**

Right now export always exports all markers. Add an option to export only the markers currently visible in the sidebar (matching the active filter and search). Write the spec first: where does the option appear, how does it interact with the existing export button?

← [Previous: Marker Colours](EF2-marker-colours.md) | [Next: Distance Tool →](EF4-distance-tool.md)
