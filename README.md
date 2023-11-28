# Habits Tracking App

This is a Vue.js application for tracking habits.

## Features

- Add new habits
- Rename existing habits
- Delete habits
- Track habit completion on a daily basis

## Components

- `App.vue`: The main application component
- `HomeView.vue`: The home view component, which displays the navigation, habit list, and add habit form
- `DayView.vue`: The day view component, which displays the habits for a specific date
- `TheNavigation.vue`: The navigation component, which displays links to the past days and an input for selecting a date
- `HabitList.vue`: The habit list component, which displays the list of habits
- `AddHabitForm.vue`: The add habit form component, which displays the form for adding a new habit
- `RenameHabitModal.vue`: The rename habit modal component, which displays the form for renaming an existing habit
- `DeleteHabitModal.vue`: The delete habit modal component, which displays the confirmation for deleting an existing habit
- `BackToHomeButton.vue`: The back to home button component, which displays a button for navigating back to the home view

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
