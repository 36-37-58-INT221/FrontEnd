<template>
    <div class="mx-auto grid grid-cols-1">
        <form @submit.prevent="submitForm">
            <div class="pt-2">
                <label for="name">Name :</label>
                <input type="text" v-model="formdata.name" class="border border-black" />
                <h1 v-if="errors.indexOf('noName') !== -1" class="text-red-600">Please Enter Name</h1>
                <h1 v-if="errors.indexOf('have') !== -1" class="text-red-600">Already Have this Product</h1>
            </div>
            <div class="pt-2">
                <label for="name" class>Description :</label>
                <textarea
                    type="text"
                    v-model="formdata.description"
                    class="border border-black w-48 align-top"
                    rows="3"
                    cols="20"
                />
                <h1 v-if="errors.indexOf('noDes') !== -1" class="text-red-600">Please Enter Description</h1>
            </div>
            <div class="pt-2">
                <label>Colors :</label>
                <span v-for="color in colors " :key="color.id">
                    <label for="color" class="ml-2">{{ color.colorCode }}</label>
                    <input
                        type="checkbox"
                        class="w-12 h-12 ml-2 align-middle"
                        v-model="formdata.colorList"
                        :value="color.id"
                    />
                </span>
                <h1 v-if="errors.indexOf('noColor') !== -1" class="text-red-600">Please Select Color</h1>
            </div>

            <div class="pt-2">
                <label for="brand">Brand :</label>
                <select name="brand" v-model="formdata.brand" class="border border-black">
                    <option v-for="brand in brands" :value="brand" :key="brand.id">{{ brand.name }}</option>
                </select>
                <h1 v-if="errors.indexOf('noBrand') !== -1" class="text-red-600">Please Select Brand</h1>
            </div>

            <div class="pt-2">
                <label for="price">Price :</label>
                <input type="text" v-model="formdata.price" class="border border-black" />
                <h1 v-if="errors.indexOf('noPrice') !== -1" class="text-red-600">Please Enter Price</h1>
            </div>

            <div class="pt-2">
                <label for="manufactureDate">Manufactor Date :</label>
                <input type="date" v-model="formdata.manufactureDate" class="border border-black" />
                <h1 v-if="errors.indexOf('noDate') !== -1" class="text-red-600">Please Enter Date</h1>
            </div>
            <button type="submit" value="Submit" class="border border-black mt-2" ref="ProductList">Submit</button>
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
            errors: [],

            formdata: {
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
        refreshForm(){
            this.formdata.name= null,
            this.formdata.description= null,
            this.formdata.colorList= [],
            this.formdata.price= null,
            this.formdata.brand= null,
            this.formdata.manufactureDate= null
        },
        async submitForm() {
            this.validate(); 
            if (this.errors.length > 0) {
                alert(this.errors);
                return ;
            }
            const res = await fetch(this.productsUrl, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.formdata.name,
                    description: this.formdata.description,
                    colorList: this.formdata.colorList,
                    price: this.formdata.price,
                    brand: this.formdata.brand,
                    manufactureDate: this.formdata.manufactureDate,
                })
            })
            this.refreshForm();
            const data = await res.json(); 
            this.$emit('submit-form',data);
        },


        validate() {
            this.errors = [];
            var index = this.products.findIndex(f => f.name.replace(" ","").toLowerCase() == this.formdata.name.replace(" ","").toLowerCase())

            if (this.formdata.name == null || this.formdata.name.length > 30) {
                this.errors.push("noName");
            }
            if (index !== -1) {
                this.errors.push("have");
            }
            if (this.formdata.description == null) {
                this.errors.push("noDes");
            } if (this.formdata.brand == null) {
                this.errors.push("noBrand");
            }
            if (this.formdata.colorList.length == 0) {
                this.errors.push("noColor");
            } if (this.formdata.price == null) {
                this.errors.push("noPrice");
            } if (this.formdata.manufactureDate == null) {
                this.errors.push("noDate");
            }
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