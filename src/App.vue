

<template>
  <NavBar :logged="logged" @theme="theme" />
  <RouterView @connexionUtilisateur="connexionUtilisateur" @refreshUserToApp="refreshUser" />
</template>

<style scoped></style>
<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Axios from './_helpers/api.service';
import { onMounted } from 'vue'

theme(localStorage.getItem('color-theme')!);

function theme(theme: string) {
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");

  } else {
    document.documentElement.classList.remove("dark");
  }
}
function connexionUtilisateur(connexionUtilisateur: string) {
  console.log(connexionUtilisateur);
  if (connexionUtilisateur) {
    logged = true;
  } else {
    logged = false;
  }
}
function refreshUser() {
  const token = sessionStorage.getItem('token');
  if (token) {
    Axios.get('/user/').then((response: { data: any; }) => {
      sessionStorage.setItem('user', JSON.stringify(response.data));
      if (response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data));

      } else {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      }

    });
  } else {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

}

var logged = false;

if (sessionStorage.getItem('token')) {
  logged = true;
}
else {
  logged = false;
}


</script>