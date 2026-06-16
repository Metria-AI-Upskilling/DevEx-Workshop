# Module 01: Getting Started

## What You'll Learn
- Set up your development environment
- Run the Map app locally
- Understand the project structure

---

In this section you will learn how to run the demo Map app on localhost so you can use it to complete the exercises.

## Prerequisites
#### 1. Github account
Make sure you can log in to your GitHub account before the workshop.

#### 2. Install homebrew (MacOS)
For easy installations (MacOS), install the package manager [homebrew](https://brew.sh).
Run this in the `Terminal` application (Cmd + Space -> Terminal)

  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
#### 3. Install Git
With Git installed on your machine, you allow your computer to connect with your github account.

  ***MacOS*** (type the following in a Terminal windows and press Enter)
  ```bash
  brew install git
  ```
  ***Windows***
  Download the Git software from [here](https://git-scm.com/install/windows). To verify if it has
  been installed correctly, run `git --version` in the Command Prompt. It should run without
  any errors.

#### 4. Install Node
  ***MacOS***
  ```bash
  brew install node
  npm --version ##Verify installation
  ```
  ***Windows***
  Download it for your computer [here](https://nodejs.org/en/download). Always choose `LTS`
  versions for install.

#### 5. An IDE ([VSCode](https://code.visualstudio.com/), [Cursor](https://cursor.com), [IntelliJ](https://lp.jetbrains.com/intellij-idea-promo))
Install the IDE of your choice for working with code. They can also be used to interact Claude, but be aware this course focuses on using Claude Code in the Terminal.

#### 6. Clone the course material repository
Clone the course material through the command below. Development will be done completely on your local machine, you don't need to push or fork the repo.

 !!! note
      If you want to contribute, push your own branch, or fork the repo – let the organisers know – we'll add you to the Metria AI Upskilling GitHub organization.

***Terminal***
```bash
cd <path_where_you_want_to_clone_repo_to>
git clone git@github.com:Metria-AI-Upskilling/DevEx-Workshop.git
```

***VSCode***
Open VSCode, open the Command Palette (`Cmd+Shift+P` on Mac / `Ctrl+Shift+P` on Windows), type `Git: Clone`, and select it. Paste in the repository URL shared with you and follow the steps in the dialog.

***Cursor***
Open Cursor and select the `Clone Git Repository` option. Paste in the repository URL shared with you.

#### 7. Install claude

  Open a new terminal instance in the Terminal app, or your IDE of choice. Then run the following commands.

  ***MacOS***
  ```bash
  brew install claude-code
  ```
  ***Windows***
  ```bash
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```
> [!WARNING]
> Before the next step, make sure you have switched to your repository folder i.e., DevEx-Workshop. Otherwise, you will end up giving Claude access to all of your computer which can be dangerous.
  ```bash
  cd <path-to-DevEx-Workshop>
  claude
  ```

#### 8. Access to Claude
You should have access to Claude through Metria's Claude Enterprise license. If not, please contact your Metria representative.


#### 9. Further steps
If you want to learn further about CLAUDE.md, memory management and advanced knowledge in agentic AI, see the [official Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/overview).

## Project Structure

```
DevEx-Workshop/
└── map-app/                        # Angular application
    ├── src/
    │   ├── app/
    │   │   ├── map/                # Map component (Leaflet map, marker placement)
    │   │   ├── sidebar/            # Sidebar component (marker list, filters)
    │   │   ├── marker.service.ts   # Shared state and marker logic
    │   │   ├── app.ts              # Root component
    │   │   └── app.config.ts       # App configuration
    │   ├── index.html              # Main HTML entry point
    │   └── styles.css              # Global styles
    ├── angular.json                # Angular CLI configuration
    └── package.json                # Project dependencies and scripts
```

**How it works:**
- `map/` component handles Leaflet map rendering and marker placement
- `sidebar/` component shows the marker list and filter buttons
- `marker.service.ts` is the shared service that holds marker state and drives both components

## Exercise: Run the Map App
**Goal**: Get the Map app running locally to verify your setup works

**Steps**:

1. Navigate to the app directory and install dependencies
   ```bash
   cd map-app
   npm install
   ```

2. Start the development server
   ```bash
   npm start
   ```

3. Open the app at the URL shown (typically `http://localhost:4200`)

4. Test: click the map to place a marker, name it, try the filter buttons, click a marker in the sidebar list to fly to it

**Exercise is complete when**: App loads without errors, a map of Luleå is visible, clicking the map places a named marker, and filter buttons work

---

← [Back to Course Material](README.md) | [Next: Working with AI Agents →](02-working-with-ai-agents.md)
