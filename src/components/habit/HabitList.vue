<!-- src/components//habit/HabitList.vue -->
<template>
  <div>
    <div class="flex justify-center">
      <h1 class="font-bold text-xl sm:text-3xl p-5">Habit list</h1>
    </div>
    <div class="flex justify-evenly flex-wrap">
      <ol class="list-decimal grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-12">
        <li class="p-2 font-semibold text-xl sm:text-3xl" v-for="habit in habitsList" :key="habit.id">
          <h3>
            {{ habit.name }}
          </h3>
            <div>
              <!-- Rename habit Button -->
              <button class="btn" @click="openRenameModal(habit.id)">Rename</button>
              <!-- Delete habit Button -->
              <button class="btn" @click="openDeleteModal(habit.id)">Delete</button>
            </div>
        </li>
      </ol>
    </div>
    <RenameHabitModal :isVisible="renameModalVisible" :habitId="selectedHabitId" @habit-updated="closeModals" @update:isVisible="renameModalVisible = $event" />
    <DeleteHabitModal :isVisible="deleteModalVisible" :habitId="selectedHabitId" @habit-deleted="closeModals" @update:isVisible="deleteModalVisible = $event" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import RenameHabitModal from './RenameHabitModal.vue';
import DeleteHabitModal from './DeleteHabitModal.vue';
import { useStore } from 'vuex';

const store = useStore();
const habitsList = ref(store.getters.getHabits);
const renameModalVisible = ref(false);
const deleteModalVisible = ref(false);
const selectedHabitId = ref(null);

const openRenameModal = (habitId) => {
  selectedHabitId.value = habitId;
  renameModalVisible.value = true;
};

const openDeleteModal = (habitId) => {
  selectedHabitId.value = habitId;
  deleteModalVisible.value = true;
};

const closeModals = () => {
  renameModalVisible.value = false;
  deleteModalVisible.value = false;
};

onMounted(() => {
  watch(() => store.getters.getHabits, (newHabits) => {
    habitsList.value = newHabits;
  });
});
</script>
