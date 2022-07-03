<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Alert from "./components/Alert.vue";
import { auth } from "./services/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";

const { dispatch, getters } = useStore();
const route = useRoute();
const router = useRouter();
const routes = ["Home", "About", "Login", "SignUp"];
const accountType = computed(() => getters["auth/accountType"]);
const render = ref(false);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    await dispatch("auth/checkType", user);
    if (accountType.value && routes.includes(route.name)) {
      router.replace("/dashboard");
    }

    // ...
  } else {
    // User is signed out
    // ...
    console.log("User is singed out");
    if (!routes.includes(route.name)) {
      router.replace("/");
    }
  }
  render.value = true;
});
</script>

<template>
  <Alert />
  <div v-if="render">
    <router-view />
    <footer class="text-center">
      <p class="m-2 text-gray-500">
        Website created with &#129505; by
        <a
          href="https://dimitar.rocks"
          target="_blank"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Dimitar Mitrevski
        </a>
        &copy; 2022
      </p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
