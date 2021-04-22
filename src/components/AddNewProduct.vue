<template>
    <div class = "mx-auto">
        <form @submit="submitForm">
            <!-- <label for="image">Image : </label>
            <input type="file" >-->

            <label for="name">Name :</label>
            <input type="text" v-model="formdata.name" class="border border-black" />
            <label for="name">Description :</label>
            <input type="text" v-model="formdata.description"   class="border border-black" />
            
            <label for="color">Colors :</label>
                <div v-for="color in colors " :key="color.id" class="text-6xl"> 
               <input type = "checkbox" v-model="formdata.colorList" :value="color.id"/>
                </div>

            
            <label for="brand">Brand :</label>
            <select name = "brand" v-model="formdata.brand" class="border border-black">    
            <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}
            </option> 
            </select>
            <label for="name">Price :</label>
            <input type="text" v-model="formdata.price"   class="border border-black" />

           

            <label for="manufactureDate">Manufactor Date :</label>
            <input type="date" v-model="formdata.manufactureDate" class="border border-black"/>

            
            <h1 class="text-6xl">{{ formdata.ColorList }}</h1>
        

            <button type="submit" value="Submit" class="border border-black">Submit</button>

        </form>
    </div>
</template>


<script>
export default {
    props:["products","productsUrl"],
    data() {
        return {
            colorUrl: 'http://localhost:5000/color',
            brandUrl: 'http://localhost:5000/brand',
           
            colors: [],
            brands : [],
           
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
       async submitForm(){
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
            
            alert(this.formdata.colorList);

            const data = await res.json();
            this.$parent.refreshProducts(data);




        },






      async fetchColors() {
      const res = await fetch(this.colorUrl);
      const data = await res.json();
      return data;
    },async fetchBrand() {
      const res = await fetch(this.brandUrl);
      const data = await res.json();
      return data;
    },
    

    },
    async created() {
        this.colors =  await this.fetchColors();
        this.brands =  await this.fetchBrand();
        
    }







}
</script>