<template>
  <div class="min-h-full">
    <DashboardNav />
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">All code challenges</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div
          class="px-4 py-6 sm:px-0 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
          v-if="challenges.length > 0"
        >
          <ChallengeCard
            v-for="challenge in challenges"
            :key="challenge.id"
            :uid="challenge.id"
            :title="challenge.title"
            :description="challenge.description"
            :createdBy="challenge.createdBy"
            @delete="deleteChallenge"
          />
        </div>
        <div v-else class="text-center py-5">
          <h3 class="text-gray-500 text-xl">
            There are no active challenges. Please come later.
          </h3>
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
import { computed, ref } from "vue";

const store = useStore();
store.dispatch("challenge/getAllChallenges");
const uid = computed(() => store.getters["auth/account"].uid);
const accountType = computed(() => store.getters["auth/accountType"]);
const challenges = computed(() => store.getters["challenge/challenges"]);
const open = ref(false);
const challengeID = ref("");

function deleteChallenge(id) {
  challengeID.value = id;
  open.value = true;
}
</script>
