import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    coinList: [],
    filteredCoinList: [],
    wallet: [],
    balance: "",
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
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
    async register({ commit }, credentials) {
      return await axios
        .post('http://localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data.token)
        })
    },
    async login({ commit }, credentials) {
      console.log("ASYNC LOGIN ");
      let { data } = await axios.post('http://localhost:3000/login', credentials)

      if (data.status == "OK") {
        commit('SET_USER_DATA', data.token)
      } else {
        return data.status;
      }
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})