<template>
  <h1>Crypto Dashboard</h1>
  <main class="flexbox">
    <div>
      <Dashboard />
    </div>
    <div>
      <Wallet />
    </div>
  </main>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Wallet from "./components/Wallet.vue";

export default {
  name: "App",
  components: {
    Dashboard,
    Wallet
  },
  data() {
    return {
      currencySymbol: "$",
      startValue: 0,
    };
  },
  mounted: function () {
    this.onLoad();
  },
  methods: {
    onLoad() {
      const previousButton = document.querySelector(".previousButton");
      this.getData(1);
      previousButton.classList.toggle("invisible");
    },

    getData(startValue) {
      fetch(
        `https://coinlib.io/api/v1/coinlist?key=af6791d15f46b44d&page=${startValue}&limit=${10}`
      )
        .then((response) => response.json())
        .then((data) => {
          const coinData = data.coins;
          console.log(coinData);
          this.updateTable(coinData);
        })
        .catch((error) => error);
    },

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

    validateResponse(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response;
      }
    },

    updateTable(coinData) {
      // clear the table first
      const tableBody = document.querySelector("table tbody");
      const newTableBody = document.createElement("tbody");
      tableBody.parentNode.replaceChild(newTableBody, tableBody);

      //insert the data into the table
      coinData.forEach((coin) => this.insertRowForEachCoin(coin));
    },

    insertRowForEachCoin(coin) {
      const { name, symbol, price, market_cap } = coin;

      const tableBody = document.querySelector("table tbody");

      const newRow = tableBody.insertRow();

      const coinName = newRow.insertCell(0);
      coinName.appendChild(document.createTextNode(name));

      const code = newRow.insertCell(1);
      code.appendChild(document.createTextNode(symbol));

      const price_col = newRow.insertCell(2);
      price_col.appendChild(
        document.createTextNode(
          `${this.currencySymbol} ${(Math.round(price * 100) / 100).toFixed(2)}`
        )
      );

      const marketCap = newRow.insertCell(3);
      marketCap.appendChild(
        document.createTextNode(`${this.numFormatter(market_cap)}`)
      );

      const addToWallet = newRow.insertCell(4);
      let btn = document.createElement('button');
      btn.innerHTML = '+';
      btn.className += 'button add-to-wallet';
      btn.setAttribute('symbol', symbol);
      addToWallet.append(btn);
    },
  },
};
</script>