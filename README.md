# FocusBoard

FocusBoard is a responsive, single-page task dashboard built for the Mobile First Applications frontend assessment. It helps you organize daily work, see progress at a glance, and keep your task data in this browser.

## Features

- Dashboard statistics calculated from current task data.
- Create, edit, delete, and update task status.
- Search by title and combine status and priority filters.
- Three manually navigated focus note slides.
- Initial sample dataset includes the supplied reference tasks and twelve tasks total.
- Responsive desktop, tablet, and mobile layouts with keyboard focus states.
- Local browser storage with sample tasks used only when no saved task list exists.

## Technology

React, Vite, JavaScript, CSS, React Hooks, browser LocalStorage, and Lucide React.

## Project structure

```text
screenshots/   Desktop and mobile app captures
src/
  assets/
  components/   Reusable dashboard, task, form, and filter components
  data/         Initial sample task data
  hooks/        LocalStorage state hook
  App.jsx       State coordination and dashboard composition
  index.css     Global styles and design tokens
  App.css       Dashboard layout, component styles, and breakpoints
```

## Install and run

Node.js and npm are required.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Responsive captures

- `screenshots/desktop.png` — 1440 × 1000
- `screenshots/mobile.png` — 390 × 1128

The rendered app was also checked at 768 px for horizontal overflow.

## State and persistence

`App.jsx` owns the task list and passes data and actions to child components. The `useLocalStorage` hook reads `focusboard.tasks` on initial render. If a valid saved array exists, it is used as-is, including an empty array. Sample tasks are the fallback only when no usable saved task array is found. Changes are serialized back to LocalStorage. If browser storage is unavailable or contains invalid JSON, the app falls back to the sample data and logs a diagnostic in the console.

## Deployment

### GitHub

Create a repository on GitHub, then from this project directory run:

```sh
git init
git add .
git commit -m "Build FocusBoard task dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository URL. If Git is already initialized, skip `git init` and add the remote if needed.

### Vercel

Import the GitHub repository in Vercel. Use `npm run build` as the build command and `dist` as the output directory. Vite is detected automatically. Alternatively install the Vercel CLI and run `vercel`, then `vercel --prod` for production.

**Hosted URL:** _Add your deployed URL here._

## Design reference

Reference images were supplied in the conversation and used for the form treatment, purple accents, card styling, and mobile navigation. The Figma URL itself remains inaccessible, so its original canvas frames were not inspected. The Focus Notes banner uses the supplied purple style, titles, subtitles, and task preview. Its exact original artwork remains unverified.
