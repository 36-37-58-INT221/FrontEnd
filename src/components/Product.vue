<template>
    <div class="mx-auto">
        <div v-if="!isEdit" class="text-white pb-60 pt-12">


            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"  class=" w-96 h-auto mx-auto pb-8"/>
            <button class="border border-black mr-2" @click="isEdit = true">EDIT THIS</button>
            <button class="border border-black" @click="deleteProduct">DELETE THIS</button>
            <div class="text-3xl text-left ml-20 pt-12">
            <h1 class= "py-1">Name : {{ viewProduct.name }}</h1>
            <h1 class= "py-1" >Price : {{ viewProduct.price }}</h1>
            <h1 class= "py-1">Description : {{ viewProduct.description }}</h1>
            <h1 class= "py-1">All Color : {{ allColors }}</h1>
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

        }

    },
    mounted() {

        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        this.viewProduct = this.products[index];

    },
    beforeUpdate() {
        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        this.viewProduct = this.products[index];
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