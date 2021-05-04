<template>
    <h1 class="text-6xl text-red-400 mb-20 mt-12" style="text-shadow : 3px 3px black"><b>All Products We have</b></h1>
    <div class= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">


   
    <page-control class= "col-span-2" :currentPage="currentPage" :totalPage="totalPage" @change-page="clickPage"></page-control>
    <div class=" mx-2 " v-for="product in productPage.slice().reverse()" :key="product.id">
    <router-link  :to="{ name: 'Product', params: { productId: product.productId } }">
        <product-card class="mt-6 rounded pr-24 bg-gray-300">
            <template v-slot:image><img class="w-36 h-auto ml-2 mt-2 rounded" :src="`http://localhost/getImage/${product.pathPic}`"></template>
            <template v-slot:productName>{{ product.name }}</template>
            <template v-slot:price>{{ product.price }} THB</template>
        </product-card>
        </router-link></div>

    </div>
</template>



<script>
    import PageControl from './PageControl.vue'
export default {
    components:{
        PageControl

    },
    props: ["products"],

    data() {
        return {
            currentPage: 0 ,
            pageSize : 1,
            totalPage : 0 ,
            sortBy : "productId",
            productUrl: `http://localhost/products/page?pageNo=`,
            productPage:[],
        }
    },methods: {

       async clickPage(pageSelect){
            this.currentPage = pageSelect ;
            console.log(this.currentPage)
            this.productPage = await this.fetchPage();
        },

      async fetchPage(){
     const res = await fetch(this.productUrl+this.currentPage+"&&pageSize="+this.pageSize+ "&&sortBy="+this.sortBy);
      const data = await res.json();
      return data;
        }


    },



    async mounted() {
        this.$root.refreshProduct();
        this.productPage = await this.fetchPage();
        this.totalPage = 0 ;
        if(this.totalPage  == 0 ){
        if (this.products.length%this.pageSize !== 0){
            this.totalPage = parseInt(this.products.length/this.pageSize+1);
        }else if(this.products.length%this.pageSize == 0){
            this.totalPage = this.products.length/this.pageSize;
        }
        if(this.products.length < this.pageSize ){
            this.totalPage = 1;    
        }
        console.log(this.totalPage);
        this.currentPage = this.totalPage-1;
        console.log(this.currentPage);
        this.productPage = await this.fetchPage();
    }

    }, 
    
    




     




    




}
</script>