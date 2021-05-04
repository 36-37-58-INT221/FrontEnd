<template>
    <div class= "flex  mx-auto">
       <div v-for="(n,index) in reversePage" :key="n" class= "text-white flex-auto mx-2">
      <button @click="clickPage(n)">  {{ index+1 }}</button>
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
    },mounted(){
      for(let i = this.totalPage-1 ; i >= 0 ; i--){
        if(this.reversePage.indexOf(i) === -1 ){     
                 this.reversePage.push(i)}
      }  
      console.log(this.reversePage)
    },
    beforeUpdate(){
        if( this.reversePage != [] && this.reversePage.length == this.totalPage){
            return ;
        }
        for(let i = this.totalPage-1 ; i >= 0 ; i--){
                 this.reversePage.push(i)
      }  
    }





}
</script>