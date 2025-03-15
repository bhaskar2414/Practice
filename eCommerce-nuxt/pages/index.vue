<template>
  <div class="min-h-screen bg-gray-100">
    <Header :cart-count="cart.length" />

    <div class="pt-16">
      <!-- Hero Section -->
      <div class="bg-blue-600 text-white">
        <div class="max-w-7xl mx-auto px-4 py-16">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">Welcome to E-Shop</h1>
            <p class="text-xl mb-8">
              Discover amazing products at great prices
            </p>
            <NuxtLink
              to="/products"
              class="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Shop Now
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Featured Products -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <h2 class="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
        <div class="text-center mt-8">
          <NuxtLink to="/products" class="text-blue-600 hover:text-blue-800">
            View All Products →
          </NuxtLink>
        </div>
      </div>

      <!-- Features Section -->
      <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl mb-4">🚚</div>
              <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
              <p class="text-gray-600">On orders over $50</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-4">⭐</div>
              <h3 class="text-xl font-semibold mb-2">Best Quality</h3>
              <p class="text-gray-600">Guaranteed products</p>
            </div>
            <div class="text-center">
              <div class="text-4xl mb-4">🔒</div>
              <h3 class="text-xl font-semibold mb-2">Secure Payments</h3>
              <p class="text-gray-600">100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      featuredProducts: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      this.featuredProducts = data.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title.slice(0, 30) + "...",
        description: item.body.slice(0, 100) + "...",
        price: (Math.random() * 100 + 10).toFixed(2),
      }));

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      alert("Product added to cart!");
    },
  },
};
</script>