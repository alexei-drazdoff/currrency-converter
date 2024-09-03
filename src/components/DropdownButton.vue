<template>
  <div class="relative inline-block text-center" ref="dropdown">
    <button
      @click="toggleDropdown"
      class="inline-flex justify-between items-center w-full rounded-lg bg-gray-500 border-gray-300 text-white px-4 py-2 shadow-sm focus:outline-none"
    >
      {{ selected }}
      <svg
        class="ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      v-show="open"
      class="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="py-1">
        <button
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const open = ref(false);
    const selected = ref(props.modelValue);
    const dropdown = ref(null);

    const toggleDropdown = () => {
      open.value = !open.value;
    };

    const selectOption = (option) => {
      selected.value = option;
      emit('update:modelValue', option);
      open.value = false;
    };

    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        open.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      open,
      selected,
      toggleDropdown,
      selectOption,
      dropdown,
    };
  },
};
</script>
