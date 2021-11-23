<template>
  <main class="container mt-3">
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
            <tr v-for="coin in coinList" :key="coin.name">
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
      <!-- <div class="test">
        {{ this.$store.state.wallet }}
      </div> -->
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
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      coinList: [],
    };
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
    wallet() {
      return this.$store.state.wallet;
    }
  },
  mounted() {
    axios
      .get(
        "https://coinlib.io/api/v1/coinlist?key=af6791d15f46b44d&page=0&limit=10"
      )
      .then((data) => {
        let coinList = [];
        data.data.coins.forEach((coin) => {
          // coinList[i] = [];
          // coinList[i]["name"] = coin.name;
          // coinList[i]["symbol"] = coin.symbol;
          // coinList[i]["price"] = coin.price;
          // coinList[i]["market_cap"] = coin.market_cap;
          coinList.push({
            name: coin.name,
            symbol: coin.symbol,
            price: coin.price,
            market_cap: coin.market_cap
          })
        });
        this.coinList = coinList;
        this.$store.state.wallet = JSON.parse(
          localStorage.getItem("wallet") == null
            ? "[]"
            : localStorage.getItem("wallet")
        );
      })
      .catch((err) => {
        console.log("API Limit Reached: ", err);
      });
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