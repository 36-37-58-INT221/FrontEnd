<template>
    <div class=" text-left text-white text-2xl py-4 pl-2  pb-2"><h1 v-if="this.$route.path != '/'">{{ title }}</h1><h1 v-else>Home</h1></div>
    
    
    
    <div class="bg-gray-700 text-left text-white py-2"> 
    <div class= "ml-2 hover:bg-red-500 hover:my-2   inline"> <router-link to="/">Home</router-link></div>   
    <div class="ml-2 hover:bg-red-500  inline" @click ="goProductList()"> Product</div>   
    <div class="ml-2 hover:bg-red-500 inline"  @click ="goTeam()">  Team</div>   
    </div>

</template>


<script>
    import router from '../router';
export default {
    data() {
        return {
            title : null,
        }
    },
    methods: {

        goProductList(){
            this.title="Product List" 
            router.push("/ProductList")
        },
        goTeam(){
            this.title="Team"
            router.push("/Team")
        }
    },
    mounted(){



    }







}
</script>





