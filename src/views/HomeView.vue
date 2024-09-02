<template>
  <div class="home p-8 max-w-3xl mx-auto mt-16">
    <h1 class="text-3xl font-bold mb-6">Currency Rates</h1>
    <div v-if="loading" class="flex justify-center">
      <div class="loader"></div>
    </div>
    <div v-else class="grid gap-4">
      <div v-for="currency in filteredCurrencies" :key="currency" class="bg-gray-100 p-4 rounded-lg shadow-md">
        <div class="text-xl">
          1 {{ currency }} = <span class="font-semibold">{{ getRateForCurrency(currency) }}</span> {{ mainCurrency }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { fetchCurrencyRates } from '../services/currencyApi';

export default {
  props: ['mainCurrency'],
  setup(props) {
    const rates = ref({});
    const loading = ref(true);
    const currencies = ['USD', 'EUR', 'RUB'];

    const loadRates = async () => {
      loading.value = true;
      try {
        rates.value = await fetchCurrencyRates();
      } catch (error) {
        console.error('Error loading rates:', error);
      } finally {
        loading.value = false;
      }
    };

    const getRateForCurrency = (currency) => {
      const rate = rates.value[`${currency.toLowerCase()}-${props.mainCurrency.toLowerCase()}`];
      return rate ? parseFloat(rate).toFixed(2) : 'N/A';
    };

    const filteredCurrencies = computed(() => {
      return currencies.filter(currency => currency !== props.mainCurrency);
    });

    onMounted(loadRates);
    watch(() => props.mainCurrency, loadRates);

    return {
      rates,
      loading,
      filteredCurrencies,
      getRateForCurrency
    };
  }
};
</script>
