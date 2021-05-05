import { createRouter, createWebHistory } from 'vue-router'

import Team from '../components/views/Team.vue'
import ProductList from '../components/views/ProductList.vue'
import AddNewProduct from '../components/views/AddNewProduct.vue'
import Product from '../components/views/Product.vue'
import PageNotFound from '../components/views/PageNotFound.vue'
import Home from '../components/views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
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
    {
        path: '/Product/:productId',
        name: 'Product',
        component: Product
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'PageNotFound',
        component: PageNotFound
      }





]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router