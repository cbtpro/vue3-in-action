import { createApp } from 'vue'
import 'es6-promise/auto'
import './mock'
import store from './store'
import router from './router'
import VConsole from 'vconsole'
import App from './App.vue'

console.log(process.env.NODE_ENV)

const vConsole = new VConsole({ maxLogNumber: 1000 })

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')

