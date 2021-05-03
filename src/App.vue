<template>
 
  <nav-bar>
    <router-link to="/">
      <li class="liNav float-left">Home</li>
    </router-link>
    <router-link to="/AddProduct">
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
    <content-bar ></content-bar>
    
  <router-view
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
import ContentBar from './components/ContentBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,ContentBar
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
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>