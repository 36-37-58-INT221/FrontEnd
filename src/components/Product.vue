<template>
    <div class="mx-auto">
        <div v-if="!isEdit">
            <button class="border border-black mr-2" @click="isEdit = true">EDIT THIS</button>
            <button class="border border-black" @click="deleteProduct">DELETE THIS</button>
            <h1 class="text-6xl">Name : {{ viewProduct.name }}</h1>
            <h1 class="text-6xl">Price : {{ viewProduct.price }}</h1>
            <h1 class="text-6xl">Des : {{ viewProduct.description }}</h1>
            <h1 class="text-6xl">Brand : {{ viewBrand }}</h1>
            <h1 class="text-6xl">colorList : {{ viewProduct.colorList }}</h1>
            <h1 class="text-6xl">Date : {{ viewProduct.manufactureDate }}</h1>
        </div>
        <div v-if="isEdit">
            <addNewProduct
                :viewProduct="viewProduct"
                :colors="colors"
                :isEdit="isEdit"
                :viewBrand="viewBrand"
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
            viewBrand: "",
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

        var index = this.products.findIndex(f => f.id == this.$route.params.productId)
        this.viewProduct = this.products[index];

    },
    beforeUpdate() {
        var index = this.products.findIndex(f => f.id == this.$route.params.productId)
        this.viewProduct = this.products[index];
        if (index == -1) {
            this.notFoundHook.push(index);

        }
        if (this.notFoundHook.length == 2) {
            this.notFoundHook = [];
            router.push("/NotFoundPage")
        }
        var brandIndex = this.brands.findIndex(f => f.id == this.viewProduct.brandId);
        this.viewBrand = this.brands[brandIndex].name;
    }











}




</script>