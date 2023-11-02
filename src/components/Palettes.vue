
<script setup lang="ts">
import Axios from '../_helpers/api.service';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
const props = defineProps({
    user: Object,
    savedColors: Array
});

const $toast = useToast();

const emit = defineEmits(['refreshUser']);

const user = ref(JSON.parse(sessionStorage.getItem('user')!));
const paletteName = ref('');
function saveColors() {
    if (user.value === null) {
        login_modal.value = true;
    } else {
        if (user.value.palettesSaved.length >= 6) {
            $toast.open({
                message: 'Vous avez atteint le nombre maximum de palettes sauvegardées',
                type: 'error',
                duration: 5000,
            });
            return;
        }
        Axios.patch('/user/palettes/' + user.value.id, {
            palette: props.savedColors,
            paletteName: paletteName.value
        }).then((response) => {
            console.log(response);
            $toast.open({
                message: 'Palette sauvegardée',
                type: 'success',
                duration: 5000,
            });
            emit('refreshUser');
        });
    }
}

emit('refreshUser');

const login_modal = ref(false);

</script>

<template>
    <div
        class="center lg:w-3/4  lg:h-screen lg:p-0 p-4 mt-3 mx-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div v-if="savedColors.length > 0" class="flex flex-col items-center justify-center mt-4 gap-2 h-full ">
            <div class="flex flex-row items-center justify-center mt-4 gap-2">
                <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                    Couleurs selectionnées ({{ savedColors.length }} sur 6) </h2>
                <input type="text" class="border border-gray-200 rounded-lg p-2" placeholder="Nom de la palette"
                    v-model="paletteName">
                <button @click="saveColors()"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950 flex flex-row items-center justify-center">
                    Sauvegarder la palette
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
            <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                Aucune couleur séléctionnée
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
                    <div v-if="user.palettesSaved.length > 0"
                        class=" flex flex-row rounded-lg shadow-lg bg-gray-50 p-4 dark:bg-gray-800 dark:text-white items-center justify-center mt-4 gap-2">

                        <p v-if="user.palettesSaved.length === 1"
                            class="text-md font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                            Vous avez {{ user.palettesSaved.length }} palette sauvegardée
                        </p>
                        <p v-else class="text-md font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                            Vous avez {{ user.palettesSaved.length }} palettes sauvegardées
                        </p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            <a href="/compte">
                                Voir mes palettes
                            </a>
                        </button>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>