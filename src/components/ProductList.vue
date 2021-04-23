<template>


    <div class="max-w-7xl mx-auto bg-gray-500" v-for="product in products" :key="product.id">

        <h1 class="text-6xl border border-black cursor-pointer" @click="test(product.id)">{{ product.name }}</h1>


        
    </div>


</template>



<script>
    import router from '../router';
export default {
props:["products"],
methods: {
    test(id){


        alert("Hello " + id);
        router.push({name : 'Product', params:{ productId : id }})
    }
},



    
}
</script>