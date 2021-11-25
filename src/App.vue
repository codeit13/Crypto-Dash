<template>
  <main class="container mt-3 p-5 pt-3">
    <h1 class="text-center mb-5">Crypto Dashboard</h1>
    <div class="d-flex justify-content-between">
      <div>
        <h2>Coins List</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>💰 Coin</th>
              <th>📄 Code</th>
              <th>🤑 Price</th>
              <th>📉 Market Cap</th>
              <th>Add to Wallet</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in coinList" :key="index">
              <td>{{ coin.name }}</td>
              <td>{{ coin.symbol }}</td>
              <td>${{ (Math.round(coin.price * 100) / 100).toFixed(2) }}</td>
              <td>${{ this.numFormatter(coin.market_cap) }}</td>
              <td>
                <i
                  class="bi bi-bag-fill"
                  :symbol="coin.symbol"
                  @click="addToWallet(coin.symbol)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Wallet</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>💰 Coin</th>
              <th>📄 Amount</th>
              <th>❌ Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, key) in wallet" :key="key">
              <th>{{ coin.symbol }}</th>
              <td>{{ coin.amount }}</td>
              <td>
                <i
                  class="bi bi-dash-circle-fill"
                  :symbol="coin"
                  @click="removeFromWallet(coin.symbol)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    wallet: {
      deep: true,
      handler(val) {
        console.log("Wallet Data Member Updated: ", val);
        localStorage.setItem("wallet", JSON.stringify(val));
      },
    },
  },
  computed: {
    ...mapState([
      'wallet',
      'coinList'
    ])
  },
  mounted() {
    this.$store.dispatch('LoadOnStart');
  },
  methods: {
    numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + "K";
      } else if (num > 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(1) + "B";
      } else if (num < 900) {
        return num;
      }
    },
    addToWallet(symbol) {
      console.log("Add to Wallet Triggered: ", symbol);
      this.$store.dispatch('addToWallet', symbol);
    },
    removeFromWallet(symbol) {
      console.log("Remove from Wallet Triggered: ", symbol);
      this.$store.dispatch('sellFromWallet', symbol);
    },
  },
};
</script>