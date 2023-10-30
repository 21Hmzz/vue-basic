<script setup lang="ts">

import { ref } from 'vue';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import ToolsBar from '@/components/ToolsBar.vue';
import Palettes from '@/components/Palettes.vue';



const $toast = useToast();
const savedColors = ref([]);
const user = ref(sessionStorage.getItem('user'));

function updateSavedColors(savedColorsOld: any) {
  console.log(savedColors);
  savedColors.value = savedColorsOld;
}

</script>

<template>
  <main>
    <div class="flex flex-row items-center justify-center min-w-100 h-screen  w-screen dark:bg-dark-50">
      <ToolsBar :saved-colors="savedColors" @saved-colors="updateSavedColors" />
      <Palettes :saved-colors="savedColors" :user="user" />
    </div>


  </main>
</template>
<style></style>
