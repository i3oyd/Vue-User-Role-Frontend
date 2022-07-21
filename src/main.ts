import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import './assets/index.css'

axios.defaults.withCredentials = true;
const app = createApp(App)

app.use(router)

app.mount('#app')
