# Metria DevEx Workshop

Welcome to the Metria DevEx Workshop! This collection of materials is designed to onboard and train consultants of different roles (engineering, product/project, design) in how to use AI development tools to increase efficiency.

## Course Structure

This bootcamp is organized into modules that build on each other. Each module teaches a specific AI workflow concept while adding a real feature to the map app.

### Foundation

1. **[Getting Started](1-getting-started.md)**
   - Prerequisites, setup, installing Claude Code
   - Exercise: Run the Map app locally

2. **[Working with AI Agents](2-working-with-ai-agents.md)**
   - Agents vs chat, the 80/20 planning principle, context management
   - Exercise: Add localStorage persistence so markers survive page refresh

3. **[Model Context Protocol (MCP)](3-model-context-protocol.md)**
   - What MCP is, how it connects agents to external tools and data
   - Exercise: Add marker clustering using Context7 MCP to fetch live docs

4. **[Safety and Guardrails](4-safety-and-guardrails.md)**
   - Why autonomous agents need guardrails, SafetyNet, custom rules
   - Exercise: Test SafetyNet blocking a destructive git operation

5. **[Transforming & Structuring Data](5-transforming-structuring-data.md)**
   - Using AI to extract structure from unstructured text
   - Exercise: Transform raw user feedback into a prioritised CSV

6. **[Skills & Slash Commands](6-skills-and-slash-commands.md)**
   - What skills are, built-in commands, writing custom reusable skills
   - Exercise: Write a custom skill for a workflow you actually use

### Building the App Further

7. **[Search & Live Filter](7-search-and-filter.md)**
   - Pattern-guided prompting: show AI what already works, ask it to follow it
   - Exercise: Add a live text search that filters markers by name

8. **[Marker Colours](8-marker-colours.md)**
   - Writing precise visual specs for AI — vague prompts produce wrong UIs
   - Exercise: Add a per-marker colour picker with 6 presets, reflected on the map pin

9. **[Import & Export](9-import-export.md)**
   - MCP for data standards: fetch the GeoJSON spec via Context7, implement against it
   - Exercise: Export markers as GeoJSON and import them back from a file

10. **[Distance Tool](10-distance-tool.md)**
    - Planning interactive UX before implementation — `/plan` for non-obvious interactions
    - Exercise: Select two markers and see the distance with a line drawn on the map

## Next Steps

Start with [Getting Started](1-getting-started.md) and work through the modules in order.
