<template>
    <div class="mx-auto">
        <div v-if="!isEdit" class="text-white pb-60 pt-12">
           

            <div class="grid grid-cols-4 ml-8 ">
                

                <div class="col-span-2 ">
                    
                    <div class=" text-left ml-8  pt-12">
                        <h1 class="text-6xl py-1 "><b>{{ viewProduct.name }}</b></h1>
                        <h1 class="text-xl pb-8">{{ viewProduct.price }} THB</h1>
                    <base-button class="border border-black mr-2" labels="EDIT" @btn-click="isEdit = true"/>
                    <base-button class="border border-black " @btn-click="deleteProduct" bordercolor="border-redpastel" bgcolor="bg-redpastel" hover="hover:bg-redpastel-dark hover:border-redpastel-dark" labels="DELETE"/>
                       
                        <h1 class="py-3 lg:py-1 my-3">
                            Color   
                            <span
                                v-for="color in viewProduct.color"
                                :key="color.id"
                                class="flex-1"
                            >
                                <span
                                    class="pr-10 py-2 mx-2 rounded"
                                    v-bind:style="{ backgroundColor: color.colorCode }"
                                ></span>
                            </span>
                        </h1>

                        <h1 class="py-1">brand : {{ viewBrandName }}</h1>
                        <h1 class="py-1">manufacture date : {{ viewProduct.manufactureDate }}</h1> 
                        

                    </div>
                </div>

                <div class="col-span-2 pr-12 pt-8">
                    <img :src="setImage" class="w-96 h-auto mx-auto pb-8 rounded" />
                </div>

                <div class= "col-span-5 lg:col-span-4 text-left mr-10" style="border-color:white; border-width : 2px 0px 0px 0px;">
                    <h1 class="text-3xl pt-5">Product Information</h1>
                    <div class="grid grid-cols-1 lg:grid-cols-3 pt-5 pb-3">
                    <h1 class="my-2 underline lg:no-underline text-xl col-span-1">DESCRIPTION </h1>
                    <h1 class="my-2 text-l col-span-2">{{ viewProduct.description }}</h1>
                    <h1 class="my-2 underline lg:no-underline text-xl col-span-1 mt-2">MANUFACTURE DATE </h1>
                    <h1 class="my-2 text-l col-span-2 mt-2"> {{ viewProduct.manufactureDate }}</h1>
                     </div>
                </div>
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
                @edited="setView"
                @cancel-edit="setView"
            />
        </div>
    </div>
</template>



<script>
import router from '../../router';
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
            imageName: "",
            viewBrandName: "",
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
            this.$root.refreshProduct();

        }




    }, computed: {

        setImage() {
            var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
            if (index != -1) {
                return `http://localhost/getImage/${this.products[index].pathPic}`;
                
                
                
            }
            else {
                return "";
            }
        }

    },

    mounted() {
        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        this.viewProduct = this.products[index];
    },
    beforeUpdate() {
        var index = this.products.findIndex(f => f.productId == this.$route.params.productId)
        if (index != -1) {
            this.viewProduct = this.products[index];
            this.viewBrandName = this.viewProduct.brand.name
            return;
        }
        if (index == -1) {
            this.notFoundHook.push(index);
        }
        if (this.notFoundHook.length >= 2) {
            this.notFoundHook = [];
            router.push("/NotFoundPage")
        }


    }











}




</script>


