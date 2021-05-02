<template>
    <div class="mx-auto">
        <div v-if="!isEdit" class="text-white pb-60 pt-12">

            <h1 class = "text-6xl text-left ml-20 mb-12" style="text-shadow : 3px 3px black"> Product</h1>

            <img :src="setImage"  class=" w-96 h-auto mx-auto pb-8"/> 
            
            <button class="border border-black mr-2" @click="isEdit = true">EDIT THIS</button>
            <button class="border border-black" @click="deleteProduct">DELETE THIS</button>
            <div class="text-3xl text-left ml-20 pt-12">
            <h1 class= "py-1">{{ viewProduct.name }}</h1>
            <h1 class= "py-1" >{{ viewProduct.price }} THB</h1>
            <h1 class= "py-1">Description : {{ viewProduct.description }}</h1>
            <div class= "py-1">All Color : 
                <span v-for="color in viewProduct.color" :key="color.id" class="flex-1">
                <span class="pr-10 mx-2" v-bind:style="{ backgroundColor : color.colorCode }"></span>    
                </span>


            </div>
            <h1 class= "py-1">Brand : {{ viewBrandName }}</h1>
            <h1 class= "py-1">Date : {{ viewProduct.manufactureDate }}</h1>
        
        
        </div>
        </div>
        <div v-if="isEdit">
            <addNewProduct
                :viewProduct="viewProduct"
                :colors="colors"
                :isEdit="isEdit"
                :brands="brands"
                :productsUrl="productsUrl"
                :products="products"
                @edited="isEdit = false"
                @cancel-edit="setView"
            />
        </div>
    </div>
</template>



<script>
import router from '../router';
import AddNewProduct from './AddNewProduct.vue';
export default {
    components: {
        AddNewProduct
    },
    props: ["products", "productsUrl", "brands", "colors"],
    data() {
        return {
            viewProduct: [],
            notFoundHook: [],
            imageName :"",
            viewBrandName : "",
            allColors: [],
            isEdit: false,
        }
    },
    methods: {
        async deleteProduct() {
            this.viewProduct = [];
            await fetch(`${this.productsUrl}/${this.$route.params.productId}`, {
                method: 'DELETE'
            })
            router.push("/ProductList")
        },

        setView() {
            this.isEdit = false;
            document.location.href = `/Product/${this.$route.params.productId}`;

        },
    },
    computed:{

        setImage(){
            var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
             return require(`../assets/${this.products[index].pathPic}`) ;
           
        }

    },
    mounted() {
        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        this.viewProduct = this.products[index];      
    },
    beforeUpdate() {
        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        if(index != -1){
        this.viewProduct = this.products[index];
       
    }
        if (index == -1) {
            this.notFoundHook.push(index);

        }
        if (this.notFoundHook.length == 2) {
            this.notFoundHook = [];
            router.push("/NotFoundPage")
        }
        if(this.viewProduct != null){
            this.allColors = [];
            this.viewBrandName = this.viewProduct.brand.name
            for(let i = 0 ; i < this.viewProduct.color.length ;i++)
            
            {
                this.allColors.push(this.viewProduct.color[i].colorCode);
            }

        }

       
    }











}




</script>


