<template>
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
    </tbody>
  </table>

</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    msg: String
  }
}
</script>