<script setup>
import { ref, computed, watchEffect } from "vue";
import { useUserStore } from "@/stores/user";

import MainLayout from "@/layouts/MainLayout.vue";

const userStore = useUserStore();
const route = useRoute();

const currentImage = ref("");
const images = ref([
  "",
  "https://picsum.photos/id/212/800/800",
  "https://picsum.photos/id/233/800/800",
  "https://picsum.photos/id/165/800/800",
  "https://picsum.photos/id/99/800/800",
  "https://picsum.photos/id/144/800/800",
]);

const priceComputed = computed(() => "26.40");
const isInCart = computed(() =>
  userStore.cart.some((prod) => route.params.id === prod.id)
);

const addToCart = () => {};

watchEffect(() => {
  currentImage.value = "https://picsum.photos/id/77/800/800";
  images.value[0] = "https://picsum.photos/id/77/800/800";
});
</script>

<template>
  <main-layout>
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex justify-between gap-4 mx-auto w-full">
        <div class="md:w-[40%]">
          <img :src="currentImage" alt="" class="rounded-lg object-fit" />
          <product-images
            :images="images"
            v-model:current-image="currentImage"
          />
        </div>
        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="true">
            <p class="mb-2">Title</p>
            <p class="font-light text-[12px] mb-2">Description Section</p>
          </div>
          <div class="flex items-center p-1.5">
            <span class="h-4 min-w-4 rounded-full p-0.5 bg-[#FFD000] mr-2">
              <Icon
                name="material-symbols:star-rounded"
                class="-mt-[17px]"
                size="12"
              />
            </span>
            <p class="text-[#FF3535]">Extra 5% off</p>
          </div>
          <div class="flex-items-center justify-start my-2">
            <Icon name="ic:baseline-star" color="#FF3535" />
            <Icon name="ic:baseline-star" color="#FF3535" />
            <Icon name="ic:baseline-star" color="#FF3535" />
            <Icon name="ic:baseline-star" color="#FF3535" />
            <Icon name="ic:baseline-star" color="#FF3535" />
            <span class="text-[13px] font-light ml-2"
              >5 123 Reviews 1,000+ orders</span
            >
          </div>
          <div class="border-b" />
          <div class="flex items-center justify-start gap-2 my-2">
            <div class="text-xl font-bold">${{ priceComputed }}</div>
            <span
              class="bg-[#F5F5F5] border text-[#C08562] text-[9px] font-semibold px-1.5 rounded-sm"
              >70% off</span
            >
          </div>
          <p class="text-[#009A66] text-xs font-semibold pt-1">
            Free 11-day delivery over $8.28
          </p>
          <p class="text-[#009A66] text-xs font-semibold pt-1">Free Shipping</p>
          <div class="py-2" />
          <button
            @click="addToCart"
            :disabled="isInCart"
            class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#FF851A] to-[#FFAC2C]"
          >
            <div v-if="isInCart">Is Added</div>
            <div v-else>Add to Cart</div>
          </button>
        </div>
      </div>
    </div>
  </main-layout>
</template>
