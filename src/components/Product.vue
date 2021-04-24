<template>
    <div class="mx-auto" >
        <button v-if="!isEdit" class="border border-black mr-2" @click="isEdit = true">EDIT THIS</button>
        <button v-if="isEdit" @click="isEdit = false" class="border border-black mr-2" >CANCEL EDIT</button>
        <button v-if="!isEdit" class="border border-black" @click="deleteProduct">DELETE THIS</button>
        <div v-if="!isEdit">
        <h1 class="text-6xl">Name : {{ viewProduct.name }}</h1>
        <h1 class="text-6xl">Price : {{ viewProduct.price }}</h1>
        <h1 class="text-6xl">Des : {{ viewProduct.description }}</h1>
        <h1 class="text-6xl">Brand : {{ viewBrand }}</h1>
        <h1 class="text-6xl">colorList : {{ viewProduct.colorList}}</h1>
        <h1 class="text-6xl">Date : {{ viewProduct.manufactureDate}}</h1>
    </div>
    <div v-if="isEdit">
        <addNewProduct :viewProduct="viewProduct" :colors="colors" :isEdit="isEdit" :viewBrand="viewBrand" :brands="brands" />

        
        
    </div>
    </div>
</template>



<script>
   import router from '../router';
   import AddNewProduct from './AddNewProduct.vue';
export default {
    components:{
        AddNewProduct
},
    props:["products","productsUrl","brands","colors"],
    data() {
        return {
            viewProduct:[],
            notFoundHook : [] ,
            viewBrand : "",
            isEdit :false,
        }
    },
    methods: {
       async deleteProduct(){
            this.viewProduct =[];
            var id = this.$route.params.productId
            
            await fetch(`${this.productsUrl}/${id}`, {
             method: 'DELETE'
            })
            this.$emit('delete-pro',id);

            document.location.href="/ProductList";
        }
    },
    mounted() {
        var index = this.products.findIndex(f => f.id == this.$route.params.productId)
        this.viewProduct= this.products[index];  
    },
    beforeUpdate() {
        var index = this.products.findIndex(f => f.id == this.$route.params.productId)
        this.viewProduct= this.products[index];  
        if( index == -1){
            this.notFoundHook.push(index);
            
        }
        if(this.notFoundHook.length == 2){
            this.notFoundHook = [];
            router.push("/NotFoundPage")
        }       
     var brandIndex =  this.brands.findIndex(f => f.id == this.viewProduct.brandId);
        this.viewBrand = this.brands[brandIndex].name; 
    }

        
    
  
     
       

  



}




</script>