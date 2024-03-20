<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <img
      width="70"
      class="rounded-md object-fit border-[3px] cursor-pointer"
      v-bind="$attrs"
      :src="image"
    />
  </div>
</template>
