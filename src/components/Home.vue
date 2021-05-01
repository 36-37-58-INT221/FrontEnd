<template>
    <div class=" text-left text-white text-2xl py-4 pl-8 pb-2 "> 
        <h1 v-if="this.$route.path == '/ProductList'">Product List</h1>
        <h1 v-else-if="this.$route.path == '/Team'">Team</h1>
        <h1 v-else-if="this.$route.path == '/'">Home</h1>
        <h1 v-else-if="this.$route.path == '/Addproduct'">Add Product </h1>
        <h1 v-else>Not Found this Page </h1>
    </div>
    
    
    
    
    <div class="bg-gray-700 text-left text-white  flex flex-wrap justify-items-center"> 

    <span class= "ml-8 hoverInBar border-gray-700   pt-4 pb-1"><router-link to="/">Home</router-link></span>   
    <span class="ml-4 hoverInBar border-gray-700  pt-4 pb-1"> <router-link to="/ProductList">Product</router-link></span>   
    <span class="ml-4 hoverInBar border-gray-700  pt-4 pb-1"> <router-link to="/Team"> Team</router-link></span>   
    <span class="fakeLine text-gray-700 float-left absolute mt-7 ml-6 pr-44">_</span>
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
    border-width : 0px 0px 10px 0px;
    z-index : 2;
    
}



.hoverInBar:hover{
    
    border-color: black;
    border-style: solid;
    z-index : 3;
    border-width : 0px 0px 7px 0px;
}


    
</style>






