<template>
    <div class="mx-auto grid grid-cols-1 ">
        <form @submit="submitForm">

            <div class="pt-2">
                <label for="name">Name : </label>
                <input type="text" v-model="formdata.name" class="border border-black" />
            </div>
            <div  class="pt-2">
                <label for="name" class="">Description : </label>
                <textarea
                style="vertical-align: top;"
                    type="text"
                    v-model="formdata.description"
                    class="border border-black w-48"
                    rows="3"
                    cols="20"
                />
            </div>
            <div class="pt-2">
                <label for="color">Colors : </label>
                <span v-for="color in colors " :key="color.id">
                    <input
                        type="checkbox"
                        class="w-12 h-12 ml-2"
                        v-model="formdata.colorList"
                        :value="color.id"
                    />
                </span>
            </div>

            <div class="pt-2">
                <label for="brand">Brand : </label>
                <select name="brand" v-model="formdata.brand" class="border border-black">
                    <option v-for="brand in brands" :value="brand" :key="brand.id">{{ brand.name }}</option>
                </select>
            </div>

            <div class="pt-2">
                <label for="name">Price : </label>
                <input type="text" v-model="formdata.price" class="border border-black" />
            </div>

            <div class="pt-2">
                <label for="manufactureDate">Manufactor Date : </label>
                <input type="date" v-model="formdata.manufactureDate" class="border border-black" />
            </div>

            <h1 class="text-6xl">{{ formdata.ColorList }}</h1>

            <button type="submit" value="Submit" class="border border-black mt-2">Submit</button>
        </form>
    </div>
</template>


<script>
export default {
    props: ["products", "productsUrl"],
    data() {
        return {
            colorUrl: 'http://localhost:5000/colors',
            brandUrl: 'http://localhost:5000/brands',

            colors: [],
            brands: [],

            formdata: {
                // id: null,
                // image: null,
                name: null,
                description: null,
                colorList: [],
                price: null,
                brand: null,
                manufactureDate: null,
            }



        }
    },
    methods: {
        async submitForm() {
            const res = await fetch(this.productsUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    //  image: null,
                    name: this.formdata.name,
                    description: this.formdata.description,
                    colorList: this.formdata.colorList,
                    price: this.formdata.price,
                    brand: this.formdata.brand,
                    manufactureDate: this.formdata.manufactureDate,
                })
            })
            const data = await res.json();
            this.$parent.refreshProducts(data);
        },






        async fetchColors() {
            const res = await fetch(this.colorUrl);
            const data = await res.json();
            return data;
        }, async fetchBrand() {
            const res = await fetch(this.brandUrl);
            const data = await res.json();
            return data;
        },


    },
    async created() {
        this.colors = await this.fetchColors();
        this.brands = await this.fetchBrand();

    }







}
</script>