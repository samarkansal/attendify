import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

import './assets/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: '1054586386822-oqloh2jc5tmhsnmicntac5il7o4hfiqn.apps.googleusercontent.com',
  scope:
    'https://www.googleapis.com/auth/calendar, https://www.googleapis.com/auth/calendar.events',
  prompt: 'consent'
})

app.mount('#app')
