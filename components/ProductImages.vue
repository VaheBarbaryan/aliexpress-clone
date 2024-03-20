<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
  currentImage: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:currentImage"]);
</script>

<template>
  <div v-if="images.length > 0" class="flex items-center justify-center mt-2">
    <product-image
      v-for="image in images"
      :key="image"
      :image="image"
      :class="currentImage === image ? 'border-[#FF5353]' : ''"
      @mouseover="emits('update:currentImage', image)"
      @click="emits('update:currentImage', image)"
    />
  </div>
</template>
