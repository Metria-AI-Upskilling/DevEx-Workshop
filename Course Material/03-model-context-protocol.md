# Module 3: Model Context Protocol (MCP)

## What You'll Learn
- Understand the problem MCP solves and why you need it
- Learn how MCP servers give agents access to tools and data safely
- Use Context7 MCP to access live documentation during development

---

## The Problem: Tool Integration Hell

Right now, integrating AI with your tools is a mess.

Want Claude to access your database? Build custom code. Want ChatGPT to access the same database? Build it again. Want Gemini? You guessed it—build it a third time.

```
Without MCP:
3 models × 5 tools = 15 custom integrations
Each model needs its own code to talk to each tool
```

Every time you add a new tool, every model needs new code. Every time you add a new model, every tool needs new code. It scales like a nightmare.

> [!WARNING]
> Without a standard, you're writing custom integration code for every model-tool combination. That's wasted time and unmaintainable.

---

## The Solution: MCP as a Universal Adapter

**MCP (Model Context Protocol) is the standard language AI models speak to access tools.**

Think of it like USB—before USB, every device needed custom cables. After USB, one plug works with thousands of devices. MCP does the same thing for AI and tools.

```
With MCP:
3 models + 5 tools = 8 implementations
Build a tool once with MCP, all compatible models can use it
```

Build your database server with MCP once. Claude uses it. ChatGPT uses it. Gemini uses it. No custom integration code for each model.

---

## How MCP Actually Works

When you connect Claude to an MCP server:

1. **Server announces capabilities**: "I have a tool called `query_database`, a tool called `send_email`, and I can read user documentation"
2. **Agent asks what's available**: Claude checks what the server offers
3. **Agent uses what it needs**: Claude calls the specific tools for your task
4. **Server enforces boundaries**: Only allows what you gave permission for, logs everything

### MCP Components

| Component | What It Is |
|-----------|-----------|
| **Tools** | Functions the agent can call (`query_database`, `send_email`, `fetch_docs`) |
| **Resources** | Data the agent can read (documentation, schemas, logs, config) |
| **Prompts** | Pre-built instructions the agent can leverage |

### Who Controls What?

The **server controls access**—not the model. The server decides what's allowed, validates inputs before executing, checks permissions, enforces rate limits, and logs everything. This is critical: your MCP server is the security boundary.

---

## Context7: MCP in Action

Here's a concrete example: **Context7** is an MCP server that gives agents access to documentation.

**Without MCP**: You'd manually search docs, copy-paste examples, hope they're current.

**With Context7 MCP**: Claude asks for documentation on-demand. The server fetches live docs. Claude implements with accurate, current information. One request, fresh data, no manual searching.

This is what MCP enables: **frictionless access to external capabilities**.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **The Problem** | Building custom code for each model-tool combination doesn't scale |
| **The Solution** | MCP is a standard—build once, works with any compatible model |
| **Server Control** | The server enforces permissions, validates inputs, and logs actions |
| **Real Benefit** | Access tools and data on-demand without friction or custom code |

---

## Exercise: Add Marker Clustering with Context7 MCP

| | |
|---|---|
| **Goal** | Experience MCP in action—use Context7 to implement marker clustering without manual docs |
| **Concepts** | MCP integration, on-demand documentation access, library implementation |

### Before You Start: Why MCP Matters
MCP lets AI agents safely use real tools and real data instead of guessing or relying on copy-pasted context. Once a tool exposes an MCP server, any compatible model can use it without custom integrations.  

**Concrete MCP examples**
- **Figma MCP**: Read design files, extract colors/components, and check design–code consistency.
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```
- **Notion MCP**: Search internal docs, policies, and specs using live workspace knowledge.
```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
``` 
In this exercise, Context7 applies the same idea to documentation: the agent pulls authoritative, up-to-date docs on demand instead of you searching manually.

### Steps

1. Get your API key from [context7.com](https://context7.com/dashboard). You will have to login with  your Github account, click on "More.." on the website and "Create a New API Key".  
2. Ensure Context7 MCP is installed
   ```bash
   claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
   ```

3. Restart Claude Code to load the MCP. (To restart Claude, type `exit` in Claude code and run `claude` again)

4. Ask Claude to use Context7 for Leaflet.markercluster documentation:
   ```
   Using Context7 MCP, fetch the documentation for the Leaflet.markercluster plugin
   and show me the key setup steps and API.
   ```

   **Notice**: Claude doesn't search manually or guess anything! The MCP server context7 fetches live docs on-demand.

5. Ask Claude to implement marker clustering:
   ```
   Add marker clustering to the Map app using Leaflet.markercluster. When many markers
   are close together on the map, they should group into a cluster badge that shows the
   count. Clicking a cluster zooms in to reveal the individual markers. Use Context7
   if you need specific examples or configuration options.
   ```

6. Test the feature:
   - Add 10+ markers in the same area of the map
   - Zoom out and verify they cluster into a badge showing the count
   - Click a cluster badge and verify it zooms in to reveal individual markers
   - Zoom back in and verify individual markers reappear

### Acceptance Criteria
- [ ] Context7 MCP successfully fetches Leaflet.markercluster documentation
- [ ] Markers cluster when zoomed out and placed close together
- [ ] Cluster badges show the correct count
- [ ] Clicking a cluster zooms in to reveal individual markers
- [ ] No console errors during clustering
- [ ] You notice how Context7 MCP eliminated the need to manually search docs

> [!NOTE]
> **Why this matters**: Without MCP, you'd manually search Leaflet.markercluster docs, copy examples, hope they're correct. With Context7 MCP, Claude fetches live docs on-demand. That's MCP solving a real problem.

---

---

## If You Finish Early

**Extension: Cluster colour by category**

Right now all marker clusters show the same default style. Use Context7 MCP to look up how `Leaflet.markercluster` supports custom cluster icon creation via `iconCreateFunction`. Then ask Claude to colour clusters differently based on whether they contain any favorites (amber) or visited (green) markers — falling back to the default blue if the cluster is all uncategorised.

← [Previous: Working with AI Agents](2-working-with-ai-agents.md) | [Next: Safety and Guardrails →](4-safety-and-guardrails.md)
