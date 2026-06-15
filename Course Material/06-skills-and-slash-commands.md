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

Skills also unlock **auto-invocation**: if you add a `description` to your skill's frontmatter, Claude loads the skill automatically when your conversation matches — even without you typing the slash command.

Skills are also more efficient than `CLAUDE.md`. Descriptions are always in context, but the full skill content only loads when invoked — so a long checklist or reference doc costs zero tokens until you need it. `CLAUDE.md` loads everything on every turn.

### Where Skills Live

```
~/.claude/skills/<name>/SKILL.md   # Personal — available in all your projects
.claude/skills/<name>/SKILL.md     # Project — shared with everyone who clones the repo
```

There are actually four scopes:

| Level      | Path                               | Applies to                     |
| ---------- | ---------------------------------- | ------------------------------ |
| Enterprise | Managed settings (org-controlled)  | All users in your organization |
| Personal   | `~/.claude/skills/<name>/SKILL.md` | All your projects              |
| Project    | `.claude/skills/<name>/SKILL.md`   | This project only              |
| Plugin     | `<plugin>/skills/<name>/SKILL.md`  | Where plugin is enabled        |

Project skills are the powerful ones for teams. Check them into version control and everyone gets the same workflow, the same prompt quality, and the same conventions — automatically.

> [!NOTE]
> The older `.claude/commands/<name>.md` format still works. Skills (the new format) are recommended since they support additional features like supporting files and frontmatter.

---

## Built-in Commands and Bundled Skills

Claude Code ships with both **built-in commands** (fixed logic) and **bundled skills** (prompt-based, same mechanism as your custom skills):

### Built-in Commands

| Command    | What It Does                           |
| ---------- | -------------------------------------- |
| `/clear`   | Clear the context window — start fresh |
| `/compact` | Summarize conversation to free context |
| `/memory`  | View and manage what Claude remembers  |
| `/model`   | Switch the active model                |
| `/help`    | Show available commands                |

### Bundled Skills

| Skill          | What It Does                                                 |
| -------------- | ------------------------------------------------------------ |
| `/code-review` | Review the current diff for bugs and improvements            |
| `/debug`       | Diagnose and fix a problem                                   |
| `/run`         | Launch and drive your app to see a change working            |
| `/verify`      | Confirm a code change does what it should in the running app |
| `/loop`        | Run a prompt or command on a recurring interval              |
| `/init`        | Generate a `CLAUDE.md` for a new project                     |

Bundled skills are prompt-based — they're just well-crafted skills that ship with Claude Code. You can read and learn from them the same way you'd read your own.

---

## Writing a Custom Skill

A skill is a directory containing a `SKILL.md` file. The directory name becomes the command name.

```
.claude/skills/my-skill/SKILL.md  →  /my-skill
```

### Basic Structure

```markdown
---
description: What this skill does and when Claude should use it. Claude reads this to decide when to load the skill automatically.
---

# My Skill Name

## Steps

1. First thing to do
2. Second thing to do
3. ...
```

The frontmatter is optional but recommended — the `description` field enables auto-invocation (Claude loads the skill without you typing `/skill-name`) and makes the skill visible in skill listings.

### Using Arguments

Use `$ARGUMENTS` anywhere in the file to pass in whatever the user types after the command:

```markdown
---
description: Explain a concept concisely with an analogy and gotchas.
---

# Explain

Explain the following to me as if I'm unfamiliar with it: $ARGUMENTS

- Be concise
- Use an analogy if it helps
- Point out gotchas
```

Then call it as: `/explain Leaflet marker clustering`

You can also access arguments by position:

| Placeholder     | Expands to                        |
| --------------- | --------------------------------- |
| `$ARGUMENTS`    | The full argument string as typed |
| `$ARGUMENTS[0]` | First argument                    |
| `$ARGUMENTS[1]` | Second argument                   |
| `$0`, `$1`, ... | Shorthand for the above           |

Example: `/migrate-component SearchBar React Vue` — `$0` = `SearchBar`, `$1` = `React`, `$2` = `Vue`.

### A Real Example

Here's a skill a team might use to standardise their PR descriptions. It uses **dynamic context injection** (`` !`command` ``) to pull in the live diff before Claude sees the prompt — so the output is grounded in actual changes, not inference.

```markdown
---
description: Write a pull request description from staged changes.
disable-model-invocation: true
---

# Write PR Description

## Staged changes

!`git diff --staged`

## Your task

Write a pull request description for the diff above:

1. A one-line summary (imperative mood, e.g. "Add marker clustering")
2. A "What changed" section — 3–5 bullet points, technical
3. A "Why" section — the motivation, 2–3 sentences
4. A "How to test" section — concrete steps a reviewer can follow

Be direct. No filler. No "this PR...".
```

