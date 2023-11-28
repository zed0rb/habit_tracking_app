<!-- src/components/habit/RenameHabitModal.vue -->
<template>
  <div class="overlay" v-if="isVisible">
    <dialog :open="isVisible" class="modal p-5 bg-gray-300">
      <div>
        <h2 class="font-bold mb-4 text-lg">Rename Habit</h2>
        <input v-model="newName" placeholder="Enter new habit name" class="border p-2 mb-4" />
        <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
        <div class="space-x-4">
          <button class="btn" @click="renameHabit">Rename Habit</button>
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['isVisible', 'habitId']);
const store = useStore();
const newName = ref('');
const error = ref(null);

const { emit } = getCurrentInstance();

const renameHabit = () => {
  if (newName.value.trim() !== '') {
    const existingHabit = store.getters.getHabits.find(habit => habit.name === newName.value.trim());

    if (!existingHabit) {
      store.dispatch('renameHabit', { habitId: props.habitId, newName: newName.value.trim() });
      newName.value = '';
      error.value = null;
      emit('habit-updated');
    } else {
      error.value = 'A habit with this name already exists.';
    }
  }
};

const closeModal = () => {
  error.value = null; // Reset error state
  emit('update:isVisible', false);
};
</script>
