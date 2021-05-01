<template>
    <div class="bg-gray-900  ">
    <container class="shadow-2xl rounded bg-gray-300">
   
        <form @submit.prevent>
           <div class="grid grid-cols-2">
            <h1 v-if="!isEdit" class="text-6xl text-left ml-12 mt-12 mb-12 text-gray-200 col-span-2 head" style="text-shadow : 3px 3px gray ">New Product</h1>
            <h1 v-if="isEdit" class="text-6xl text-left ml-12 mt-12 mb-12 text-gray-200 col-span-2 head" style="text-shadow : 3px 3px gray ">Editing Product</h1>


            <div class="pt-2 text-left text-white col-span-2">
                <img :src="image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" class="w-auto h-60 mx-auto rounded mb-4"/>
                <h1 class="ml-12">Image File <b class="text-red-600 text-xl" >*</b></h1>
                <input type="file" id="imageFile" class= "ml-12 mb-2 " @change="uploadImageFile($event)" multiple accept=".jpg, .jpeg, .png" />
                <h1
                    v-if="errors.indexOf('noPic') !== -1"
                    class="text-red-600 ml-12"
                >Please Select Photo</h1>
            </div>


            <div class="pt-2 text-left ml-12 mb-2  col-span-2 ">
                <label for="name" class="text-white">Name <b class="text-red-600 text-xl" >*</b> </label><br /><input type="text" class= "shadow-md py-1" style="width : 40% " v-model="formdata.name"/>
                <h1
                    v-if="errors.indexOf('noName') !== -1"
                    class="text-red-600"
                >Please Enter Name 2-30 Character</h1>
                <h1
                    v-if="errors.indexOf('have') !== -1"
                    class="text-red-600"
                >Already Have this Product</h1>
            </div>
            <div class="pt-2 text-left ml-12 mb-2  col-span-2 ">
                <label for="name" class="text-white">Description <b class="text-red-600 text-xl" >*</b> </label><br />
                <textarea
                    type="text"
                    v-model="formdata.description"
                    class=" w-48 align-top shadow-md py-1"
                    rows="3"
                    cols="20"
                    style="width : 40% "
                />
                <h1
                    v-if="errors.indexOf('noDes') !== -1"
                    class="text-red-600"
                >Please Enter Description 10 up to 70 character</h1>
            </div>
            <div class="pt-2 text-left ml-12 mb-2  col-span-2 text-white" >
                <label>Colors <b class="text-red-600 text-xl" >*</b></label>
                <span v-for="color in colors " :key="color.id">
                    <label for="color" class="ml-2">{{ color.colorCode }}</label>
                    <input
                        type="checkbox"
                        class="w-12 h-12 ml-2 align-middle shadow-md py-1"
                        v-model="formdata.color"
                        :value="{ colorId : color.colorId, colorCode : color.colorCode}"
                    />
                </span>
                <h1 v-if="errors.indexOf('noColor') !== -1" class="text-red-600">Please Select Color</h1>
            </div>

            <div class="pt-2 text-left ml-12 mb-2  col-span-2 ">
                <label for="brand" class="text-white">Brand <b class="text-red-600 text-xl" >*</b> </label><br />
                <select name="brand" v-model="formdata.brand" class="shadow-md py-1">
                    <option
                        v-for="brand in brands"
                        :value="brand"
                        :key="brand.brandId"
                        
                    >{{ brand.name }}</option>
                </select>

                <h1 v-if="errors.indexOf('noBrand') !== -1" class="text-red-600">Please Select Brand</h1>
            </div>

            <div class="pt-2 text-left ml-12 mb-2  col-span-1 ">
                <label for="price" class="text-white">Price <b class="text-red-600 text-xl" >*</b> </label><br />
                <input type="text" v-model="formdata.price" style="width : 85%" class="shadow-md py-1" />
                <h1
                    v-if="errors.indexOf('noPrice') !== -1"
                    class="text-red-600"
                >Please Enter Price No more than 999999.99 and cant have more than 2 decimal</h1>
            </div>

            <div class="pt-2 text-left ml-12  col-span-1 ">
                <label for="manufactureDate" class="text-white">Manufactor Date <b class="text-red-600 text-xl" >*</b> </label><br />
                <input type="date" v-model="formdata.manufactureDate" class="shadow-2xl py-1" />
                <h1 v-if="errors.indexOf('noDate') !== -1" class="text-red-600">Please Enter Date</h1>
            </div>

            
            <button
                v-if="!isEdit"
                value="Submit"
                class="border border-gray-600 mt-8 col-span-2 mb-12 mx-auto text-white"
                @click="submitForm"
            >Submit</button>
            <button v-if="isEdit" @click="setView" class="border border-gray-600 col-span-1 mb-12 mx-auto text-white">CANCEL EDIT</button>
            <button v-if="isEdit" class="border border-gray-600 mt-2 col-span-1 mb-12 mx-auto text-white" @click="editForm">Submit Edit</button> 
        
        
        </div>
        </form>
  

