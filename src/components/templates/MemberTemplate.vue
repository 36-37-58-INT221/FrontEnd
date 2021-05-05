<template>
    <div class="grid grid-cols-1 lg:grid-cols-3  mr-28 ml-24  p-1 mt-2 bg-white">
        <div><slot name = "image"></slot></div>
      
        
        <div class="row-span-3 col-span-2">
        <h1 class="header text-2xl lg:text-4xl pt-4 pr-1 text-left pl-10"><slot name="memberName"></slot></h1>
        <h1 class=" text-redpastel text-sm lg:text-base text-left pl-10 py-1"><b><slot name="role" ></slot></b></h1>
        <h1 class=" text-left pl-10">ID <b>:</b> <slot name="studentId"></slot></h1>
    </div>
    </div>
 
</template>


