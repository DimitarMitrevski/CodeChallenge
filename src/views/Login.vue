<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ " " }}
          <router-link
            to="/signup"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Create an account
          </router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              autocomplete="email"
              required="true"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              autocomplete="current-password"
              required="true"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              @click="frogotPW"
              href="javascript:void(0);"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <p class="text-lime-600" v-if="success">{{ success }}</p>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
        <p class="text-red-500" v-if="error">{{ error }}</p>
        <p class="font-medium text-gray-500">Don't have an account?</p>
        <router-link
          to="/signup"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
</script>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    login() {
      this.reset();
      this.$store
        .dispatch("auth/logIn", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.error = err;
        });
    },
    frogotPW() {
      this.reset();
      this.$store
        .dispatch("auth/forgotPassword", this.email)
        .then((res) => {
          this.success = res;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    reset() {
      this.error = "";
      this.success = "";
    },
  },
};
</script>
