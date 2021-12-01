<template>
  <main>
    <form @submit.prevent="login">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" v-model="email" placeholder="Enter Email Address" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <br>
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
  </main>
</template>

<script>
export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      login () {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
    }
    }
};
</script>

<style>
</style>