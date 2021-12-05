<template>
  <main class="main container mt-3 p-5 pt-3">
    <h1 class="mb-5">Crypto Dashboard</h1>
    
    <router-view />
    
  </main>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("LoadOnStart");
    if (localStorage.getItem("user") == null) {
      this.$router.push({
        name: "login",
      });
    }
  },
};
</script>