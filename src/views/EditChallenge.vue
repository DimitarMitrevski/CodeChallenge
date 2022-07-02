<template>
  <div class="min-h-full">
    <DashboardNav />

    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Edit challenge</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <form @submit.prevent="updateChallenge">
            <div class="mb-6">
              <label
                for="base-input"
                class="mb-2 text-base font-medium h2 text-gray-900 dark:text-gray-300"
                >Title</label
              >
              <input
                type="text"
                id="base-input"
                v-model="title"
                required="true"
                minlength="5"
                placeholder="Title of your challenge"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-6">
              <!-- <label
                for="message"
                class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400"
                >Description</label
              >
              <textarea
                id="message"
                rows="4"
                required="true"
                minlength="50"
                v-model="description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Describe the challenge..."
              ></textarea> -->
              <VueEditor v-model="description" class="bg-white rounded-lg" />
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
                :class="enviroment == env ? 'text-white bg-blue-700' : ''"
                @click="enviroment = env"
                class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ env }}
                </h5>
              </a>
            </div>
            <button
              type="submit"
              class="px-5 py-3 mt-5 block w-full text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
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
import { VueEditor } from "vue3-editor";
const enviroments = ["Vue", "Angular", "React", "Nodejs"];
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
const { dispatch, getters } = useStore();
const route = useRoute();
const id = route.params.id;
const router = useRouter();

const enviroment = ref("Vue");
const title = ref("");
const description = ref("");
const createdBy = computed(() => getters["auth/account"]?.uid);

function updateChallenge() {
  dispatch("challenge/updatedChallenge", {
    title: title.value,
    description: description.value,
    enviroment: enviroment.value,
    createdBy: createdBy.value,
    id,
  }).then((res) => {
    router.push("/dashboard?alert=Challenge has been successfully updated!");
  });
}
</script>
<script>
export default {
  async created() {
    const challenge = await this.$store.dispatch(
      "challenge/getChallengeById",
      this.id
    );
    this.title = challenge.title;
    this.description = challenge.description;
    this.enviroment = challenge.enviroment;
  },
};
</script>

<style></style>
