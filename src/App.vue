<!-- App.vue -->
<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header class="flex justify-center items-center">
    <h1 class="font-bold text-4xl py-6">Habits Tracking app</h1>
    </header>
    <main class="">
      <RouterView />
    </main>
  </div>
</template>
