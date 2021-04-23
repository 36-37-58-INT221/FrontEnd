<template>
    <div class="mx-auto" >
        <button v-if="thisviewProduct !== []" class="border border-black" @click="deleteProduct">DELETE THIS</button>
        <h1 class="text-6xl">{{ viewProduct.name }}</h1>
        <h1 class="text-6xl">{{ viewProduct.price }}</h1>
    </div>
</template>



<script>
   import router from '../router';
export default {
    
    props:["products","productsUrl"],
    data() {
        return {

            viewProduct:[],
            notFoundHook : [] ,
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
        var index=  this.products.findIndex(f => f.id == this.$route.params.productId)  
        this.viewProduct= this.products[index];
        if(index == -1){
            this.notFoundHook.push(index);
        }
        if(this.notFoundHook.length == 2){
            this.notFoundHook = [];
            router.push("/NotFoundPage")
        }
      
    }

        
    
  
     
       

  



}




</script>