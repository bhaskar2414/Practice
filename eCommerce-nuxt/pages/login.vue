<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            v-model="email" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            v-model="password" 
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
        </div>
        
        <button 
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      
      <p class="mt-4 text-center text-gray-600">
        Don't have an account? 
        <NuxtLink to="/register" class="text-blue-600 hover:text-blue-800">
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Simulate login - in a real app, this would call an API
      const user = {
        email: this.email,
        id: Date.now()
      }
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/')
    }
  }
}
</script>