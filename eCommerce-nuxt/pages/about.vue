<template>
  <div class="min-h-screen bg-gray-100">
    <Header :cart-count="cart.length" />

    <main class="max-w-7xl mx-auto px-4 pt-24">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-3xl font-bold mb-6">About E-Shop</h1>

        <div class="prose max-w-none">
          <p class="mb-4">
            Welcome to E-Shop, your number one source for all things [products].
            We're dedicated to providing you the very best of [products], with
            an emphasis on quality, customer service, and uniqueness.
          </p>

          <p class="mb-4">
            Founded in 2024, E-Shop has come a long way from its beginnings.
            When we first started out, our passion for providing the best
            products to our customers drove us to start our own business.
          </p>

          <p class="mb-4">
            We hope you enjoy our products as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us.
          </p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p class="mb-4">
            To provide our customers with the best quality products at
            competitive prices while maintaining excellent customer service and
            satisfaction.
          </p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p>
            To become the leading e-commerce platform known for quality,
            reliability, and customer satisfaction.
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
    };
  },
  mounted() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  },
};
</script>