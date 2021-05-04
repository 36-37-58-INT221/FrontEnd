<template>
    <div class= "flex  mx-auto">
       <div v-for="n in totalPage" :key="n" class= "text-white flex-auto mx-2">
      <button @click="clickPage(n-1)">  {{ n }}</button>
       </div>

        
    </div>
</template>


<script>
export default {
    props:['totalPage','currentPage'],
    methods: {
        
        clickPage(pageSelect){
            this.$emit('change-page',pageSelect);
        }

    },


}
</script>