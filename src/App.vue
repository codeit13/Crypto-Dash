<template>
  <main class="main container mt-3 p-5 pt-3">
    <div style="text-align: right" v-if="loggedInUserEmail">
      <span class="text-small"
        >User:
        {{ loggedInUserEmail.substring(0, loggedInUserEmail.indexOf("@")) }}
      </span>
      <button class="btn btn-sm btn-secondary ml-3" @click="logOut">Logout</button>
    </div>
    <h1 class="mb-5">Crypto Dashboard</h1>

    <router-view />
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "loggedInUserEmail"]),
  },
  mounted() {
    if (localStorage.getItem("user") == null) {
      this.$router.push({
        name: "login",
      });
    } else {
      this.$store.dispatch("LoadOnStart");
      let user = JSON.parse(localStorage.getItem("user"));
      this.$store.dispatch("getLoginDetails", user);
    }
  },
  methods: {
    logOut() {
      this.$store.state.user = null
      localStorage.removeItem('user')
      this.$store.state.loggedInUserEmail = ""
      localStorage.removeItem('wallet')
      this.$store.state.wallet = []

      this.$router.push({
        name: "login",
      });
    }
  }
};
</script>