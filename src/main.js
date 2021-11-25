import { createApp } from 'vue'
import store from './store'
import App from './App.vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

let app = createApp(App)

app.use(store)
app.mount('#app')