<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="'https://picsum.photos/seed/' + product.id + '/400/300'" 
         :alt="product.title"
         class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ product.title }}</h2>
      <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-gray-900">${{ product.price }}</span>
        <button @click="$emit('add-to-cart', product)"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>