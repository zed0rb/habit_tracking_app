<!-- src/components/TheNavigation.vue -->
<template>
  <div class="flex justify-center p-2">
    <div class="flex justify-evenly items-center flex-wrap">
      <router-link
        class="rounded-lg p-3 m-3 bg-gray-500 hover:bg-gray-300"
        v-for="day in pastDays"
        :key="day"
        :to="{ name: 'Day', params: { date: day } }"
        @click="selectDay(day)"
      >
        <span class="font-semibold">{{ day }}</span>
      </router-link>
      <input
        type="date"
        v-model="selectedDate"
        @change="navigateToSelectedDate"
        :max="getCurrentDate()"
        class="p-3 rounded-lg bg-gray-500 hover:bg-gray-300"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedDate = ref();
const pastDays = ref([]);

const calculatePastDays = () => {
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const pastDay = new Date(today);
    pastDay.setDate(today.getDate() - i);
    pastDays.value.push(pastDay.toISOString().split('T')[0]);
  }
};

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

const selectDay = (day) => {
  selectedDate.value = day;
  navigateToSelectedDate();
};

const navigateToSelectedDate = () => {
  if (selectedDate.value) {
    router.push({ name: 'Day', params: { date: selectedDate.value } });
  }
};

onMounted(() => {
  calculatePastDays();
});
</script>
