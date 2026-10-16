# FitLog — Workout & Daily Planner

## Project Description

FitLog is a fitness web application for browsing exercises, planning daily workouts, and saving lifts for later. Users can explore workout instructions, build a plan of up to five exercises, and mark workouts as completed. Plan totals and navbar counters update immediately as users interact with the app.

The interface uses a dark theme with lime accents and adapts to desktop and mobile screens. Workout selections are saved in the browser using localStorage.

## Technologies Used

- **Next.js 16** — App Router, page routing, and server-rendered workout data.
- **React 19** — Interactive components and shared workout state.
- **JavaScript (JSX)** — Application logic and component development.
- **Tailwind CSS 4** — Responsive layouts and styling.
- **DaisyUI 5** — Tailwind CSS component utilities.
- **nextjs-toast-notify** — Toast notifications for workout actions.
- **Browser localStorage** — Persistent plan and saved workout selections.
- **ESLint** — Code linting with Next.js rules.

## Features

1. **Workout library:** Browse exercises with images, muscle groups, equipment, duration, calories, and ratings.
2. **Workout details:** View exercise descriptions, difficulty, sets, repetitions, and step-by-step instructions.
3. **Daily workout plan:** Add up to five exercises, remove workouts, and mark exercises as done to free a slot.
4. **Save for later:** Save and unsave exercises independently of today's plan, with a dedicated Saved list.
5. **Live totals and navbar counters:** Automatically update exercise counts, total minutes, calories, and Plan/Saved badges after each relevant action.
6. **Workout sorting:** Sort plan and saved workouts by duration, calories, or rating.
7. **Persistent selections:** Restore plan and saved workouts after refreshing the page and synchronize changes across browser tabs.
8. **Toast notifications:** Show feedback when workouts are added, saved, removed, or completed, with automatic and manual dismissal.
9. **Responsive interface:** Support desktop and mobile layouts, mobile navigation, and helpful empty states with a link to the workout library.

## Getting Started

From the `fitness_app` directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint checks. |

## Workout Data and Storage

Workout data is fetched from `https://api.abcz.workers.dev/api/fitlog`, so loading the library and workout details requires an internet connection. Plan and saved selections are stored locally in the current browser; they are not linked to a user account or synchronized across devices.
