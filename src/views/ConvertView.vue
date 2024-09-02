<template>
  <div class="home p-8 max-w-3xl mx-auto mt-16">
    <h1 class="text-3xl font-bold mb-8">Currency Converter</h1>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="loader"></div>
    </div>
    <div v-else>
      <div class="mb-4 flex items-center space-x-4">
        <Dropdown :options="currencies" v-model="fromCurrency" />
        <input 
          type="number" 
          v-model="fromAmount" 
          @input="convertFrom" 
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter amount" 
        />
      </div>
      <div class="mb-4 flex items-center space-x-4">
        <Dropdown :options="currencies" v-model="toCurrency" />
        <input 
          type="number" 
          v-model="toAmount" 
          @input="convertTo" 
          class="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Converted amount" 
        />
      </div>
      <p v-if="error" class="text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { fetchCurrencyRates } from '../services/currencyApi';
import Dropdown from '../components/DropdownButton.vue';

export default {
  components: { Dropdown },
  setup() {
    const currencies = ['USD', 'EUR', 'RUB'];
    const fromCurrency = ref('USD');
    const toCurrency = ref('EUR');
    const fromAmount = ref(1);
    const toAmount = ref(0);
    const rates = ref({});
    const loading = ref(true);
    const error = ref('');

    const loadRates = async () => {
      loading.value = true;
      try {
        rates.value = await fetchCurrencyRates();
        convertFrom();
      } catch (error) {
        console.error('Error loading rates:', error);
      } finally {
        loading.value = false;
      }
    };

    const convertFrom = () => {
      if (isNaN(fromAmount.value)) {
        error.value = 'Please enter a valid number';
        return;
      }
      error.value = '';
      const rate = rates.value[`${fromCurrency.value.toLowerCase()}-${toCurrency.value.toLowerCase()}`];
      if (rate) {
        toAmount.value = (fromAmount.value * rate).toFixed(2);
      } else {
        error.value = 'Conversion rate not available';
      }
    };

    const convertTo = () => {
      if (isNaN(toAmount.value)) {
        error.value = 'Please enter a valid number';
        return;
      }
      error.value = '';
      const rate = rates.value[`${fromCurrency.value.toLowerCase()}-${toCurrency.value.toLowerCase()}`];
      if (rate) {
        fromAmount.value = (toAmount.value / rate).toFixed(2);
      } else {
        error.value = 'Conversion rate not available';
      }
    };

    onMounted(loadRates);
    watch([fromCurrency, toCurrency], loadRates);

    return {
      currencies,
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      loading,
      error,
      convertFrom,
      convertTo
    };
  }
}
</script>
