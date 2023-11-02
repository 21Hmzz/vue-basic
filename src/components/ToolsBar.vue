<script setup lang="ts">


import { ref } from 'vue';
const emit = defineEmits(['savedColors']);

const props = defineProps({
    user: Object,
    savedColors: Array
});
const colors = ref('');
const savedColors = ref([]);

function isValidColorCode(colorCode: string) {
    const colorRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(colorCode);
}
function addColor(color: any) {
    if (!isValidColorCode(color)) return;
    if (savedColors.value.includes(color)) return;
    if (savedColors.value.length < 6) {
        savedColors.value.push(color);
        emit('savedColors', savedColors.value);
    } else {
        savedColors.value.shift();
        savedColors.value.push(color);
        emit('savedColors', savedColors.value);

    }
}
function generateColor() {
    colors.value = Math.floor(Math.random() * 16777215).toString(16);
    if (!isValidColorCode(colors.value)) generateColor();
    return colors.value;
}
function generatePalette() {
    let baseColor = generateColor();
    const palette = [];
    for (let i = 0; i < 6; i++) {
        palette.push(baseColor);
        baseColor = generateColor();
    }
    savedColors.value = palette;
    emit('savedColors', savedColors.value);

}


</script>

<template>
    <div
        class="left lg:w-1/4  lg:h-full flex flex-col items-center pb-3 mt-3 mx-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

        <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center dark:text-dark-200">
            Cliquez sur générer pour obtenir un code couleur héxadécimal aléatoire
        </h4>
        <div class="flex flex-col items-center justify-center mt-4 gap-2">
            <button @click="colors = generateColor()"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-96">
                Générer
            </button>
            <div class="w-40 h-40 font-bold flex flex-col items-center justify-center text-white"
                :style="{ backgroundColor: '#' + colors }">
                {{ colors }}
            </div>
            <div v-if="colors !== ''">
                <button @click="addColor(colors)"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950">
                    Sauvegarder la couleur
                </button>
            </div>
            <hr class="w-96" />
            <div class="others flex flex-col items-center justify-center">
                <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center dark:text-dark-200 ">
                    Entrez un code couleur héxadécimal
                </h4>
                <input v-model="colors" type="text" class="w-96 h-10 rounded-full border border-gray-300 px-4 mb-4"
                    placeholder="Entrez un code couleur héxadécimal" />
                <button @click="addColor(colors)"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950">
                    Sauvegarder la couleur
                </button>

                <hr class="w-96 mt-4" />

                <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center  dark:text-dark-200">
                    Génerer une palette de 6 couleurs
                </h4>
                <button @click="generatePalette()"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950">
                    Génerer la palette
                </button>

            </div>
        </div>
    </div>
</template>