import { createApp } from 'vue'
import App from './App.vue'
import navie from 'naive-ui'
import './assets/main.css'
const app = createApp(App)
app.use(navie)
app.mount('#app')

