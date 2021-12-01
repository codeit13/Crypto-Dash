<template>
  <div>
    <h2>Coins List</h2>
    <input
      type="text"
      class="form-control"
      placeholder="Search here"
      @input="filterCoinList"
      v-model="search"
    />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>💰 Coin</th>
          <th>
            🤑 Price
            <span class="cursor-pointer" @click="sortWithPriceASC">🔽</span>
            <span class="cursor-pointer" @click="sortWithPriceDSC">🔼</span>
          </th>
          <th>📉 Market Cap</th>
          <th>Buy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, index) in filteredCoinList" :key="index">
          <td>
            {{ coin.name }} <b>({{ coin.symbol }})</b>
          </td>
          <td>${{ coin.price }}</td>
          <td>${{ this.numFormatter(coin.market_cap) }}</td>
          <td>
            <i
              class="bi bi-bag-fill"
              :symbol="coin.symbol"
              @click="addToWallet(coin.symbol, coin.price)"
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
  name: "Dashboard",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(["coinList", "filteredCoinList", "balance"]),
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
    addToWallet(symbol, price) {
      console.log("BUY ", symbol, " AT ", price);
      console.log("BALANCE & PRICE", this.balance, price);
      if (parseFloat(this.balance) >= parseFloat(price))
        this.$store.dispatch("addToWallet", {
          symbol: symbol,
          price: price,
        });
      else alert("Not Enough Balance");
    },
    filterCoinList() {
      this.$store.state.filteredCoinList = this.$store.state.coinList.filter(
        (coin) => {
          return (
            coin.name.toLowerCase().includes(this.search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      );
    },
    sortWithPriceASC() {
      this.filteredCoinList = this.filteredCoinList.sort(function (a, b) {
        return b.price - a.price;
      });
    },
    sortWithPriceDSC() {
      this.filteredCoinList = this.filteredCoinList.sort(function (a, b) {
        return a.price - b.price;
      });
    },
  },
};
</script>

<style>
</style>