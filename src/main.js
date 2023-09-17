import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import './assets/main.css'
const urlBack = {
    data() {
        return {
            url_back: 'http://ec2-18-228-240-165.sa-east-1.compute.amazonaws.com:8080'
                //url_base: 'https://backyodepto.torfe.com.ar'
        }
    }
}

const urlFront = {
    data() {
        return {
            url_front: 'http://ec2-18-228-240-165.sa-east-1.compute.amazonaws.com'
                //url_base: 'https://backyodepto.torfe.com.ar'
        }
    }
}

const app = createApp(App)

app.use(router)
app.mixin(urlBack)
app.mixin(urlFront)

app.mount('#app')