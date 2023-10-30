
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    user: Object,
    savedColors: Array
});

const user = ref(JSON.parse(props.user));
function saveColors() {
    login_modal.value = true;
}
const login_modal = ref(false);

</script>

<template>
    <div class="center w-3/4  h-screen">
        <div v-if="savedColors.length > 0" class="flex flex-col items-center justify-center mt-4 gap-2 h-full">
            <div class="flex flex-row items-center justify-center mt-4 gap-2">
                <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                    Couleurs sauvegardées ({{ savedColors.length }} sur 6) </h2>
                <button @click="saveColors()"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950 flex flex-row items-center justify-center">
                    Sauvegarder la palette
                    <img src="../assets/svg/save.svg" alt="" class="w-8 h-8" style="filter: invert(1);">
                </button>

            </div>
            <div class="flex flex-row gap-2 w-full  h-full">
                <div v-if="savedColors.length > 0" class="flex flex-row  flex-wrap h-full w-full ">
                    <div class="flex flex-row   w-full flex-wrap h-full ">
                        <div v-for="color in savedColors"
                            class="h-full w-1/6 font-bold flex flex-col items-center justify-center text-white flex-wrap text-white font-bold py-2 px-4"
                            :style="{ backgroundColor: '#' + color, cursor: 'pointer' }">
                            #{{ color }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center mt-4 gap-2">
            <h2 class="text-2xl font-bold mt-4 mb-4 mx-3">
                Aucune couleur sauvegardée
            </h2>
            <div>
                <div v-if="user === null">
                    <div class="flex flex-row items-center justify-center mt-4 gap-2">
                        Me connecter pour récupérer mes couleurs sauvegardées
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            <RouterLink to="/auth">
                                Connexion
                            </RouterLink>
                        </button>
                    </div>
                </div>
                <div v-else>
                    <h4>
                            Mes palettes sauvegardées
                        </h4>
                    <div class="flex flex-row items-center justify-center mt-4 gap-2">
                       
                        <div v-for="palette in user.palettesSaved"
                            class="flex flex-row items-center justify-center mt-4 gap-2">
                            <div class="flex flex-row items-center justify-center mt-4 gap-2">
                                <div v-for="color in palette.colors"
                                    class="h-full w-1/6 font-bold flex flex-col items-center justify-center text-white flex-wrap text-white font-bold py-2 px-4"
                                    :style="{ backgroundColor: '#' + color, cursor: 'pointer' }">
                                    #{{ color }}
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>