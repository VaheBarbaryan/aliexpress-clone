<script setup>
import { ref, toRefs, computed } from "vue";

const props = defineProps({
  input: {
    type: String,
    default: "",
  },
  type: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  max: {
    type: String,
    default: 100,
  },
  error: {
    type: String,
  },
});

const emits = defineEmits(["update:input"]);

const { input, placeholder, error } = toRefs(props);
const isFocused = ref(false);

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emits("update:input", val),
});
</script>

<template>
  <div>
    <client-only>
      <input
        :type="type"
        :placeholder="placeholder"
        :maxlength="max"
        class="w-full bg-white text-gray-800 border text-sm border-[#EFF0EB] rounded-lg p-3 placeholder-gray-500 transition ease-in-out focus:outline-none"
        :class="{ 'border-gray-900': isFocused, 'border-red-500': error }"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-model="inputComputed"
        autocomplete="off"
      />
    </client-only>

    <span v-if="error" class="text-red-500 text-[14px] font-semibold">{{
      error
    }}</span>
  </div>
</template>
