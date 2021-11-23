import { createStore } from 'vuex'

export default createStore({
  state: {
    wallet: []
  },
  actions: {
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
})