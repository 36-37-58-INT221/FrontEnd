<template>
    <div class=" text-left text-white text-2xl py-4 pl-8 pb-2 "> 
        <h1 v-if="this.$route.path == '/ProductList'">Product List</h1>
        <h1 v-else-if="this.$route.path == '/Team'">Team</h1>
        <h1 v-else-if="this.$route.path == '/'">Home</h1>
        <h1 v-else-if="this.$route.path == '/AddProduct'">Add Product </h1>
        <h1 v-else-if="this.$route.path.indexOf('/Product/') !== -1">Product </h1> 
        <h1 v-else>Not Found this Page </h1>
    </div>
    
    
    <div>
    
    <div class="bg-gray-700  text-white  flex flex-wrap justify-items-center"> 
    <span class="ml-8 hoverInBar pt-4 pb-1"><router-link to="/">Home</router-link></span>   
    <span class="ml-4 hoverInBar pt-4 pb-1"> <router-link to="/ProductList">Product</router-link></span>   
    <span class="ml-4 hoverInBar pt-4 pb-1"> <router-link to="/Team"> Team</router-link></span>   
    <span class="fakeLine text-gray-700 float-left absolute mt-7 ml-7 pr-48">_</span>
        <span class="text-right flex-1 pt-4 pr-3"><router-link to="/AddProduct">Add Product</router-link></span>
</div>

</div>
</template>


<style>

.fakeLine{
    border-style: solid;
    border-color : black;
    z-index : 3;
    border-width : 0px 0px 3px 0px;
}

.hoverInBar{
    --tw-border-opacity: 1;
    border-color: rgba(55, 65, 81, var(--tw-border-opacity));
    border-width : 0px 0px 10px 0px;
    z-index : 2;
    transition: width 2s;
    transition: 0.3s;
}
.hoverInBar:hover{ 
    border-color: black;
    z-index : 3;
    border-width : 0px 0px 7px 0px;
}


    
</style>






