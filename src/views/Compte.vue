<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Axios from '../_helpers/api.service';
import { useToast } from 'vue-toast-notification';
import Palette from '../components/Palette.vue';
import router from '@/router';



const props = defineProps({
    user: String,
    savedColors: Array
});
onMounted(() => {
    emit('refreshUserToApp');
});
const emit = defineEmits(['refreshUserToApp']);
const $toast = useToast();
const info = ref(JSON.parse(sessionStorage.getItem('user')!));
const theme = ref(localStorage.getItem('color-theme'));
const trad = {
    'light': 'Clair',
    'dark': 'Sombre'
}
const paletteShow = ref({});
const showPaletteBool = ref(false);
function showPalette(palette: any) {
    paletteShow.value = palette;
    showPaletteBool.value = true;
}
function deletePalette(id: string) {
    Axios.patch('/user/palettes/delete/' + info.value.id, {
        paletteId: id
    }).then((response) => {
        console.log(response);
        if (response.data != "Palette deleted") {
            $toast.open({
                message: 'Erreur lors de la suppression de la palette',
                type: 'error',
                duration: 5000,
            });
            return;
        }
        $toast.open({
            message: 'Palette supprimée',
            type: 'success',
            duration: 5000,
        });
        info.value.palettesSaved = info.value.palettesSaved.filter((palette: any) => palette.id !== id);
        emit('refreshUser');
    }
    ).catch((error) => {
        console.log(error);
        $toast.open({
            message: 'Erreur lors de la suppression de la palette',
            type: 'error',
            duration: 5000,
        });
    });
}
function getPlan(plan: string) {
    $toast.open({
        message: 'Fonctionnalité non disponible pour le moment',
        type: 'warning',
        duration: 5000,
    });
}
function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    emit('refreshUserToApp');
    $toast.open({
        message: 'Vous avez été déconnecté',
        type: 'success',
        duration: 5000,
    });
    router.push('/');
}
emit('refreshUserToApp');

</script>

<template >
    <div class="flex flex-col lg:flex-row flex-wrap p-4 mt-4 gap-2 lg:w-screen" style="overflow: visible !important;">
        <div class="w-1/5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
                <div id="tooltip-jese" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    <div class="tooltip-arrow" data-popper-arrow>
                    </div>
                </div>
                <img data-tooltip-target="tooltip-jese" class="w-20 h-20 rounded object-cover"
                    src="../assets/png/avatar.jpeg" alt="Medium avatar">
            </div>
            <a href="#">
                <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {{ info.firstName }} {{ info.lastName }}
                </h5>
            </a>
            <ul class="mb-3 font-normal text-gray-500 dark:text-gray-400">
                <li class="flex items-center mb-2">
                    <svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z">
                        </path>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                    {{ info.email }}

                </li>
                <li>
                    <svg class="w-4 h-4 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z">
                        </path>
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                    {{ info.role }}

                </li>
            </ul>
            <div
                class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Forfait Gratuit</h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">

                    <span class="text-5xl font-extrabold tracking-tight">0</span>
                    <span class="text-3xl font-semibold">
                        €
                    </span>
                    <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/mois</span>
                </div>
                <ul role="list" class="space-y-5 my-7">
                    <li class="flex space-x-3 items-center">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            6 emplacements de palette
                        </span>
                    </li>
                    <li class="flex space-x-3">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            1 utilisateur
                        </span>
                    </li>
                    <li class="flex space-x-3">
                        <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                            1 projet
                        </span>
                    </li>
                    <li class="flex space-x-3 line-through decoration-gray-500">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500">
                            Stockage Cloud
                        </span>
                    </li>
                    <li class="flex space-x-3 line-through decoration-gray-500">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500">
                            Api REST
                        </span>
                    </li>
                    <li class="flex space-x-3 line-through decoration-gray-500">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500">
                            Génération de code couleur par IA
                        </span>
                    </li>
                    <li class="flex space-x-3 line-through decoration-gray-500">
                        <svg class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span class="text-base font-normal leading-tight text-gray-500">
                            Support 24/7
                        </span>
                    </li>
                </ul>
                <button type="button" @click="getPlan('free')"
                    class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">
                    Passer à la version premium
                </button>
            </div>
            <div class="logout flex flex-row items-center justify-center gap-2 mt-4">
                <button @click="logout"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full dark:bg-red-900  dark:hover:bg-red-950 flex flex-row items-center justify-center">
                    Se déconnecter
                </button>
            </div>


        </div>
        <div class=" w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="palettes">
                <div class="flex flex-row  mt-4 gap-2">
                    <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                        Palettes sauvegardées ({{ info.palettesSaved.length }} sur 6)
                    </h2>
                </div>
                <div class="flex flex-row flex-wrap  mt-4 gap-8 ">
                    <div v-for=" palette in info.palettesSaved"
                        class="flex flex-col items-center justify-center gap-4 bg-gray-100 p-4 rounded-lg dark:bg-gray-700 dark:text-white">
                        <p class="text-md font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                            {{ palette.name }}
                        </p>
                        <div class="flex flex-row items-center justify-center gap-2">
                            <div v-for="color in palette.colors" class="w-10 h-10 rounded-full"
                                :style="{ backgroundColor: '#' + color }"></div>
                        </div>
                        <div class="flex flex-row items-center justify-center gap-2">
                            <button @click="deletePalette(palette.id)"
                                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full dark:bg-red-900  dark:hover:bg-red-950 flex flex-row items-center justify-center">
                                Supprimer la palette
                            </button>
                            <button @click="showPalette(palette)"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full dark:bg-blue-900  dark:hover:bg-blue-950 flex flex-row items-center justify-center">
                                Voir
                            </button>
                        </div>
                    </div>

                </div>
                <Palette v-if="showPaletteBool" :palette="paletteShow" @close="showPaletteBool = false" />

            </div>
            <hr class="my-4">
            <div class="flex flex-row gap-2">
                <div
                    class=" w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
                    <div class="header flex flex-row items-center justify-between ">
                        <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200 underline">
                            Mes projets
                        </h2>
                        <span
                            class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">0/1</span>
                    </div>
                    <button
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full dark:bg-green-900  dark:hover:bg-green-950 flex flex-row items-center justify-center">
                        Nouveau projet
                    </button>
                </div>
                <div
                    class=" w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
                    <div class="header flex flex-row items-center justify-between ">
                        <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200 underline">
                            Mes utilisateurs
                        </h2>
                        <span
                            class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">1/1</span>
                    </div>
                    <div class="content">
                        <div class="user flex flex-row items-center justify-between ">
                            <p class="text-md font-bold mt-4 mb-4 mx-3 dark:text-dark-200">
                                {{ info.firstName }} {{ info.lastName }}
                            </p>
                            <p class="text-gray-500 dark:text-dark-200">
                                {{ info.email }}
                            </p>
                            <button
                                class="text-white bg-red-400 dark:bg-red-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                disabled>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class=" w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
                    <div class="header flex flex-row items-center justify-between ">
                        <h2 class="text-2xl font-bold mt-4 mb-4 mx-3 dark:text-dark-200 underline">
                            Confidentialité et sécurité
                        </h2>
                        <div class="content">
                            <button @click="router.push('/compte/parametres')"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Accèder aux paramètres
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>