<template>
  <div class="min-h-screen bg-gray-100">
    <Header :cart-count="cart.length" />

    <main class="max-w-7xl mx-auto px-4 pt-24">
      <h1 class="text-3xl font-bold mb-8">Our Products</h1>

      <div v-if="loading" class="text-center py-12">
        <p class="text-xl">Loading products...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      cart: [],
      loading: true,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      this.products = data.slice(0, 12).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.body,
        price: (Math.random() * 100 + 10).toFixed(2),
      }));

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      this.loading = false;
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