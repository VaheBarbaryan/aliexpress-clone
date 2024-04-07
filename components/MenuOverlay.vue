<script setup>
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

const menuLinks = [
  { title: "My Orders", to: "orders", icon: "ph:pen-light" },
  {
    title: "Cart",
    to: "shoppingcart",
    icon: "ph:shopping-cart-simple-light",
    showCartCount: true,
  },
]

const goTo = (url) => {
  userStore.setIsMenuOverlay(false)
  return navigateTo(`/${url}`)
}

const signOut = () => {
  client.auth.signOut()
  userStore.setCheckout(false)
  return navigateTo("/")
}

const signIn = () => {
  userStore.setIsMenuOverlay(false)
  return navigateTo("/auth")
}
</script>

<template>
  <div id="MenuOverlay" class="fixed z-50 bottom-0 h-full w-full bg-white px-3">
    <div class="flex items-center justify-between py-5">
      <nuxt-link to="/" @click="userStore.setIsMenuOverlay(false)">
        <img width="170" src="/AliExpress-logo.png" />
      </nuxt-link>
      <button
        @click="userStore.setIsMenuOverlay(false)"
        class="rounded-full p-1 hover:bg-gray-200"
      >
        <Icon name="mdi:close" size="30" />
      </button>
    </div>

    <div class="flex items-center justify-between pt-5">
      <ul class="w-full" v-if="menuLinks.length > 0">
        <li
          v-for="link in menuLinks"
          :key="link.title"
          @click="goTo(link.to)"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon :name="link.icon" size="33" />
            <span class="pl-4">{{ link.title }}</span>
          </div>
          <div
            v-if="link.showCartCount"
            class="flex items-center justify-center bg-[#FF4646] h-[35px] min-w-[35px] text-lg text-white rounded-full"
          >
            {{ userStore.cart.length }}
          </div>
        </li>
        <li
          v-if="user"
          @click="signOut"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-out-light" size="33" />
            <span class="pl-4">Sign out</span>
          </div>
        </li>
        <li
          v-else
          @click="signIn"
          class="relative flex items-center justify-between py-2.5 border-b px-3 hover:bg-gray-100 cursor-pointer"
        >
          <div class="flex items-center text-[20px] font-semibold">
            <Icon name="ph:sign-in-light" size="33" />
            <span class="pl-4">Sign in / Register</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
