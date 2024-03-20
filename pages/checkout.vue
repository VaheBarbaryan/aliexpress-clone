<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/user";

import MainLayout from "@/layouts/MainLayout.vue";

const userStore = useUserStore();

let stripe = null;
let elements = null;
let cards = null;
let form = null;
let total = ref(0);
let clientSecret = null;
let currentAddress = ref(null);
let isProcessing = ref(false);

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

const stripeInit = async () => {};

const pay = async () => {};

const createOrder = async (stripId) => {};

const showError = (errorMsg) => {};

watch(
  () => total.value,
  async () => {
    if (total.value > 0) {
      await stripeInit();
    }
  }
);

onMounted(() => {
  isProcessing.value = true;
  console.log("userStore.checkout", userStore.checkout);
  userStore.checkout.forEach((item) => {
    total.value += item.price;
  });
});
</script>

<template>
  <main-layout>
    <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-xl font-semibold mb-2">Shipping Address</div>
            <div v-if="false">
              <nuxt-link
                to="/address"
                class="flex items-center pb-2 text-blue-500 hover:text-red-400"
              >
                <Icon name="mdi:plus" size="18" class="mr-2" />
                Update Address
              </nuxt-link>
              <div class="pt-2 border-t">
                <div class="underline pb-1">Delivery Address</div>
                <ul class="text-xs">
                  <li class="flex items-center gap-2">
                    <div>Contact name:</div>
                    <div class="font-bold">TEST</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Address:</div>
                    <div class="font-bold">TEST</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Zip Code:</div>
                    <div class="font-bold">TEST</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>City:</div>
                    <div class="font-bold">TEST</div>
                  </li>
                  <li class="flex items-center gap-2">
                    <div>Country:</div>
                    <div class="font-bold">TEST</div>
                  </li>
                </ul>
              </div>
            </div>
            <nuxt-link
              v-else
              to="/address"
              class="flex items-center text-blue-500 hover:text-red-400"
            >
              <Icon name="mdi:plus" size="18" class="mr-2" />
              Add New Address
            </nuxt-link>
          </div>
          <div id="Items" class="bg-white rounded-lg p-4 mt-4">
            <div v-for="product in products" :key="product.id">
              <checkout-item :product="product" />
            </div>
          </div>
        </div>

        <div class="md:hidden block my-4" />

        <div class="md:w-[35%]">
          <div id="PlaceOrder" class="bg-white rounded-lg p-4">
            <div class="text-2xl font-semibold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div>Total Shipping</div>
              <div>Free</div>
            </div>

            <div class="border-t" />

            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold">
                $ <span class="font-extrabold">{{ total / 100 }}</span>
              </div>
            </div>

            <form @submit.prevent="pay">
              <div
                id="CardElement"
                class="border border-gray-500 p-2 rounded-sm"
              />

              <p
                id="CardError"
                role="alert"
                class="text-red-700 text-center font-semibold"
              />

              <button
                :disabled="isProcessing"
                type="submit"
                class="mt-4 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
                :class="isProcessing ? 'opacity-70' : 'opacity-100'"
              >
                <Icon v-if="isProcessing" name="eos-icons:loading" />
                <div v-else>Place order</div>
              </button>
            </form>
          </div>

          <div class="bg-white rounded-lg p-4 mt-4">
            <div class="text-lg font-semibold my-2">Aliexpress</div>
            <p class="my-2">
              Aliexpress keeps your information and payment safe
            </p>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>
