<template>
  <div style="height:100vh">
    <h1>
      {{random_num}}
    </h1>
    <a-button type="primary" @click="getNewNumber">Randomize-Me</a-button>
  </div>
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
const random_num = ref(5);

const getNewNumber = () =>{
  let endpoint = import.meta.env.VITE_BACKEND_IP + '/random';
  axios.get(endpoint)
  .then((res) =>{
    random_num.value = res.data
  })
  .catch((err) =>{
  })
}
</script>