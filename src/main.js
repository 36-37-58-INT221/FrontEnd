import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import Container from './components/templates/Container.vue';
import ProductCard from './components/templates/ProductCard.vue'    

const app = createApp(App)


app.component('product-card',ProductCard)
app.component('container',Container)
app.use(router).mount('#app')
