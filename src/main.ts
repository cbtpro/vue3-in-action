import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'es6-promise/auto'
import mainCommon from './main.common'
import './mock'
import router from './router'
// import VConsole from 'vconsole'
import App from './App.vue'

console.log(process.env.NODE_ENV)

// const vConsole = new VConsole({ maxLogNumber: 1000 })

const app = createApp(App)

mainCommon.init(app)

app.use(createPinia())

app.use(router)

app.mount('#app')

