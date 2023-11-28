<!-- src/components/habit/AddHabitModal.vue -->
<template>
  <div class="flex justify-center m-2">
    <button
      class="btn"
      @click="openModal"
    >
      Add New Habit
    </button>
    <div v-if="isModalOpen" class="overlay">
      <dialog :open="isModalOpen" class="modal p-5 bg-gray-300">
        <div>
          <h2 class="font-bold mb-4 text-lg">Add New Habit</h2>
          <input
            v-model="newHabit"
            placeholder="Enter new habit"
            class="border p-2 mb-4"
            @keyup.enter="addHabit"
          />
          <div class="space-x-4">
            <button
              class="btn"
              @click="addHabit"
            >
              Add Habit
            </button>
            <button
              class="btn"
              @click="closeModal"
            >
              Close
            </button>
          </div>
          <p v-if="showErrorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
        <p v-if="showImportErrorMessage" class="text-red-500">{{ errorMessage }}</p>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newHabit = ref('');
const isModalOpen = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref('');
const showImportErrorMessage = ref(false);

const openModal = () => {
  isModalOpen.value = true;
  showErrorMessage.value = false;
  errorMessage.value = '';
  showImportErrorMessage.value = false;
};

const closeModal = () => {
  isModalOpen.value = false;
  newHabit.value = '';
};

const addHabit = async () => {
  if (newHabit.value.trim() !== '') {
    try {
      const store = await import('@/store');
      const habitExists = store.default.getters.getHabits.some(habit => habit.name === newHabit.value.trim());
      if (habitExists) {
        showErrorMessage.value = true;
        errorMessage.value = 'habit already exists in the list.';
      } else {
        await store.default.dispatch('addHabit', {
          id: Date.now(),
          name: newHabit.value.trim(),
        });
        newHabit.value = '';
        closeModal();
      }
    } catch (error) {
      // Handle import error;
      showImportErrorMessage.value = true;
      errorMessage.value = 'An error occurred while adding the habit. Please try again.';
    }
  } else {
    errorMessage.value = 'Please enter a habit name.';
    showErrorMessage.value = true;
  }
};
</script>

