<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">eCommerce</h1>

        <div class="flex items-center space-x-4 md:hidden">
          <!-- Cart Icon for Mobile -->
          <NuxtLink to="/cart" class="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <!-- Mobile menu button -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-800"
            >Home</NuxtLink
          >
          <NuxtLink to="/products" class="text-gray-600 hover:text-gray-800"
            >Products</NuxtLink
          >
          <NuxtLink to="/about" class="text-gray-600 hover:text-gray-800"
            >About</NuxtLink
          >
          <NuxtLink to="/team" class="text-gray-600 hover:text-gray-800"
            >Team</NuxtLink
          >
          <NuxtLink to="/cart" class="relative flex items-center space-x-2">
            <i class="fas fa-shopping-cart text-gray-600"></i>
            <span class="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {{ cartCount }}
            </span>
          </NuxtLink>
          <template v-if="user">
            <span class="text-gray-600">{{ user.email }}</span>
            <button @click="logout" class="text-red-600 hover:text-red-800">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-gray-600 hover:text-gray-800"
              >Login</NuxtLink
            >
          </template>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isMenuOpen"
        class="md:hidden mt-4 pb-4 border-t border-gray-200"
      >
        <div class="flex flex-col space-y-4 mt-4">
          <NuxtLink
            to="/"
            class="text-gray-600 hover:text-gray-800"
            @click="isMenuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="text-gray-600 hover:text-gray-800"
            @click="isMenuOpen = false"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-gray-600 hover:text-gray-800"
            @click="isMenuOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/team"
            class="text-gray-600 hover:text-gray-800"
            @click="isMenuOpen = false"
          >
            Team
          </NuxtLink>
          <template v-if="user">
            <span class="text-gray-600">{{ user.email }}</span>
            <button
              @click="logout"
              class="text-red-600 hover:text-red-800 text-left"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-gray-800"
              @click="isMenuOpen = false"
            >
              Login
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      user: null,
      isMenuOpen: false,
    };
  },
  mounted() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
      this.isMenuOpen = false;
    },
  },
};
</script>
