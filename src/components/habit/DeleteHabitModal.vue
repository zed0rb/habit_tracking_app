<!-- src/components//habit/DeleteHabitModal.vue -->
<template>
  <div class="overlay" v-if="isVisible">
    <dialog :open="isVisible" class="modal p-5 bg-gray-300">
      <div>
        <h2 class="font-bold mb-4 text-lg">Delete Habit</h2>
        <p>Are you sure you want to delete this habit?</p>
        <div class="space-x-4">
          <button class="btn" @click="deleteHabit">Delete Habit</button>
          <button class="btn" @click="closeModal">Close</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { defineProps, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['isVisible', 'habitId']);
const store = useStore();
const { emit } = getCurrentInstance();

const deleteHabit = () => {
  store.dispatch('deleteHabit', props.habitId);
  closeModal();
};

const closeModal = () => {
  emit('update:isVisible', false);
};
</script>

