import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    backendUrl: "https://7921-2409-4053-e81-1190-8e0a-786c-4659-889c.ngrok.io/",
    coinList: [],
    filteredCoinList: [],
    wallet: [],
    balance: "",
    user: null,
    loggedInUserEmail: ""
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      console.log(userData);
      state.user = userData.token
      state.loggedInUserEmail = userData.email 
      localStorage.setItem('user', JSON.stringify(userData.token))
    }
  },
  actions: {
    async LoadOnStart({ state }) {
      let { data } = await axios.get("https://coinlib.io/api/v1/coinlist?key=af6791d15f46b44d&page=0&limit=10&order=dsc")
      console.log(data.coins);

      let coinList = [];
      for (let index in data.coins) {
        let coin = data.coins[index]
        coinList.push({
          name: coin['name'],
          symbol: coin['symbol'],
          price: (Math.round(coin['price'] * 100) / 100).toFixed(2),
          market_cap: coin['market_cap']
        })
      }

      state.coinList = state.filteredCoinList = coinList;
      state.wallet = JSON.parse(localStorage.getItem("wallet") == null ? "[]" : localStorage.getItem("wallet"));
      state.balance = parseFloat(localStorage.getItem("balance") ? localStorage.getItem("balance") : 10000);
    },
    addToWallet({ state }, { symbol, price },) {
      // If wallet is not empty
      let updateStatus = state.wallet.filter((coin) => {
        if (coin.symbol == symbol) {
          // If coin already in wallet
          coin.amount += 1;
          state.balance -= price
          state.balance = parseFloat(state.balance).toFixed(2)
          return coin;
        }
      });
      if (updateStatus.length == 0) {
        // If coin is not already in wallet
        state.wallet.push({
          symbol: symbol,
          amount: 1,
          price: price
        });
        state.balance -= price
        state.balance = parseFloat(state.balance).toFixed(2)
      }
    },
    sellFromWallet({ state }, symbol) {
      state.wallet.filter((coin) => {
        if (coin.symbol == symbol) {
          coin.amount -= 1;
          state.balance = parseFloat(parseFloat(state.balance) + parseFloat(coin.price)).toFixed(2)
          if (coin.amount <= 0) {
            let index = state.wallet.findIndex((coin) => {
              return coin.symbol == symbol;
            });
            state.wallet.splice(index, 1);
          }
          return coin;
        }
      });
    },
    async register({ state, commit }, credentials) {
      let { data } = await axios.post(state.backendUrl + 'register', credentials)

      if (data.status == "OK") {
        commit('SET_USER_DATA', data)
      } else {
        return data.status;
      }
    },
    async login({ state, commit }, credentials) {
      console.log("ASYNC LOGIN ");
      let { data } = await axios.post(state.backendUrl + 'login', credentials)

      if (data.status == "OK") {
        commit('SET_USER_DATA', data)
      } else {
        return data.status;
      }
    },
    async getLoginDetails({ state }, token) {
      console.log("ASYNC LOGIN ");
      let { data } = await axios.post(state.backendUrl + 'getTokenDetails', token)

      if (data.status == "OK") {
        state.loggedInUserEmail = data.token.email;
      } else {
        state.loggedInUserEmail = data.token.email;
      }
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})