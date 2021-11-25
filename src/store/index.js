import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    coinList: [],
    wallet: []
  },
  actions: {
    LoadOnStart({ state }) {
      console.log("hjfjhhjdfh");
      axios
      .get(
        "https://coinlib.io/api/v1/coinlist?key=af6791d15f46b44d&page=0&limit=10"
      )
      .then((data) => {
        let coinList = [];
        data.data.coins.forEach( (coin) => {
          coinList.push({
            name: coin.name,
            symbol: coin.symbol,
            price: coin.price,
            market_cap: coin.market_cap
          })
        });
        state.coinList = coinList;
        state.wallet = JSON.parse( localStorage.getItem("wallet") == null ? "[]" : localStorage.getItem("wallet") );
      })
      .catch((err) => {
        console.log("API Limit Reached: ", err);
      });
    },
    addToWallet({ state }, symbol) {
      if (state.wallet.length == null) {
        // If wallet is empty
        state.wallet.push({
          symbol: symbol,
          amount: 1,
        });
      } else {
        // If wallet is not empty
        let updateStatus = state.wallet.filter((coin) => {
          console.log("Update: ", coin);
          if (coin.symbol == symbol) {
            // If coin already in wallet
            coin.amount += 1;
            return coin;
          }
        });
        if (updateStatus.length == 0) {
          // If coin is not already in wallet
          state.wallet.push({
            symbol: symbol,
            amount: 1,
          });
        }
      }
    },
    sellFromWallet({ state }, symbol) {
      state.wallet.filter((coin) => {
        if (coin.symbol == symbol) {
          coin.amount -= 1;
          if (coin.amount <= 0) {
            let index = state.wallet.findIndex((coin) => {
              return coin.symbol == symbol;
            });
            state.wallet.splice(index, 1);
          }
          return coin;
        }
      });
    }
  },
  modules: {}
  // computed: mapState({
  //   count: state => state.count,
  // })
})