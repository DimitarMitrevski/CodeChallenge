<template>
  <div
    class="w-full bg-white p-5 rounded shadow flex items-center justify-between mb-2"
  >
    <div class="inline-flex items-center">
      <img
        :src="submission.photoURL || '/defaultUser.svg'"
        style="width: 75px; height: 75px"
        class="bg-gray-400 rounded-full object-fill"
      />
      &nbsp; {{ submission.displayName }}
    </div>
    <div class="inline float-right">
      <a
        :href="submission.solution"
        class="font-medium text-indigo-600 hover:text-indigo-500"
        target="_blank"
        >View</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["submission"],
};
</script>

<style></style>
