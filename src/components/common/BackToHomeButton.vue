<!-- src/components/common/BackToHomeButton.vue -->
<template>
  <div class="flex justify-center m-5">
    <button class="btn" @click="goBack">Go Back</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = ref(null);

onMounted(() => {
  router.value = useRouter();
});

const goBack = () => router.value?.push({ name: 'Home' });
</script>