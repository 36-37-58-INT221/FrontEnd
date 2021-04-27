<template>
    <div class="mx-auto grid grid-cols-1">
        <form @submit.prevent>
            <button v-if="isEdit" @click="setView" class="border border-black mr-2">CANCEL EDIT</button>
            <h1 v-if="!isEdit" class="text-6xl">Add new Product</h1>
            <h1 v-if="isEdit" class="text-6xl">Editing Product</h1>


            <div class="pt-2">
                <img :src="image" class="w-auto h-60 mx-auto"/>
                <label for="imageFile" >Image File :</label>
                <input type="file" @change="uploadImageFile($event)" multiple accept=".jpg, .jpeg, .png" />
            </div>


            <div class="pt-2">
                <label for="name">Name :</label>
                <input type="text" v-model="formdata.name" class="border border-black" />
                <h1
                    v-if="errors.indexOf('noName') !== -1"
                    class="text-red-600"
                >Please Enter Name 2-30 Character</h1>
                <h1
                    v-if="errors.indexOf('have') !== -1"
                    class="text-red-600"
                >Already Have this Product</h1>
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
                <h1
                    v-if="errors.indexOf('noDes') !== -1"
                    class="text-red-600"
                >Please Enter Description 10 up to 70 character</h1>
            </div>
            <div class="pt-2">
                <label>Colors :</label>
                <span v-for="color in colors " :key="color.id">
                    <label for="color" class="ml-2">{{ color.colorCode }}</label>
                    <input
                        type="checkbox"
                        class="w-12 h-12 ml-2 align-middle"
                        v-model="formdata.colorList"
                        :value="color"
                    />
                </span>
                <h1 v-if="errors.indexOf('noColor') !== -1" class="text-red-600">Please Select Color</h1>
            </div>

            <div class="pt-2">
                <label for="brand">Brand :</label>
                <select name="brand" v-model="formdata.brandId" class="border border-black">
                    <option
                        v-for="brand in brands"
                        :value="brand.id"
                        :key="brand.id"
                    >{{ brand.name }}</option>
                </select>
                <h1 v-if="errors.indexOf('noBrand') !== -1" class="text-red-600">Please Select Brand</h1>
            </div>

            <div class="pt-2">
                <label for="price">Price :</label>
                <input type="text" v-model="formdata.price" class="border border-black" />
                <h1
                    v-if="errors.indexOf('noPrice') !== -1"
                    class="text-red-600"
                >Please Enter Price No more than 999999.99</h1>
            </div>

            <div class="pt-2">
                <label for="manufactureDate">Manufactor Date :</label>
                <input type="date" v-model="formdata.manufactureDate" class="border border-black" />
                <h1 v-if="errors.indexOf('noDate') !== -1" class="text-red-600">Please Enter Date</h1>
            </div>
            <button
                v-if="!isEdit"
                value="Submit"
                class="border border-black mt-2"
                @click="submitForm"
            >Submit</button>
            <button v-if="isEdit" class="border border-black mt-2" @click="editForm">Submit Edit</button>
        </form>
    </div>
</template>


<script>
export default {
    props: ["products", "productsUrl", "brands", "colors", "viewProduct", "isEdit", "viewBrand"],
    data() {
        return {
            errors: [],
            image:"",
            formdata: {
                imageName : null,
                name: null,
                description: null,
                colorList: [],
                price: null,
                brandId: null,
                manufactureDate: null,
            },
        }
    },
    methods: {
        uploadImageFile(event){
            var input = event.target
            this.formdata.imageName  = input.files[0].name;
            console.log(this.formdata.imageName)
            if(input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = (e) => { this.image = e.target.result; } 
                reader.readAsDataURL(input.files[0])

            } 



        },



        refreshForm() {
            this.formdata.name = null,
                this.formdata.description = null,
                this.formdata.price = null,
                this.formdata.brandId = null,
                this.formdata.manufactureDate = null
        },
        async submitForm() {
            if (!this.isEdit) {
                this.validate();
                if (this.errors.length > 0) {
                    return;
                }
                const res = await fetch(this.productsUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.formdata.name,
                        description: this.formdata.description,
                        // colorList: this.formdata.colorList,
                        price: this.formdata.price,
                        brandId: this.formdata.brandId,
                        manufactureDate: this.formdata.manufactureDate,
                    })
                })
                this.refreshForm();
                const data = await res.json();
                this.$emit('submit-form', data);
            }
        },
        async editForm() {
            this.validate();
            if (this.errors.length > 0) {
                alert(this.errors);
                return;
            }

            await fetch(this.productsUrl + "/" + this.viewProduct.id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.formdata.name,
                    description: this.formdata.description,
                    // colorList: this.formdata.colorList,
                    price: this.formdata.price,
                    brandId: this.formdata.brandId,
                    manufactureDate: this.formdata.manufactureDate,
                })
            })


            this.$emit("edited")
        },
        validate() {
           
            this.errors = [];
            if (this.formdata.name == null) {
                this.errors.push("noName");
            }
            if (this.formdata.name.length < 2 || this.formdata.name.length > 30) {
                this.errors.push("noName");
            }
            if (this.formdata.description == null) {
                this.errors.push("noDes");
            }
            if (this.formdata.description.length > 70 || this.formdata.description.length < 10) {
                this.errors.push("noDes");
            }
            if (this.formdata.brandId == null) {
                this.errors.push("noBrand");
            }
            if (this.formdata.price == null) {
                this.errors.push("noPrice");
            } if (/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(this.formdata.price) == false) {
                this.errors.push("noPrice");
            }
            if (this.formdata.price.length > 9) {
                this.errors.push("noPrice");
            }
            if (this.formdata.manufactureDate == null) { this.errors.push("noDate"); }

            var index2 = []
            var index3 = []
            for (let  i= 0 ;i < this.products.length ; i++){
                if(this.products[i].name.replace(" ","").toLowerCase() == this.formdata.name.replace(" ","").toLowerCase()){
                    index2.push( this.products[i].name)
                    index3.push(this.products[i].id);
                    if(index3.length == 2){break ;}
                }
            }
             if (index2.length >= 2 &&this.isEdit) {
                if (index3[0] !== index3[1]) {
                    this.errors.push("have");
                }
            } 
            if (!this.isEdit &&index2.length >= 1) {
                    this.errors.push("have");
                }

            
           
           

        },
        setView() {
            this.$emit('cancel-edit');
        }

    },
    mounted() {
    
        if (this.isEdit) {
            this.formdata = this.viewProduct;
        }else{this.refreshForm();}
       
    }







}
</script>