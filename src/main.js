import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import VueRouter from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

let app = createApp(App)

app.use(store)
app.use(VueRouter)
app.mount('#app')