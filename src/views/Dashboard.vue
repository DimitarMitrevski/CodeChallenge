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
        >
          <ChallengeCard v-for="i in 4" :key="i" />
        </div>

        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardNav from "../components/DashboardNav.vue";
import ChallengeCard from "../components/ChallengeCard.vue";
</script>
