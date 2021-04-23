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

  <router-view
    class="max-w-3xl"
    :products="products"
    :productsUrl="productsUrl"
    @submit-form="refreshProducts"
    @view-product="setView"
    @delete-pro="deleteProduct"
  ></router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      products: [],
      arr : [],
      productsUrl: 'http://localhost:5000/products',
    }
  },


  methods: {
    refreshProducts(Product) {
      this.products.push(Product);
    },
    // deleteProduct(id){
     
    //  this.products = this.products.filter(f => f.id !== id);
    // },




    async fetchProducts() {
      const res = await fetch(this.productsUrl);
      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.products = await this.fetchProducts();
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
