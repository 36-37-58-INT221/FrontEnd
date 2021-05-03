<template>
    <div class="grid grid-cols-3 pb-20">
        <div class="col-span-2 text-white">
            <div class="text-left ml-12 mt-12 text-5xl">New Release Products</div>

            <div v-for="(product,index) in NewProduct.slice().reverse()" :key="index">
                <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
                <product-card class="mt-6 rounded mr-3 ml-6 bg-gray-500">
                    <template v-slot:image><img class="w-36 h-auto ml-2 mt-2 rounded" :src="require(`../assets/${product.pathPic}`)"></template>
                    <template v-slot:productName>{{ product.name }}</template>
                    <template v-slot:price>{{ product.price }} THB</template>
                </product-card>
                </router-link>
            
            </div>
        </div>
        <div class="col-span-1 text-white text-3xl mt-12">News</div>
    </div>
</template>

<script>
import ProductCard from './templates/ProductCard.vue'

export default {
    props: ['products'],
    components: 
    {
        ProductCard
    },
    data() {
        
        return {
            NewProduct: []
        }
    }, methods: {
        setNewProduct() {
            if (this.products.length == 1) {
                this.NewProduct = this.products[this.products.length - 1]
                return ;
            }
            if (this.products.length < 1) {
                this.NewProduct.name = "We Have no Product"
                return ;
            }
            if (this.products.length == 2) {
                this.NewProduct = this.products.slice(this.products.length - 2, this.products.length)
                return ;
            }
            else {
                this.NewProduct = this.products.slice(this.products.length - 3, this.products.length)
                return ;
            }

           
        }

    },
    mounted() {
        this.setNewProduct();
    },
    beforeUpdate() {
        this.setNewProduct();
    }

}
</script>
