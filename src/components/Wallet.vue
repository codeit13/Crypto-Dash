<template>
  <div>
    <h2>
      Wallet <span>${{ balance }}</span>
    </h2>
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
          <td>
            ${{ (coin.amount * coin.price).toFixed(2) }}
            <b>({{ coin.amount }})</b>
          </td>
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
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Wallet",
    watch: {
    wallet: {
      deep: true,
      handler(val) {
        console.log("Wallet Data Member Updated: ", val);
        localStorage.setItem("wallet", JSON.stringify(val));
      },
    },
    balance(bal) {
      localStorage.setItem("balance", bal);
    },
  },
    computed: {
    ...mapState(["wallet", "coinList", "balance"]),
  },
  methods: {
      removeFromWallet(symbol) {
      console.log("SELL ", symbol);
      this.$store.dispatch("sellFromWallet", symbol);
    }
  }
};
</script>

<style>
</style>