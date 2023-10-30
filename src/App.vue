

<template>
  <NavBar :logged="logged" />
  <RouterView />
</template>

<style scoped></style>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

import { ref, onMounted, provide } from 'vue'
import axios from "axios";

var logged = false;


const user = sessionStorage.getItem('user');
if (user) {
  logged = true;
}

</script>