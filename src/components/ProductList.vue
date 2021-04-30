<template>
    <h1 class="text-6xl text-red-400 mb-20">All Product We have</h1>
    <div class= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6">
    <div class="max-w-7xl mx-auto" v-for="product in products" :key="product.id">

        <div class="ml-24">
           <router-link  :to="{ name: 'Product', params: { productId: product.id } }">
            <div class="text-5xl border  border-black cursor-pointer">
                 {{ product.name }} 
                 {{ product.price}}
            </div>
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