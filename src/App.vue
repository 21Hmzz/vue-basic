<script lang="ts" setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { ref, onMounted, provide } from 'vue'
import axios from "axios";
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
var logged = false;

onMounted(() => {
  function getUser() {
    if (user.value !== undefined) {
      axios.get('http://localhost:3000/api/user/' + user.value.id)
        .then((response) => {
          user.value = response.data
          logged = true;

        })
        .catch((error) => {
          console.log(error)
          logged = false;
        })
    } else {
      console.log('no user')
      logged = false;

    }
  }
  getUser();

  provide('user', user.value);

});
</script>

<template>
  <NavBar :logged="logged" />
  <RouterView />
</template>

<style scoped></style>
