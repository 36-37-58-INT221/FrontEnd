<template>


    <div class="max-w-7xl mx-auto bg-gray-500" v-for="product in products" :key="product.id">

        <router-link :to="{name : 'Product', params:{ productId : product.id }}"><h1 class="text-6xl border border-black cursor-pointer">{{ product.name }}</h1>
</router-link>

        
    </div>


</template>



<script>
  
export default {
props:["products"],

}
</script>