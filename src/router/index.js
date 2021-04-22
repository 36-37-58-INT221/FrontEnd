import { createRouter, createWebHistory } from 'vue-router'

import Team from '../components/Team.vue'

import ProductList from '../components/ProductList.vue'
import AddNewProduct from '../components/AddNewProduct.vue'



const routes = [
    {
        path: '/Team',
        name: 'Team',
        component: Team
    },
    {
        path: '/ProductList',
        name: 'ProductList',
        component: ProductList
    },
    {
        path: '/AddProduct',
        name: 'AddProduct',
        component: AddNewProduct
    },



]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router