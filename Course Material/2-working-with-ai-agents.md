# Module 2: Working with AI Agents

## What You'll Learn
- Understand the difference between chat and agent interactions
- Apply the 80/20 planning principle for one-shot execution
- Manage context windows effectively to avoid performance degradation

---

## What Are Agents?

Think of an agent as a junior developer who can read code, make changes across files, run tests, and fix issues—all autonomously.

| Chat | Agent |
|------|-------|
| Answers questions | Takes action |
| Single turn | Multi-step reasoning |
| Gives suggestions | Makes changes |

### Key Capabilities
- Read and understand code across multiple files
- Make changes autonomously
- Run tests and fix issues
- Reason through multi-step problems
- Validate and iterate

### Limitations

> [!WARNING]
> Agents make mistakes—always validate their output before committing.

- Limited memory between sessions — [read more](https://milvus.io/blog/claude-code-memory-memsearch.md)
- Limited context window
- Work best with clear, specific instructions

---

## The Importance of Planning

The biggest mistake: jumping straight into coding without a plan.

> [!TIP]
> Spend 80% planning, 20% executing. A good plan enables one-shot solutions.

A good plan → one-shot solution. A bad plan → debugging loops and wasted tokens.

**If you can't one-shot it, fix the plan—not the code.**

### Why Planning Matters

| Benefit | Description |
|---------|-------------|
| **Scope clarity** | Know what success looks like before starting |
| **Risk identification** | Catch edge cases and gotchas early |
| **Token efficiency** | One good plan saves hundreds of wasted tokens |
| **One-shot execution** | Avoid re-planning mid-execution (the most common cause of failure) |

### Using Plan Mode

```bash
/plan Add user authentication with OAuth2
```

When you use `/plan`, Claude will:

1. **Explore** — Scan the codebase for relevant files
2. **Plan** — Create a step-by-step implementation plan
3. **Wait** — Pause for your approval before executing

> [!NOTE]
> Always review the plan—add constraints, correct misunderstandings, clarify edge cases.

### Best Practices

| ❌ Don't | ✅ Do |
|----------|-------|
| "Add a button" | "Add a 'Save Draft' button in the header that auto-saves every 30 seconds" |
| Skip context | Explain background, constraints, and what success looks like |
| Ask for everything at once | Break problems into sequential, focused tasks |
| Accept suggestions blindly | Ask "why" to catch errors in reasoning |

---

## Context Window Management

Model's have a set context window (how many tokens can be stored in memory) when processing your prompts. Anthropic models tend to have 200k tokens context windows and Google's Gemini models offers up to 1M tokens.

### The Problem
Models performance is heavily influenced by:
- Is the data correct
- Is the data complete
- Noise

When working with LLMs we might be tempted to simply give the model 'all' of our context (code, documentation etc.), assuming more is more. However, this is not true.

Models have lower performance when context becomes "noisy", even though all the data is correct, code and written text contains a lot of fillers that does not give much actual context. For code this can be syntax such as *< xml >* tags and for written text words such as "the".

The largest problem here is giving a large set of files where some content might be relevant but some is not. This fill up the context window with unrelated noise which will confuse the model.

> [!WARNING]
> For Claude models, performance degrades significantly around **50% of context window (~100k tokens)**—the "dumb zone" where the model struggles.

To learn more about context rot, check out:
- [Context Rot Research](https://research.trychroma.com/context-rot) - Understanding context degradation in AI systems

### The Solution

1. Keep one context window focused on one task: For each task, give the agent as concise data as possible for the related task. Avoid giving 'all' the context. Once you have completed the task, use `/clear` to clear the content window.
2. To store *context* across sessions, use markdown files to store guidelines, rules and context. You can read more on how to use `claude.md` files [here](https://www.humanlayer.dev/blog/writing-a-good-claude-md).
3. If you have a lot of documents/code and you don't know what's relevant or not, use a dedicated agent (sub-agent) to first process and compress large amounts of information before passing to main agent. The sub agent will have it's own seperate context window and can then load a large set of tokens (e.g. 10k of documentation), find the parts relevant to the task, and return a short summary of the data relevant to the task to the main agent (e.g. 1k tokens). The main agent only needs to store 1k instead of 10k tokens.

### Example Sub-Agent Workflow

```
Task: Add marker persistence with localStorage

❌ Bad:  Main Agent:
      1. Load all Leaflet docs + entire codebase
      2. implement
✅ Good: 
      1. Spawn new sub-agent with sub task to summarise documentation
         1.1 Sub Agent loads all Leaflet docs + entire codebase
         1.2 Sub-agent searches Leaflet docs → returns key API summary
      2. Main agent implements with focused context
```

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Agents vs Chat** | Agents take action; chat gives suggestions |
| **Planning** | 80% planning, 20% executing—fix the plan, not the code |
| **Context** | One task per context window; use `/clear` between tasks. Utilise multiple agents to solve tasks that require a lot of input tokens. |
| **Validation** | Always review agent output before committing |

---

## Exercise: Add localStorage Persistence

| | |
|---|---|
| **Goal** | Add persistence to the Map app so markers survive page refreshes |
| **Concepts** | Agent prompting, iterative development, validation |

### Steps
Before you start with the exercise:
1. Go to the browser and click the map to add a marker.
2. Now refresh the page.

What happens? The marker is no longer visible. To find out why, we will ask Claude before implementing the solution directly.

1. Open Claude Code in the project folder `DevEx-Workshop`
   ```bash
   claude
   ```

2. Give Claude this prompt:
   ```
   /plan

   A marker appears on the map when I add it, but disappears after a page refresh.
   Explain what you think is happening and why, and outline how you would approach
   confirming your theory.
   Do not change or write any code, only provide reasoning and possible explanations.

   ```
Review Claude's reasoning. It should be related to localStorage, persistence and state of components in a frontend application. Otherwise, revise your prompt.

3. After getting the right response from Claude, you can proceed with the exercise:
   ```
   Add localStorage persistence to the Map app. When markers are added or deleted,
   save them to localStorage. When the app loads, restore markers from localStorage
   and re-add them to the Leaflet map. Handle the case when localStorage is
   empty (first visit).
   ```

3. Review Claude's approach and let it implement

4. Test: Add markers, categorise some as Favorites or Visited, refresh the page

5. Verify markers persist with their names, positions, and categories intact

6. Edge case test: Clear localStorage, refresh, verify map shows no markers   
a. `Safari`: Develop Menu → Developer Settings → Privacy → Manage Website Data → Remove all for 127.0.0.1  
b. `Chrome`: Press F12 → Developer Tools → Application Menu → Expand Storage from left menu → Clear
      

### Acceptance Criteria
- [ ] Markers persist across page refreshes
- [ ] Marker names, coordinates, and categories are preserved
- [ ] Empty localStorage shows an empty map and empty sidebar (no errors)
- [ ] No console errors

---

← [Previous: Getting Started](1-getting-started.md) | [Next: Model Context Protocol →](3-model-context-protocol.md)
