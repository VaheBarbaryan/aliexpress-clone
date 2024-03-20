<script setup>
import MainLayout from "@/layouts/MainLayout.vue";

const products = [
  {
    id: 1,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/7/800/800",
    price: 89.99,
  },
  {
    id: 2,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/71/800/800",
    price: 8599.99,
  },
  {
    id: 3,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/72/800/800",
    price: 879.99,
  },
  {
    id: 4,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/73/800/800",
    price: 9.99,
  },
  {
    id: 5,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/74/800/800",
    price: 79.99,
  },
  {
    id: 6,
    title: "Title",
    description: "DESCRIPTION",
    url: "https://picsum.photos/id/75/800/800",
    price: 99.99,
  },
];
</script>

<template>
  <main-layout>
    <div id="indexPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
        v-if="products"
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <product-item
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </main-layout>
</template>
