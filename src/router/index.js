import { createRouter, createWebHistory } from 'vue-router'

import Team from '../components/views/Team.vue'
import ProductList from '../components/views/ProductList.vue'
import AddEditProduct from '../components/views/AddEditProduct.vue'
import ViewProduct from '../components/views/ViewProduct.vue'
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
        name: 'AddEditProduct',
        component: AddEditProduct
    },
    {
        path: '/Product/:productId',
        name: 'Product',
        component: ViewProduct
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