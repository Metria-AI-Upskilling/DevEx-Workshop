# Module 6: Skills & Slash Commands

## What You'll Learn
- Understand what skills are and how they differ from prompts
- Use built-in slash commands to work more efficiently
- Write a custom skill that encapsulates a workflow you actually use

---

## The Problem: You're Rewriting the Same Prompts

You've found a prompt that works well. You use it every day. But every time you need it, you type it from scratch — or you dig it out of a notes file, copy it, paste it, adjust it for context.

If you work on a team, it's worse: everyone has their own version. The new joiner doesn't know it exists. The senior dev's version is better, but it lives in their head.

> [!WARNING]
> A great prompt that lives in a notes file is a prompt that gets forgotten, diverges, or never gets shared. Skills make prompts first-class, versioned, and reusable.

---

## The Solution: Skills

**A skill is a reusable prompt stored as a Markdown file that Claude loads on demand when you type `/skill-name`.**

That's it. No special syntax to learn. Write a Markdown file, put it in the right place, and you have a slash command.

```
Without skills:  remember the prompt → find it → copy → paste → adjust → run
With skills:     /my-skill → done
```

### Where Skills Live

```
~/.claude/commands/          # Personal skills — available in all your projects
.claude/commands/            # Project skills — shared with everyone who clones the repo
```

Project skills are the powerful ones for teams. Check them into version control and everyone gets the same workflow, the same prompt quality, and the same conventions — automatically.

---

## Built-in Skills Worth Knowing

Claude Code ships with several built-in slash commands:

| Command | What It Does |
|---------|-------------|
| `/plan` | Explore the codebase and plan an implementation before writing code |
| `/review` | Review the current diff for bugs and improvements |
| `/clear` | Clear the context window — start fresh for the next task |
| `/memory` | View and manage what Claude remembers about your project |
| `/init` | Generate a `CLAUDE.md` for a new project |

You've already used `/plan` in earlier modules. These are all skills — they just come bundled.

---

## Writing a Custom Skill

A skill is a Markdown file. The filename becomes the command name. The content is the prompt Claude runs.

```
.claude/commands/my-skill.md  →  /my-skill
```

### Basic Structure

```markdown
# My Skill Name

A one-line description of what this skill does.

## Steps

1. First thing to do
2. Second thing to do
3. ...
```

### Using Arguments

Use `$ARGUMENTS` anywhere in the file to pass in whatever the user types after the command:

```markdown
# Explain

Explain the following to me as if I'm unfamiliar with it: $ARGUMENTS

- Be concise
- Use an analogy if it helps
- Point out gotchas
```

Then call it as: `/explain Leaflet marker clustering`

### A Real Example

Here's a skill a team might create to standardise their PR descriptions:

```markdown
# Write PR Description

You are writing a pull request description for the following diff.

Read the staged changes and write:
1. A one-line summary (imperative mood, e.g. "Add marker clustering")
2. A "What changed" section — 3–5 bullet points, technical
3. A "Why" section — the motivation, 2–3 sentences
4. A "How to test" section — concrete steps a reviewer can follow

Be direct. No filler. No "this PR...".
```

Stored at `.claude/commands/write-pr.md`, it becomes `/write-pr` — available to every developer on the team.

---

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Skills are Markdown files** | No special syntax — just a prompt in a file |
| **Two scopes** | `~/.claude/commands/` for personal, `.claude/commands/` for team |
| **`$ARGUMENTS`** | Pass context to a skill at call time |
| **Built-ins are skills too** | `/plan`, `/review`, `/clear` — same mechanism, bundled |
| **Team value** | Project skills version-control your best prompts alongside your code |

---

## Exercise: Write a Skill for Your Own Work

| | |
|---|---|
| **Goal** | Identify a repetitive prompting pattern in your own work and turn it into a reusable skill |
| **Concepts** | Skill authoring, `$ARGUMENTS`, personal vs project scope |

This exercise is deliberately open-ended. The best skill is one you'll actually use.

### Steps

1. **Identify a prompt you reuse** — or wish you had. Think about:
   - Something you explain or summarise repeatedly
   - A code review or feedback pattern you apply consistently
   - A document type you generate often (meeting notes, specs, ticket descriptions)
   - A debugging workflow you follow every time

2. **Write the skill file**. Create it at:
   ```
   ~/.claude/commands/<your-skill-name>.md
   ```
   Start simple — a few sentences of instruction is enough. Add `$ARGUMENTS` if the skill needs variable input.

3. **Test it** in Claude Code:
   ```
   /<your-skill-name> [optional arguments]
   ```

4. **Refine it** — run it a second time and adjust the prompt based on what the output was missing or got wrong.

5. **Share with the group** — what did you build, and why? Is it something that would belong in a project's `.claude/commands/` for your whole team?

### Ideas If You're Stuck

- `/summarise-ticket` — paste a Jira/Linear ticket, get a one-paragraph plain-language summary
- `/write-adr` — generate an Architecture Decision Record for `$ARGUMENTS`
- `/review-naming` — critique the naming conventions in the current file
- `/standup` — given recent git commits, draft a standup update
- `/explain` — explain `$ARGUMENTS` concisely with an analogy

### Acceptance Criteria
- [ ] Skill file exists at `~/.claude/commands/<name>.md` or `.claude/commands/<name>.md`
- [ ] Skill runs without error when invoked as `/<name>`
- [ ] Output is useful and better than a generic prompt would produce
- [ ] You can explain what makes it better than just typing the prompt each time

---

---

## If You Finish Early

**Extension: Add a project skill to this workshop**

Write a skill that would be useful for the rest of today's exercises and add it to `.claude/commands/` in this repo. Think about what you've found yourself typing repeatedly so far, or what you'd want a shortcut for in Modules 7–10.

Some candidates: a skill that reviews an implementation against its acceptance criteria, a skill that explains what a function does, or a skill that generates test cases for `$ARGUMENTS`.

← [Previous: Transforming & Structuring Data](5-transforming-structuring-data.md) | [Next: Search & Live Filter →](7-search-and-filter.md)
