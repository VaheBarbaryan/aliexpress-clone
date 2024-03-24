<script setup>
import { ref, watch, onMounted } from "vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const route = useRoute()

let windowWidth = ref(process.client ? window.innerWidth : "")

watch(windowWidth, (newValue) => {
  if (newValue > 767) {
    userStore.setIsMenuOverlay(false)
  }
})

watch(
  () => route.fullPath,
  () => {
    userStore.setLoading(false)
  }
)

onMounted(() => {
  userStore.setLoading(false)
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth
  })
})
</script>

<template>
  <nuxt-page />

  <menu-overlay
    :class="[
      {
        'max-h-[100vh] transition-all duration-200 ease-in visible':
          userStore.isMenuOverlay,
      },
      {
        'max-h-0 transition-all duration-200 ease-out visible':
          !userStore.isMenuOverlay,
      },
    ]"
  />
</template>
