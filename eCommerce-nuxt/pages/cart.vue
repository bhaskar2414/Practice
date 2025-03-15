<template>
  <div class="min-h-screen bg-gray-100">
    <Header :cart-count="cart.length" />

    <main class="max-w-7xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">Shopping Cart</h2>

      <div v-if="cart.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-600">Your cart is empty</p>
        <NuxtLink
          to="/"
          class="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Continue Shopping
        </NuxtLink>
      </div>

      <div v-else class="flex space-x-6">
        <div class="w-7/12 bg-white rounded-lg shadow-md">
          <div v-for="(item, index) in cart" :key="index" class="p-4 border-b">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-4 w-[70%]">
                <img
                  :src="'https://picsum.photos/seed/' + item.id + '/100/100'"
                  :alt="item.title"
                  class="w-16 h-16 object-cover rounded"
                />
                <div class="w-full">
                  <h3 class="font-semibold">{{ item.title }}</h3>
                  <p class="text-gray-600">${{ item.price }}</p>
                </div>
              </div>
              <button
                @click="removeFromCart(index)"
                class="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="w-5/12 bg-white rounded-lg shadow-md p-4">
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold">Total:</span>
            <span class="text-xl font-bold">${{ total.toFixed(2) }}</span>
          </div>
          <button
            @click="checkout"
            :class="[
              'w-full mt-4 py-2 rounded-lg transition',
              isLoggedIn
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
            :disabled="!isLoggedIn"
          >
            {{
              isLoggedIn ? "Proceed to Checkout" : "Please Login to Checkout"
            }}
          </button>
          <p v-if="!isLoggedIn" class="mt-2 text-center text-gray-600">
            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800">
              Login
            </NuxtLink>
            or
            <NuxtLink to="/register" class="text-blue-600 hover:text-blue-800">
              Register
            </NuxtLink>
            to continue with checkout
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      user: null,
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    },
    isLoggedIn() {
      return this.user !== null;
    },
  },
  mounted() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.saveCart();
    },
    checkout() {
      if (!this.isLoggedIn) {
        this.$router.push("/login");
        return;
      }
      alert("Checkout functionality would be implemented here!");
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
};
</script>