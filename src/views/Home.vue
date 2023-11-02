<script setup lang="ts">

import { ref } from 'vue';

import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import ToolsBar from '@/components/ToolsBar.vue';
import Palettes from '@/components/Palettes.vue';
import axios from 'axios';

const emit = defineEmits(['refreshUserToApp']);

const $toast = useToast();
const savedColors = ref([]);
const user = ref(sessionStorage.getItem('user'));

function updateSavedColors(savedColorsOld: any) {
  console.log(savedColors);
  savedColors.value = savedColorsOld;
}
function refreshUser() {

  emit('refreshUserToApp');


}

</script>

<template>
  <main>
    <div
      class="flex lg:flex-row lg:items-center lg:justify-center lg:min-w-100 h-screen  lg:w-screen dark:bg-dark-50 flex-col">
      <ToolsBar :saved-colors="savedColors" @saved-colors="updateSavedColors" />
      <Palettes :saved-colors="savedColors" :user="user" @refreshUser="refreshUser" />
    </div>


  </main>
</template>
<style></style>
