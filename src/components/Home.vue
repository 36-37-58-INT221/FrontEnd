<template>
    <div class=" text-left text-white text-2xl py-4 pl-2  pb-2"> 
        <h1 v-if="this.$route.path == '/ProductList'">Product List</h1>
        <h1 v-else-if="this.$route.path == '/Team'">Team</h1>
        <h1 v-else-if="this.$route.path == '/'">Home</h1>
        <h1 v-else-if="this.$route.path == '/Addproduct'">Add Product </h1>
    </div>
    
    
    
    <div class="bg-gray-700 text-left text-white py-2"> 
    <div class= "ml-2 hover:bg-red-500 hover:my-2   inline"> <router-link to="/">Home</router-link></div>   
    <div class="ml-2 hover:bg-red-500  inline"> <router-link to="/ProductList">Product</router-link></div>   
    <div class="ml-2 hover:bg-red-500 inline"> <router-link to="/Team"> Team</router-link></div>   
    </div>

</template>






