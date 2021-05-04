<template>
    <div class="grid grid-cols-3 pb-20">
        <div class="col-span-2 text-white">
            <div class="text-left ml-12 mt-12 text-5xl blackShadow">New Release Products</div>

            <div v-for="(product,index) in NewProduct.slice().reverse()" :key="index">
                <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
                <product-card class="mt-6 rounded mr-3 ml-6 text-black bg-gray-400">
                    <template v-slot:image><img class="w-36 h-auto ml-2 mt-2 rounded"  :src="`http://localhost/getImage/${product.pathPic}`"></template>
                    <template v-slot:productName ><h1 class="text-3xl">{{ product.name }}</h1></template>
                    <template v-slot:price>{{ product.price }} THB</template>
                </product-card>
                </router-link>
            
            </div>
        </div>
        <div class="col-span-1 text-white text-3xl mt-12 blackShadow">News

            <div class="pb-48 bg-gray-900 mt-8 rounded mx-8 text-white text-base pt-3 px-3">Hello we are SIT Student</div>

            <div class="pb-48 bg-gray-900 mt-4 rounded mx-8"> </div>


        </div>
    </div>
</template>

<script>
export default {
    props: ['products'],
    data() {
        
        return {
            NewProduct: []
        }
    }, methods: {
        setNewProduct() {
            if (this.products.length == 1) {
                this.NewProduct = this.products.slice(this.products.length - 1, this.products.length)
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
        console.log(this.products.length);
        if(this.products.length >= 1){
        this.setNewProduct();}
      
    },
    beforeUpdate() {
        this.$root.refreshProduct();
        if(this.products.length >= 1){
        this.setNewProduct();}
    }

}
</script>


<style>

.blackShadow {

    text-shadow : 3px 3px black;


}


    
</style>
