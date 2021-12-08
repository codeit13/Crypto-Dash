<template>
  <div class="d-flex justify-content-between">
    <Dashboard />

    <Wallet />
  </div>
</template>

<script>
import Dashboard from "./Dashboard.vue";
import Wallet from "./Wallet.vue";
export default {
  components: {
    Dashboard,
    Wallet,
  },
  name: "App",
  mounted() {
    this.$store.dispatch("LoadOnStart");
    let user = JSON.parse(localStorage.getItem("user"));
    this.$store.dispatch("getLoginDetails", user);
  },
};
</script>