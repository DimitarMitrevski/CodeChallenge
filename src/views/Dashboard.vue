<template>
  <div class="min-h-full">
    <DashboardNav />

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">My code challenges</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div
          class="px-4 py-6 sm:px-0 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
          v-if="challenges.length > 0"
        >
          <ChallengeCard v-for="challenge in challenges" :key="challenge.uid" />
        </div>
        <div v-else class="text-center py-5">
          <h3 class="text-gray-500 text-xl">
            You haven't created any challenges yet!
          </h3>
          <router-link
            to="/new/challenge"
            class="font-medium text-indigo-600 hover:text-indigo-500 text-lg py-5 block"
          >
            Create a challenge
          </router-link>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardNav from "../components/DashboardNav.vue";
import ChallengeCard from "../components/ChallengeCard.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const challenges = computed(() => store.getters["challenge/challenges"]);
</script>
