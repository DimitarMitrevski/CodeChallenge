<template>
  <div class="min-h-full">
    <DashboardNav />

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Create a new challenge</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <form @submit.prevent="createChallenge">
            <div class="mb-6">
              <label
                for="base-input"
                class="mb-2 text-base font-medium h2 text-gray-900 dark:text-gray-300"
                >Title</label
              >
              <input
                type="text"
                id="base-input"
                placeholder="Title of your challenge"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-6">
              <label
                for="message"
                class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400"
                >Description</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe the challenge..."
              ></textarea>
            </div>
            <label
              for="enviroment"
              class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400"
              >Enviroment</label
            >
            <div
              id="enviroment"
              class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              <a
                v-for="env in enviroments"
                :key="env"
                href="#"
                :class="selEnv == env ? 'text-white bg-blue-700' : ''"
                @click="selEnv = env"
                class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ env }}
                </h5>
              </a>
            </div>
            <button
              type="submit"
              class="px-5 py-3 mt-5 block w-full text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>
        </div>

        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardNav from "../components/DashboardNav.vue";
import ChallengeCard from "../components/ChallengeCard.vue";
const enviroments = ["Vue", "Angular", "React", "Nodejs"];
import { ref } from "vue";
const selEnv = ref("Vue");
</script>
<script>
export default {
  methods: {
    createChallenge() {
      //TODO write the challenge in DB
    },
  },
};
</script>

<style></style>
