<template>
    <Dashboard />

    <Wallet />
</template>

<script>
import Dashboard from "./Dashboard.vue";
import Wallet from "./Wallet.vue";
export default {
  components: {
      Dashboard,
      Wallet
  },
  name: "App",
  mounted() {
    this.$store.dispatch("LoadOnStart");
  },
};
</script>