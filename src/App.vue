<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { auth } from "./services/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "vuex";

const { dispatch } = useStore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("User is singed in");
    dispatch("auth/checkType", user);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("User is singed out");
  }
});
</script>

<template>
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
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
