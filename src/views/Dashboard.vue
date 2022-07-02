<template>
  <ConfirmModal :openModal="open" @close="open = false" :uid="challengeID" />
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
          <ChallengeCard
            v-for="challenge in challenges"
            :key="challenge.id"
            :uid="challenge.id"
            :title="challenge.title"
            :description="challenge.description"
            :createdBy="challenge.createdBy"
            :status="challenge.status || ''"
            @delete="deleteChallenge"
          />
        </div>
        <div v-else class="text-center py-5">
          <h3 class="text-gray-500 text-xl">
            {{ notJoinCreate }}
          </h3>
          <router-link
            :to="
              accountType == 'Employer' ? '/new/challenge' : '/join/challenge'
            "
            class="font-medium text-indigo-600 hover:text-indigo-500 text-lg py-5 block"
          >
            {{ joinCreate }}
          </router-link>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import DashboardNav from "../components/DashboardNav.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import ChallengeCard from "../components/ChallengeCard.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const uid = computed(() => store.getters["auth/account"].uid);
const accountType = computed(() => store.getters["auth/accountType"]);
const challenges = computed(() => store.getters["challenge/challenges"]);

const notJoinCreate = computed(() => {
  return accountType.value == "Employer"
    ? `You haven't created any challenges yet!`
    : `You haven't joined any challenges yet!`;
});
const joinCreate = computed(() => {
  return accountType.value == "Employer"
    ? "Create a challenge"
    : "Join a challenge";
});
</script>
<script>
export default {
  data() {
    return {
      open: false,
      challengeID: "",
    };
  },
  methods: {
    deleteChallenge(id) {
      this.challengeID = id;
      this.open = true;
    },
  },
  watch: {
    uid: {
      handler: function (uid) {
        if (uid && this.accountType == "Employer") {
          this.$store.dispatch("challenge/getAllCompChallenges", uid);
        } else if (uid && this.accountType == "Developer") {
          this.$store.dispatch("challenge/getAllJoinedChallenges", uid);
        }
      },
      immediate: true,
    },
  },
};
</script>
