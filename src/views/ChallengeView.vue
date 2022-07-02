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
          v-if="!joined && accountType == 'Developer'"
          @click="joinChallenge"
          class="px-5 py-3 mt-5 block w-full text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join Challenge
        </button>
        <div
          v-else-if="joined && accountType == 'Developer' && submitted == false"
          class="py-5"
        >
          <p class="text-xl text-gray-500">
            You have successfully joined the challenge!
          </p>
          <a
            href="javascript:void(0)"
            @click="leaveChallenge"
            class="text-red-500 hover:text-red-400"
            >Leave challenge</a
          >
          <form class="mt-2" @submit.prevent="submitSolution">
            <label
              for="StackBlitzURL"
              class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >Enter StackBlitz Project URL</label
            >
            <input
              name="StackBlitzURL"
              class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              v-model="solution"
              placeholder="https://exapmple.com"
              required="true"
              minlength="10"
            />

            <button
              type="submit"
              class="px-5 py-3 mt-5 block w-full text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit solution
            </button>
          </form>
        </div>
        <div v-if="submitted && accountType == 'Developer'">
          <p class="text-2xl mt-4 text-gray-500">
            Congratualtions!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 inline text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            You have successfully completed the challenge!
          </p>
        </div>

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
import { mapState } from "vuex";
export default {
  data() {
    return {
      challenge: {
        title: "",
        description: "",
        enviroment: "",
      },
      joined: false,
      submitted: false,
      solution: "",
    };
  },
  async created() {
    this.challenge = await this.$store.dispatch(
      "challenge/getChallengeById",
      this.$route.params.id
    );
  },
  computed: {
    ...mapState("auth", {
      accountType: (state) => state.accountType,
      uid: (state) => state.account.uid,
    }),
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
    start() {
      this.$confetti.start();
    },

    stop() {
      this.$confetti.stop();
    },
    async submitSolution() {
      this.$store
        .dispatch("challenge/submitSolution", {
          joinId: this.joined.id,
          solution: this.solution,
        })
        .then((res) => {
          this.submitted = true;
          this.start();
          setTimeout(() => {
            this.stop();
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinChallenge() {
      //TODO Write in Firebase Firestore that the User have Joined the challenge
      this.$store
        .dispatch("challenge/joinChallenge", {
          developerId: this.uid,
          challengeId: this.$route.params.id,
        })
        .then((join) => {
          this.joined = join;
          window.open(this.projectURL, "_blank");
        })
        .catch((err) => {
          console.log(err);
        });

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
    leaveChallenge() {
      this.$store
        .dispatch("challenge/leaveChallenge", {
          developerId: this.uid,
          challengeId: this.$route.params.id,
        })
        .then((res) => {
          this.joined = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    uid: {
      handler: async function (uid) {
        if (uid) {
          const { id, submitted } = await this.$store.dispatch(
            "challenge/alreadyJoined",
            {
              developerId: uid,
              challengeId: this.$route.params.id,
            }
          );
          this.joined = { id };
          this.submitted = submitted;
          if (this.submitted) {
            this.start();
            setTimeout(() => {
              this.stop();
            }, 2000);
          }
        }
      },
      immediate: true,
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
