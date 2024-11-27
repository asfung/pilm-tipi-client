<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="dark:text-white">
      <button class="m-2" @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')">
        <svg v-if="$colorMode.value == 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50"
          view-box="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <!-- <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          eww    
      </a> -->
      <!-- <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"> -->
      <div
        class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="email" type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            <button type="submit" @click="submitLogin()"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
              in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
definePageMeta({
  layout: 'none',
  middleware: ['auth-middleware']
})
</script>

<script>
import axios from 'axios'
import { useAuthStore } from '~/store/Auth';

export default {
  computed: {
    colorMode(){
      return this.$colorMode.preference
    }
  },
  mounted() {
  },
  data() {
    return {
      email: null,
      password: null,
      // color: $color.preference
    }
  },
  methods: {
    setColorTheme(newTheme){
      console.log(this.colorMode)
      useColorMode().preference = newTheme
    },
    async submitLogin(){
      console.log(this.email)
      console.log(this.password)
      const authStore = useAuthStore()
      const payload = {
        email: this.email,
        password: this.password
      }
      const {status, response} = await authStore.login(payload)

      if(status){
        return navigateTo('/')
      }

    }
  },
  watch: {
    email: {
      handler(newItem){
        console.log(newItem)
      },
      deep: true,
    },
    password: {
      handler(newItem){
        console.log(newItem)
      },
      deep: true,
    },
  }

  // layout: 'none',
}
</script>
