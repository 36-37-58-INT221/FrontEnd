<template>
    <h1 class="text-6xl text-red-400 mb-20 mt-12" style="text-shadow : 3px 3px black">All Product We have</h1>
    <div class= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class=" mx-2 " v-for="product in products.slice().reverse()" :key="product.id">

       
        <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
            <product-card class="mt-6 rounded pr-24 bg-gray-300">
                <template v-slot:image><img class="w-36 h-auto ml-2 mt-2 rounded" :src="require(`../assets/${product.pathPic}`)"></template>
                <template v-slot:productName>{{ product.name }}</template>
                <template v-slot:price>{{ product.price }} THB</template>
            </product-card>
            </router-link>
  
    </div>
    </div>
</template>



<script>
    import ProductCard from './templates/ProductCard.vue'
export default {
    components:{
ProductCard
    },
    props: ["products"],
    mounted() {
        this.$root.refreshProduct();
    },
}
</script>