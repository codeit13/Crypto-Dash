<template>
  <h1>Crypto Dashboard</h1>
  <main class="flexbox">
    <div>
      <h1>Coins List</h1>

      <table>
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
              <button
                class="button add-to-wallet"
                :symbol="coin.symbol"
                @click="addToWallet"
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h1>Wallet</h1>
      <table>
        <thead>
          <tr>
            <th>💰 Coin</th>
            <th>📄 Amount</th>
            <th> Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, coin) in wallet" :key="coin">
            <th>{{ coin }}</th>
            <td>{{ key }}</td>
            <td>
              <button
                class="button remove-from-wallet"
                :symbol="coin"
                @click="removeFromWallet"
              >
                -
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      currencySymbol: "$",
      coinList: [],
      wallet: {},
    };
  },
  mounted() {
    axios
      .get(
        "https://coinlib.io/api/v1/coinlist?key=e55c57fc990bbb7a&page=0&limit=10"
      )
      .then((data) => {
        let coinList = [];
        data.data.coins.forEach((coin, i) => {
          coinList[i] = [];
          coinList[i]["name"] = coin.name;
          coinList[i]["symbol"] = coin.symbol;
          coinList[i]["price"] = coin.price;
          coinList[i]["market_cap"] = coin.market_cap;
        });
        this.coinList = coinList;
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
    addToWallet(event) {
      let symbol = event.target.getAttribute("symbol");

      if (symbol in this.wallet) {
        this.wallet[symbol] += 1;
      } else {
        this.wallet[symbol] = 1;
      }
    },
    removeFromWallet(event) {
      let symbol = event.target.getAttribute("symbol");

      this.wallet[symbol] -= 1;

      if(this.wallet[symbol] < 1) {
        delete this.wallet[symbol]
      }
    },
  },
};
</script>