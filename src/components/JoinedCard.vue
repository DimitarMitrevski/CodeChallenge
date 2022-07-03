<template>
  <div
    class="w-full bg-white p-5 rounded shadow flex items-center justify-between mb-2"
  >
    <div class="inline-flex items-center">
      <img
        :src="join.photoURL || '/defaultUser.svg'"
        style="width: 75px; height: 75px"
        class="bg-gray-400 rounded-full object-fill"
      />
      &nbsp; {{ join.displayName }}
    </div>
    <div class="inline float-right">
      <p class="font-medium text-gray-600">
        Joined on: <span class="font-bold">{{ dateJoined }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["join"],
  computed: {
    dateJoined() {
      const date = new Date(this.join.timestamp);
      let month = date.getMonth() + 1;
      month = month <= 9 ? `0${month}` : month;
      let day = date.getDate();
      day = day <= 9 ? `0${day}` : day;

      return `${day}/${month}/${date.getFullYear()}`;
    },
  },
};
</script>

<style></style>
