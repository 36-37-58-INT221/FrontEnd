<template>
    <div class= "flex  mx-auto">
       <div v-for="(n,index) in reversePage" :key="n" class= "text-white flex-auto mx-2">
      <button class="pageHover" @click="clickPage(n)">  {{ index+1 }}</button>
       </div>

        
    </div>
</template>


<script>
export default {
    props:['totalPage','currentPage'],
    data(){
       return{ 
        reversePage:[]
    }
    },
    methods: {
        clickPage(pageSelect){
            this.$emit('change-page',pageSelect);
        }
    },
    beforeUpdate(){
        if( this.reversePage != [] && this.reversePage.length == this.totalPage){
            return ;
        }
        for(let i = this.totalPage-1 ; i >= 0 ; i--){
            if(this.reversePage.indexOf(i) === -1 ){     
                 this.reversePage.push(i)}
      }  
      
    }





}
</script>



<style>
    .pageHover{
    --tw-border-opacity: 1;
    border-color: rgba(31, 41, 55, var(--tw-border-opacity));
    z-index : 3;
    border-width : 10px;
    }



    .pageHover:hover,.pageHover:focus{
    border-style:solid;
    --tw-border-opacity: 1;
    border-color: white;
    background-color :rgba(17, 24, 39, var(--tw-bg-opacity));
    z-index : 3;
    padding : 9px;
    border-width : 1px;
    }





</style>