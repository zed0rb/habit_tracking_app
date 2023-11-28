// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    habits: [],
  },

  mutations: {
    SET_HABITS(state, habits) {
      state.habits = habits;
      },

    ADD_HABIT(state, habit) {
      habit.dates = [];
      state.habits.push(habit);
      localStorage.setItem('habits', JSON.stringify(state.habits));
      },

    TOGGLE_HABIT_COMPLETION(state, { id, completed, date }) {
      const habitIndex = state.habits.findIndex((habit) => habit.id === id);
      if (habitIndex !== -1) {
        const habit = state.habits[habitIndex];
        const dateEntryIndex = habit.dates.findIndex((entry) => entry.date === date);
        if (dateEntryIndex !== -1) {
          habit.dates[dateEntryIndex].completed = completed;
        } else {
          habit.dates.push({ date, completed });
        }
        localStorage.setItem('habits', JSON.stringify(state.habits));
      }},

    RENAME_HABIT(state, { id, newName }) {
      const habitIndex = state.habits.findIndex((habit) => habit.id === id);
      if (habitIndex !== -1) {
        state.habits[habitIndex].name = newName;
        localStorage.setItem('habits', JSON.stringify(state.habits));
      }},

  DELETE_HABIT(state, habitId) {
    state.habits = state.habits.filter((habit) => habit.id !== habitId);
    localStorage.setItem('habits', JSON.stringify(state.habits));
    },
  },

  actions: {
    loadHabits({ commit }) {
      const habits = JSON.parse(localStorage.getItem('habits')) || [];
      commit('SET_HABITS', habits);
      },

    addHabit({ commit }, habit, status) {
      commit('ADD_HABIT', habit, status);
      },

    toggleHabitCompletion({ commit }, payload) {
      commit('TOGGLE_HABIT_COMPLETION', payload);
      },

    renameHabit({ commit }, { habitId, newName }) {
      commit('RENAME_HABIT', { id: habitId, newName });
      },

    deleteHabit({ commit }, habitId) {
      commit('DELETE_HABIT', habitId);
      },
  },

  getters: {
    getHabits: (state) => state.habits,
  },
});

export default store;
