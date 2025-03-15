<template>
  <div class="min-h-screen bg-gray-100">
    <Header :cart-count="cart.length" />

    <main class="max-w-7xl mx-auto px-4 pt-24">
      <h1 class="text-3xl font-bold mb-8">Our Team</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="member in team"
          :key="member.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="w-full h-64 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ member.name }}</h3>
            <p class="text-gray-600 mb-2">{{ member.position }}</p>
            <p class="text-gray-500">{{ member.description }}</p>
          </div>
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
      team: [
        {
          id: 1,
          name: "John Doe",
          position: "CEO & Founder",
          description: "Leading our company with vision and innovation.",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          id: 2,
          name: "Jane Smith",
          position: "Head of Design",
          description: "Creating beautiful and intuitive user experiences.",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          id: 3,
          name: "Mike Johnson",
          position: "Lead Developer",
          description: "Building robust and scalable solutions.",
          image: "https://randomuser.me/api/portraits/men/67.jpg",
        },
      ],
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