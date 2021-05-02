<template>
    <div class="bg-gray-500 mt-2 mr-3 ml-6 mb-2">
        <div class="grid grid-cols-3 pb-8">
            <div class="col-span-1">
               <slot name="image"></slot>
            </div>

            <div class="col-span-2">
                <div class="text-2xl">
                    <slot name="productName" />
                </div>
                <div>
                    <slot name="price" />
                </div>
            </div>
        </div>
    </div>
</template>





