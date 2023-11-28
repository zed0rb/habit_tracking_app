import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/main.css';

// Dispatch the loadHabits action when the application starts
store.dispatch('loadHabits').then(() => {
  createApp(App).use(router).use(store).mount('#app');
});

