<!-- src/view.vue -->
<template>
  <TheNavigation />
  <div>
    <div class="flex justify-center">
      <h2 class="font-semibold text-xl sm:text-3xl p-10">Habits for {{ $route.params.date }}</h2>
    </div>
    <div class="flex justify-center flex-wrap">
      <div class="p-2 font-semibold text-xl sm:text-3xl" v-for="habit in habits" :key="habit.id">
        <label :for="getCheckboxId(habit.id)">
          <input
            :id="getCheckboxId(habit.id)"
            class="sm:w-5 sm:h-5 m-3"
            type="checkbox"
            :checked="isCompletedOnDate(habit, $route.params.date)"
            @change="toggleCompletion(habit)"
          />
          <span>{{ habit.name }}</span>
        </label>
      </div>
    </div>
  </div>
  <BackButton />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TheNavigation from "@/components/TheNavigation.vue";
import BackButton from "@/components/common/BackToHomeButton.vue";

const store = useStore();
const habits = ref([]);
const route = useRoute();
const dateParam = ref(route.params.date);

const isCompletedOnDate = (habit, date) => {
  const dateEntry = habit.dates.find((entry) => entry.date === date);
  return dateEntry ? dateEntry.completed : false;
};

const toggleCompletion = (habit) => {
  const dateEntry = habit.dates.find((entry) => entry.date === dateParam.value);
  store.dispatch('toggleHabitCompletion', {
    id: habit.id,
    completed: dateEntry ? !dateEntry.completed : true,
    date: dateParam.value,
  });
};

const loadHabitsForSelectedDate = () => {
  store.dispatch('loadHabits');
  habits.value = store.getters.getHabits;
};

onMounted(() => {
  loadHabitsForSelectedDate();
});


watch(() => route.params.date, (newDate) => {
  dateParam.value = newDate;
  loadHabitsForSelectedDate();
});

const getCheckboxId = (habitId) => `habitCheckbox_${habitId}_${dateParam.value}`;
</script>
