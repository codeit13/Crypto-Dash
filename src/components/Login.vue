<template>
  <main>
    <div className="d-flex">
      <div>
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              v-model="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div>
        <form @submit.prevent="register">
          <div class="form-group">
            <label>Email</label>
            <input
              type="text"
              class="form-control"
              v-model="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let status = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });

      if (status == "NOT_OK") {
        alert("No such user exists!");
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    async register() {
      let status = this.$store.dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (status == "NOT_OK") {
        this.$router.push({ name: "dashboard" });
      }
    },
  },
};
</script>

<style>
</style>