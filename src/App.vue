<template>
  <main class="main container mt-3 p-5 pt-3">
    <h1 class="mb-5">Crypto Dashboard</h1>

    <div class="d-flex justify-content-between">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$store.dispatch("LoadOnStart");
    if((localStorage.getItem('loggedIn') != 'true') || (localStorage.getItem('loggedIn') != '')) {
      this.$router.push({
        name: 'Login'
      })
    }
  },
};
</script>