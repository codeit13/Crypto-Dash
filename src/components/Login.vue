<template>
    <div className="d-flex justify-content-around">
      <div>
        <h2>Login</h2>
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
        <h2>Register</h2>
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
      let status = await this.$store.dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (status == "NOT_OK") {
        alert("This user already exists!");
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>