<script setup>
import {ref, onMounted, onBeforeMount} from "vue";
import {useUserStore} from "@/stores/user";

import MainLayout from "@/layouts/MainLayout.vue";

const userStore = useUserStore();

const products = ref(null)

onBeforeMount(async () => {
  products.value = await useFetch(`/api/prisma/get-all-products`);
  // setTimeout(() => userStore.setLoading(false), 1000)
  userStore.setLoading(false)
});
</script>

<template>
  <main-layout>
    <div id="indexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
          v-if="products && products.data && products.data.length > 0"
          class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <product-item
            v-for="product in products.data"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>
  </main-layout>
</template>
