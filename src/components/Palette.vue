<script setup lang="ts">
import { useToast } from 'vue-toast-notification';
const props = defineProps({
    palette: Array
});
const $toast = useToast();
const emit = defineEmits(['close']);
function copy(color: string) {
    navigator.clipboard.writeText('#' + color);
    $toast.open({
        message: 'Couleur copiée',
        type: 'success',
        duration: 5000,
    });
}
</script>

<template>
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div
            class="flex flex-col m-auto items-center justify-center h-screen pt-4 px-4 pb-20 text-center  bg-gray-500 bg-opacity-75 transition-opacity">
            <div class="h-96 fixed inset-0   flex flex-row gap-4 justify-center items-center ">
                <div v-for="color in palette.colors" :key="color" class="flex flex-col items-center justify-center gap-2">
                    <div :style="{ backgroundColor: '#' + color }" class="w-20 h-20 rounded-lg shadow-lg"
                        @click="copy(color)">
                    </div>
                    <div class="text-white dark:text-gray-200">#{{ color }}</div>


                </div>

                <button @click="emit('close')"
                    class="absolute top-0 right-0 m-4 text-red-700 hover:text-red-600 bg-white rounded-full p-2">
                    Fermer
                </button>
            </div>
            <p class="text-gray-700 dark:text-gray-800 bg-gray-100 p-4 rounded-lg">
                Cliquez sur une couleur pour la copier
            </p>
        </div>


    </div>
</template>