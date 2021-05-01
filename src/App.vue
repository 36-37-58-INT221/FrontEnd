<template>
 
  <nav-bar>
    <router-link to="/">
      <li class="liNav float-left">Home</li>
    </router-link>
    <router-link to="/Addproduct">
      <li class="liNav float-left">AddProduct</li>
    </router-link>
    <router-link to="/ProductList">
      <li class="liNav float-left">Products</li>
    </router-link>
    <router-link to="/Team">
      <li class="liNav float-left">Teams</li>
    </router-link>
  </nav-bar>

<div class="bg-red-400 pt-6 -mt-6" style="padding-bottom : 40% ">

  <container>
    <home v-if="this.$route.path.indexOf('/Product/') == -1"></home>
    
  <router-view
    v-if="this.$route.path !=='/' "
    :products="products"
    :productsUrl="productsUrl"
    :colors="colors"
    :brands="brands"
    @submit-form="addProducts"
  >
  
</router-view>
</container>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    NavBar,Home
  },
  data() {
    return {
      products: [],
      brands: [],
      colors: [],
      productsUrl: 'http://localhost:5000/products',
      colorUrl: 'http://localhost:5000/colors',
      brandUrl: 'http://localhost:5000/brands',

    }
  },


  methods: {
    addProducts(Product) {
      this.products.push(Product);
    },
    async refreshProduct() {
      this.products = await this.fetchProducts();
    },
    async fetchProducts() {
      const res = await fetch(this.productsUrl);
      const data = await res.json();
      return data;
    }, 
    async fetchBrand() {
      const res = await fetch(this.brandUrl);
      const data = await res.json();
      return data;
    },
    async fetchColors() {
      const res = await fetch(this.colorUrl);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.products = await this.fetchProducts();
    this.brands = await this.fetchBrand();
    this.colors = await this.fetchColors();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
