<template>
    <h1 class="text-6xl text-red-400 mb-20 mt-12" style="text-shadow : 3px 3px black">All Product We have</h1>
    <div class= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="max-w-7xl mx-2 mb-12" v-for="product in products.slice().reverse()" :key="product.id">

        <div >
           <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
            <div class="border  grid grid-cols-3 border-black cursor-pointer bg-white rounded py-12">

                <img :src="require(`../assets/${product.pathPic}`)" class=" w-24 h-auto mx-auto pb-8"> 
                
                <h1 class=" text-5xl">{{ product.name }} </h1> 
                 {{ product.price}}</div>
            
          </router-link></div>
       
    </div>
    </div>
</template>



<script>

export default {
    props: ["products"],
    mounted() {
        this.$root.refreshProduct();
    },
}
</script>