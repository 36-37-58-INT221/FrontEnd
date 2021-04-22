<template>


    <div class="max-w-7xl mx-auto bg-gray-500" v-for="product in products" :key="product.id">

<h1 class="text-6xl">{{ product.name }}</h1>


        
    </div>


</template>



<script>
export default {
props:["products"],







    
}
</script>