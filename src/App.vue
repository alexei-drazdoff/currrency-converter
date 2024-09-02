<template>
  <div id="app">
    <header class="bg-gray-800 bg-opacity-75 text-white p-4 fixed top-0 w-full z-50 flex justify-between items-center backdrop-filter backdrop-blur-md">
      <nav class="space-x-4">
        <router-link to="/" class="hover:text-gray-300 transition-colors">Home</router-link>
        <router-link to="/convert" class="hover:text-gray-300 transition-colors">Convert</router-link>
      </nav>
      <Dropdown :options="['USD', 'EUR', 'RUB']" v-model="mainCurrency" />
    </header>
    <router-view :main-currency="mainCurrency"></router-view>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import Dropdown from './components/DropdownButton.vue';

export default {
  components: { Dropdown },
  setup() {
    const mainCurrency = ref(localStorage.getItem('mainCurrency') || 'USD');

    const updateMainCurrency = () => {
      localStorage.setItem('mainCurrency', mainCurrency.value);
    };

    watch(mainCurrency, (newValue) => {
      localStorage.setItem('mainCurrency', newValue);
    });

    return {
      mainCurrency,
      updateMainCurrency
    };
  }
}
</script>
