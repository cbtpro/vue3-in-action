import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'es6-promise/auto'
import mainCommon from './main.common'
import './mock'
import store, { key } from './store'
import router from './router'
// import VConsole from 'vconsole'
import App from './App.vue'

console.log(process.env.NODE_ENV)

// const vConsole = new VConsole({ maxLogNumber: 1000 })

const app = createApp(App)

mainCommon.init(app)

app.use(createPinia())

app.use(store, key)

app.use(router)

app.mount('#app')