</container>

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
                pathPic : null,
                name: null,
                description: null,
                color: [],
                price: null,
                brand: {},
                manufactureDate: null,
            },
        }
    },
    methods: {
        uploadImageFile(event){
            var input = event.target
           this.formdata.pathPic  = input.files[0].name;
            console.log(this.formdata.pathPic)
            if(input.files && input.files[0]){
                var reader = new FileReader();
                reader.onload = (e) => { this.image = e.target.result; } 
                reader.readAsDataURL(input.files[0])

            }        
        },



        refreshForm() {    
                document.getElementById("imageFile").value="";
                this.image = "",
                this.formdata.pathPic = null,
                this.formdata.name = null,
                this.formdata.description = null,
                this.formdata.price = null,
                this.formdata.brand = null,
                this.formdata.manufactureDate = null,
                this.formdata.color = []
        },
        async submitForm() {
            if (!this.isEdit) {
                this.validate();
                if (this.errors.length > 0) {
                    return;
                }

                // const blob = new Blob([JSON.stringify(this.formdata)], {
                //     type: 'application/json'
                // })

                // const formData = new FormData();
                // formData.append('Product',blob);

                var proId = null

                if(proId == null){
                    if(this.products.length > 0){
                    proId = this.products[this.products.length-1].productId +1;
                    }
                    else{
                        proId = 1;
                    }
                }
                const res = await fetch(this.productsUrl, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                        productId : proId,
                        pathPic : this.formdata.pathPic,
                        name: this.formdata.name,
                        description: this.formdata.description,
                        color: this.formdata.color,
                        price: this.formdata.price,
                        brand: this.formdata.brand,
                        manufactureDate: this.formdata.manufactureDate,
                    }
                    )
                })
                this.refreshForm();
                const data = await res.json();
                this.$emit('submit-form', data);
            }
        },
        async editForm() {
            this.validate();
            if (this.errors.length > 0) {
                return;
            }

            await fetch(this.productsUrl + "/" + this.viewProduct.productId, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pathPic : this.formdata.pathPic,
                    name: this.formdata.name,
                    description: this.formdata.description,
                    color: this.formdata.color,
                    price: this.formdata.price,
                    brand: this.formdata.brand,
                    manufactureDate: this.formdata.manufactureDate,
                })
            })


            this.$emit("edited")
        },
        validate() {
           
            this.errors = [];

            if(this.formdata.pathPic == null){
                this.errors.push("noPic")
            }
            if (this.formdata.name == null || this.formdata.name.length <= 2 || this.formdata.name.length > 30) {
                this.errors.push("noName");
            }
            if (this.formdata.description == null || this.formdata.description.length > 70 || this.formdata.description.length < 10) {
                this.errors.push("noDes");
            }
            if (this.formdata.brand == null) {
                this.errors.push("noBrand");
            } 
            if(this.formdata.color.length == 0){
                this.errors.push("noColor")
            }
            if (this.formdata.manufactureDate == null) { this.errors.push("noDate"); }
            if (this.formdata.price == null) {
                this.errors.push("noPrice");
            } if (/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(this.formdata.price.toString()) == false || this.formdata.price.length > 9) {
                this.errors.push("noPrice");
            }
            if(this.formdata.price.toString().indexOf(".") >= 7 ){
                this.errors.push("noPrice")
            }
            if(this.formdata.price.toString().length >= 7 && this.formdata.price.toString().indexOf(".") == -1){
                this.errors.push("noPrice")
            }
            this.formdata.price = parseFloat(this.formdata.price)
            
            var index2 = []
            for (let  i= 0 ;i < this.products.length ; i++){ 
                if(index2.length >= 2){break ;}
                if(this.products[i].name.replace(" ","").toLowerCase() == this.formdata.name.replace(" ","").toLowerCase()){
                    index2.push( this.products[i].id)
                }
            }
             if (index2.length >= 2 &&this.isEdit) {
                if (index2[0] !== index2[1]) {
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


<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');



.head{
    font-family: 'Roboto', sans-serif;
}

</style>