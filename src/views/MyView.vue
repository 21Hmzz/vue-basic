<script setup lang="ts">
import { ref } from 'vue';

const login_modal = ref(false);


const colors = ref('');
const savedColors = ref([]);
function isValidColorCode(colorCode) {
  const colorRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return colorRegex.test(colorCode);
}
function addColor(color) {
  if (!isValidColorCode(color)) return;
  if (savedColors.value.includes(color)) return;
  if (savedColors.value.length < 6) {
    savedColors.value.push(color);
  } else {
    savedColors.value.shift();
    savedColors.value.push(color);
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
}

function saveColors() {
  login_modal.value = true;
}
</script>

<template>
  <main>
    <div class="flex flex-row items-center justify-center min-w-100 h-screen  w-screen ">
      <div class="left w-1/4  h-full flex flex-col items-center ">
        <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center">
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
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Sauvegarder la couleur
            </button>
          </div>
          <hr class="w-96" />
          <div class="others flex flex-col items-center justify-center">
            <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center ">
              Entrez un code couleur héxadécimal
            </h4>
            <input v-model="colors" type="text" class="w-96 h-10 rounded-full border border-gray-300 px-4 mb-4"
              placeholder="Entrez un code couleur héxadécimal" />
            <button @click="addColor(colors)"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Sauvegarder la couleur
            </button>

            <hr class="w-96 mt-4" />

            <h4 class="text-2xl font-bold mt-4 mb-4 w-full text-center ">
              Génerer une palette de 6 couleurs
            </h4>
            <button @click="generatePalette(colors)"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              Génerer la palette
            </button>

          </div>
        </div>
      </div>
      <div class="center w-3/4  h-screen">
        <div v-if="savedColors.length > 0" class="flex flex-col items-center justify-center mt-4 gap-2 h-full">
          <div class="flex flex-row items-center justify-center mt-4 gap-2">
            <h2 class="text-2xl font-bold mt-4 mb-4 mx-3">
              Couleurs sauvegardées ({{ savedColors.length }} sur 6) </h2>
            <button @click="saveColors()"
              class="bg-green-500 hover:bg-green-700 text-white gap:2 font-bold py-2 px-4 rounded-full flex flex-row items-center justify-center">
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
            <div class="flex flex-row items-center justify-center mt-4 gap-2">
              Me connecter pour récupérer mes couleurs sauvegardées
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <RouterLink to="/auth">
                  Connexion
                </RouterLink>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="login_modal" id="default-modal" tabindex="-1"
        class=" fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0
                                                                                  h-[calc(100%-1rem)] max-h-full absolute ">
        <div class=" relative w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Vous devez vous connecter pour sauvegarder vos couleurs
              </h3>
              <button type="button" @click="login_modal = false"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Nos services sont gratuits et ne nécessitent pas de compte pour être utilisés. Cependant, si vous
                souhaitez sauvegarder vos couleurs, vous devez vous connecter.
              </p>
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Vos données ne seront pas utilisées à des fins commerciales.
              </p>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <a data-modal-hide="default-modal" type="button" href="/auth"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Me connecter
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>


  </main>
</template>
<style></style>
