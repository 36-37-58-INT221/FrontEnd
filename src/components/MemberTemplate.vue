<template>
    <div class="grid grid-cols-3  mr-28 ml-24 p-1 mt-2 bg-white">
        <img class="rounded-full w-48 h-auto row-span-3 py-2 px-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
        
        <div class="row-span-3 col-span-2">
        <h1 class="header text-4xl pt-4 pr-1 text-left pl-10"><slot name="memberName"></slot></h1>
        <h1 class=" text-red-400 text-left pl-10 py-1"><b><slot name="role" ></slot></b></h1>
        <h1 class=" text-left pl-10">ID <b>:</b> <slot name="studentId"></slot></h1>
    </div>
    </div>
 
</template>


