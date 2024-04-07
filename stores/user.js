import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    is_menu_overlay: false,
    is_loading: true,
    s_cart: [],
    s_checkout: [],
  }),
  getters: {
    isMenuOverlay: (state) => state.is_menu_overlay,
    isLoading: (state) => state.is_loading,
    cart: (state) => state.s_cart,
    checkout: (state) => state.s_checkout,
  },
  actions: {
    setLoading(loading) {
      this.is_loading = loading;
    },
    setIsMenuOverlay(value) {
      this.is_menu_overlay = !!value;
    },
    setCheckout(checkout) {
      this.s_checkout = checkout;
    },
    pushToCart(payload) {
      this.s_cart.push(payload)
    }
  },
});
