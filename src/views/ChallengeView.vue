<template>
  <div class="min-h-full" id="challenge-view">
    <DashboardNav />
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ challenge.title }}</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->

        <VueEditor v-model="challenge.description" disabled />
        <hr class="my-5" />
        <span
          class="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800"
          >{{ challenge.enviroment }}</span
        >
        <button
          type="button"
          @click="joinChallenge"
          class="px-5 py-3 mt-5 block w-full text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join Challenge
        </button>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>
<script setup>
import DashboardNav from "../components/DashboardNav.vue";
import { VueEditor } from "vue3-editor";
</script>

<script>
import StackBlitzSDK from "@stackblitz/sdk";
export default {
  data() {
    return {
      challenge: {
        title: "",
        description: "",
        enviroment: "",
      },
    };
  },
  async created() {
    this.challenge = await this.$store.dispatch(
      "challenge/getChallengeById",
      this.$route.params.id
    );
  },
  computed: {
    projectURL() {
      switch (this.challenge.enviroment) {
        case "Vue":
          return "https://stackblitz.com/fork/vue";
        case "React":
          return "https://stackblitz.com/fork/react-ts";
        case "Angular":
          return "https://stackblitz.com/fork/angular-ivy";
        case "Nodejs":
          return "https://stackblitz.com/fork/node";
      }
    },
  },
  methods: {
    joinChallenge() {
      //TODO Write in Firebase Firestore that the User have Joined the challenge
      window.open(this.projectURL, "_blank");

      //   StackBlitzSDK.openProject(
      //     // Payload:
      //     {
      //       template: "vue",
      //       title: `My First Docs!`,
      //       description: `This is an example of my first doc!`,
      //     },
      //     // Options
      //     {
      //       newWindow: true,
      //     }
      //   );
    },
  },
};
</script>
<style>
#challenge-view .ql-toolbar.ql-snow {
  display: none !important;
}
#challenge-view .ql-container.ql-snow {
  border: none;
}
</style>
