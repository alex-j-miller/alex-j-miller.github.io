# alex-j-miller.github.io

A personal portfolio website presented as an interactive terminal/CLI experience. Built with React, TypeScript, and Vite.

## Features

- **Interactive Terminal UI**: A fully functional command-line interface with command history and autocomplete
- **Boot Sequence**: Custom ASCII art and animated startup sequence
- **Command System**: Extensible command registry with custom command parsing
- **Virtual Filesystem**: Navigate a virtual file system with `cd`, `ls`, and other commands
- **Theming**: Multiple color themes for the terminal
- **Recruiter Mode**: Special mode for enhanced presentation
- **Static GitHub Data Cache**: GitHub Actions updates `/public/data/repos.json` every 6 hours
- **Fast Development**: Built with Vite for rapid development and instant HMR

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Fuse.js** - Fuzzy search for autocomplete

## Getting Started

### Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## GitHub Pages

This repo now includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that builds and deploys the site on every push to `main`.

### One-time setup

1. In GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

### Base path behavior

- User/organization site repos like `username.github.io` deploy with `/`.
- Project site repos deploy with `/<repo-name>/`.
- You can override either case by setting `VITE_BASE_PATH` in workflow or local env.

## Project Structure

- `src/components/` - React components (Terminal, BootSequence, Prompt, CommandOutput)
- `src/commands/` - Command parser and registry system
- `src/utils/` - Utility functions (autocomplete, grep)
- `src/hooks/` - Custom React hooks (useTerminal)
- `src/filesystem/` - Virtual filesystem implementation
- `src/config/` - Configuration files and settings
- `src/api/github.js` - GitHub repo cache loader with 1-hour localStorage caching
- `.github/workflows/update-github-data.yml` - Scheduled GitHub API cache refresh

## GitHub Repositories (Static Integration)

This project integrates GitHub repository data without any backend server:

1. A scheduled GitHub Action requests the GitHub REST API.
2. The workflow filters each repository down to:
	- `name`
	- `description`
	- `html_url`
	- `stargazers_count`
	- `language`
	- `updated_at`
3. The filtered response is saved to `public/data/repos.json`.
4. GitHub Pages serves that JSON as a static file.
5. The frontend reads `/data/repos.json` via `getGithubRepos()` in `src/api/github.js`.

Example `public/data/repos.json` payload:

```json
[
	{
		"name": "project-name",
		"description": "Project description",
		"html_url": "https://github.com/user/project-name",
		"stargazers_count": 12,
		"language": "TypeScript",
		"updated_at": "2025-10-01T00:00:00Z"
	}
]
```

Client-side caching behavior:

- `getGithubRepos()` uses `localStorage` for a 1-hour cache window.
- `github repos` reads from local cache when valid.
- `github refresh` bypasses cache and updates it from `/data/repos.json`.

The workflow also supports manual execution via `workflow_dispatch`.
