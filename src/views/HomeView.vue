<!-- src/views/HomeView.vue -->
<template>
  <div>
    <TheNavigation :currentDate="$route.params.date" />
    <HabitList :habits="habits" />
    <AddHabitForm />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import TheNavigation from '@/components/TheNavigation.vue';
import HabitList from '@/components/habit/HabitList.vue';
import AddHabitForm from '@/components/habit/AddHabitModal.vue';

const store = useStore();
const habits = ref([]);

onMounted(async () => {
  await store.dispatch('loadHabits');
  habits.value = store.getters.getHabits;
});
</script>

<style>

</style>
