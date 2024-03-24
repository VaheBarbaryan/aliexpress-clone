<script setup>
import { ref, onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";

import MainLayout from "@/layouts/MainLayout.vue";

const userStore = useUserStore();

let selectedArray = ref([]);

const cards = ref(["visa.png", "mastercard.png", "paypal.png", "applepay.png"]);

const totalPriceComputed = computed(() =>
  userStore.cart.reduce((acc, prod) => {
    acc += prod.price;
    return acc;
  }, 0)
);

const products = [
  {
    id: 1,
    title: "title",
    description: "This is description",
    url: "https://picsum.photos/id/7/800/800",
    price: 6899,
  },
  {
    id: 2,
    title: "title",
    description: "This is description",
    url: "https://picsum.photos/id/7/800/800",
    price: 9899,
  },
  {
    id: 3,
    title: "title",
    description: "This is description",
    url: "https://picsum.photos/id/71/800/800",
    price: 9699,
  },
];

const selectedRadio = (data) => {
  if (!selectedArray.value.length) {
    selectedArray.value.push(data);
    return;
  }

  selectedArray.value.forEach((item, index) => {
    if (data.id != item.id) {
      selectedArray.value.push(data);
    } else {
      selectedArray.value.splice(index, 1);
    }
  });
};

const goToCheckout = () => {
  let ids = [];
  userStore.setCheckout([]);
  selectedArray.value.forEach((item) => ids.push(item.id));

  let res = userStore.cart.filter((item) => ids.includes(item.id));

  res.forEach((item) => userStore.s_checkout.push(toRaw(item)));

  return navigateTo("/checkout");
};

onMounted(() => {
  setTimeout(() => userStore.setLoading(false), 8000);
});
</script>

<template>
  <main-layout>
    <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div v-if="false" class="h-[500px] flex items-center justify-center">
        <div class="pt-20">
          <img src="/cart-empty.png" width="250" class="mx-auto" />
          <div class="text-xl text-center mt-4">No items yet?</div>
          <div v-if="true" class="flex items-center text-center">
            <nuxt-link
              to="/auth"
              class="bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
              >Sign in</nuxt-link
            >
          </div>
        </div>
      </div>
      <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-2xl font-bold mb-2">Shopping Cart (0)</div>
          </div>

          <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
            <div class="text-red-500 font-bold">
              Welcome Deal applicable on 1 item only
            </div>
          </div>
          <div id="Items" class="bg-white rounded-lg p-4 mt-4">
            <div v-for="product in products" :key="product.id">
              <cart-item
                :product="product"
                :selected-array="selectedArray"
                @selected-radio="selectedRadio"
              />
            </div>
          </div>
        </div>
        <div class="md:hidden block my-4" />

        <div class="md:w-[35%]">
          <div id="Summary" class="bg-white rounded-lg p-4">
            <div class="text-2xl font-extrabold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold">
                $ <span class="font-extrabold">{{ totalPriceComputed }}</span>
              </div>
            </div>

            <button
              @click="goToCheckout"
              class="flex items-center justify-center bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            >
              Checkout
            </button>
          </div>
          <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
            <div class="text-lg font-semibold mb-2">Payment Methods</div>
            <div class="flex items-center justify-start gap-8 my-4">
              <div v-for="card in cards" :key="card">
                <img class="h-6" :src="card" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>
