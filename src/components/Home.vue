<template>
    <div class="grid grid-cols-3">
        <div class="col-span-2 text-white">
            <div class="text-left ml-12 mt-12 text-5xl">Lastest Products</div>
            <div v-for="(product,index) in NewProduct" :key="index">{{ product.name }}</div>
        </div>
        <div class="col-span-1 text-white text-3xl mt-12">News</div>
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
                this.NewProduct = this.products[this.products.length - 1]
            }
            if (this.products.length < 1) {
                this.NewProduct.name = "We Have no Product"
            }
            if (this.products.length == 2) {
                this.NewProduct = this.products.slice(this.products.length - 2, this.products.length)
            }
            else {
                this.NewProduct = this.products.slice(this.products.length - 3, this.products.length)
            }

            this.NewProduct = this.NewProduct.slice().reverse();
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
