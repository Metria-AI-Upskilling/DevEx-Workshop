# Module 1: Getting Started

## What You'll Learn
- Set up your development environment
- Run the TODO app locally
- Understand the project structure

---

In this section you will learn how to run the demo TODO app on localhost so you can use it to complete the exercises.

## Prerequisites
#### 1. Github account
Make sure you can log in to your GitHub account before the workshop.

#### 2. Install the homebrew
Install the package manager [homebrew](https://brew.sh) for easy installations (only for MacOS)  
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

#### 5. An IDE ([Cursor](https://cursor.com), VSCode, or terminal-only)  
Install the IDE of your choice or choose to work with Terminal/Command Prompt depending on your OS.  

#### 6. Clone the course material repository
We will share a repository with you — check with the workshop organiser for the URL. In this step, you will get a local copy of that repository so you can work through the exercises.

  ***Cursor***    
  Open Cursor and select the `Clone Git Repository` option. Paste in the repository URL shared with you.
  
  ***VSCode***  
  Open VSCode, open the Command Palette (`Cmd+Shift+P` on Mac / `Ctrl+Shift+P` on Windows), type `Git: Clone`, and select it. Paste in the repository URL shared with you and follow the steps in the dialog.
  
  ***Terminal***  
  ```bash
  cd <path_where_you_want_to_clone_repo>
  git clone <repository_url_shared_with_you>
  ```
#### 7. Install claude  
  Open a new Terminal instance in Cursor. (Terminal Menu -> New Terminal)  
  
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
You already have access to Claude through your internal tools, no extra setup needed here.


#### 9. Further steps
If you want to learn further about CLAUDE.md, memory management and advanced knowledge in agentic AI, see the [official Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/overview).

## Project Structure

```
DevEx-Workshop/
├── index.html      # Main HTML markup - contains the app layout
├── styles.css      # All CSS styling for the app
├── main.js         # Application logic (add, delete, filter todos)
├── package.json    # Project dependencies and scripts
└── vite.config.js  # Vite configuration
```

**How it works:**
- `index.html` defines the structure (input field, buttons, todo list)
- `styles.css` styling
- `main.js` handles all the interactivity (adding todos, marking complete, filtering)

## Exercise: Run the TODO App
**Goal**: Get the TODO app running locally to verify your setup works

**Steps**:

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm run dev
   ```

3. Open the app at the URL shown (typically `http://localhost:5173`)

4. Test: add a todo, mark it complete, delete it, try the filter buttons

**Exercise is complete when**: App loads without errors and all basic features (add, complete, delete, filter) work

---

[Next: Working with AI Agents →](2-working-with-ai-agents.md)