The `` !`git diff --staged` `` line runs before Claude sees anything — the output is inlined into the prompt. `disable-model-invocation: true` prevents Claude from triggering this automatically (you don't want it auto-writing PR descriptions mid-conversation).

If the skill needs to run git commands itself (not just inject their output), add `allowed-tools` so Claude doesn't prompt for approval on each call:

```yaml
---
description: Stage and commit the current changes.
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---
```

Without this, Claude asks permission every time it runs a shell command — fine once, tedious in a multi-step workflow.

Stored at `.claude/skills/write-pr/SKILL.md`, it becomes `/write-pr` — available to every developer on the team.

---

## Key Takeaways

| Concept                                  | Remember                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| **Skills are directories with SKILL.md** | Frontmatter + markdown — `description` enables auto-invocation              |
| **Four scopes**                          | Enterprise > Personal > Project > Plugin                                    |
| **`$ARGUMENTS`**                         | Pass the full input; use `$0`, `$1` for positional args                     |
| **Bundled skills are skills too**        | `/code-review`, `/debug`, `/run` — same mechanism, just shipped with Claude |
| **Team value**                           | Project skills version-control your best prompts alongside your code        |
| **Dynamic context**                      | `` !`command` `` inlines live shell output before Claude reads the skill    |
| **`disable-model-invocation`**           | Prevents Claude from auto-triggering skills with side effects               |
| **`allowed-tools`**                      | Pre-approves specific tools so Claude doesn't prompt on each call           |
| **Skills vs CLAUDE.md**                  | Skills load on demand — long reference content costs nothing until needed   |

---

## Exercise: Write a Skill for Your Own Work

|              |                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------ |
| **Goal**     | Identify a repetitive prompting pattern in your own work and turn it into a reusable skill |
| **Concepts** | Skill authoring, `$ARGUMENTS`, personal vs project scope, frontmatter                      |

This exercise is deliberately open-ended. The best skill is one you'll actually use.

### Steps

1. **Identify a prompt you reuse** — or wish you had. Think about:
   - Something you explain or summarise repeatedly
   - A code review or feedback pattern you apply consistently
   - A document type you generate often (meeting notes, specs, ticket descriptions)
   - A debugging workflow you follow every time

2. **Write the skill**. Create the directory and file:

   ```
   mkdir -p ~/.claude/skills/<your-skill-name>
   # then create ~/.claude/skills/<your-skill-name>/SKILL.md
   ```

   Start simple — add a `description` in frontmatter and a few sentences of instruction. Add `$ARGUMENTS` if the skill needs variable input.

3. **Test it** in Claude Code:

   ```
   /<your-skill-name> [optional arguments]
   ```

4. **Refine it** — run it a second time and adjust the prompt based on what the output was missing or got wrong.

5. **Share with the group** — what did you build, and why? Is it something that would belong in a project's `.claude/skills/` for your whole team?

### Ideas If You're Stuck

- `/summarise-ticket` — paste a Jira/Linear ticket, get a one-paragraph plain-language summary
- `/write-adr` — generate an Architecture Decision Record for `$ARGUMENTS`
- `/review-naming` — critique the naming conventions in the current file
- `/standup` — given `` !`git log --oneline --since=yesterday` ``, draft a standup update
- `/explain` — explain `$ARGUMENTS` concisely with an analogy

### Acceptance Criteria

- [ ] Skill directory exists at `~/.claude/skills/<name>/SKILL.md` or `.claude/skills/<name>/SKILL.md`
- [ ] Skill runs without error when invoked as `/<name>`
- [ ] Output is useful and better than a generic prompt would produce
- [ ] You can explain what makes it better than just typing the prompt each time

---

---

## If You Finish Early

**Extension: Add a project skill to this workshop**

Write a skill that would be useful for the rest of today's exercises and add it to `.claude/skills/` in this repo. Think about what you've found yourself typing repeatedly so far, or what you'd want a shortcut for the rest of the modules.

Some candidates: a skill that reviews an implementation against its acceptance criteria, a skill that explains what a function does, or a skill that generates test cases for `$ARGUMENTS`. Try adding dynamic context injection (`` !`command` ``) to ground it in live data.

← [Previous: Transforming & Structuring Data](5-transforming-structuring-data.md) | [Next: Search & Live Filter →](7-search-and-filter.md)
