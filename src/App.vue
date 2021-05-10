<template>
  <div class="container">
    <div class="center">
      <img
        src="./assets/logo.png"
        alt=""
        srcset=""
      >
      <h1>Vue.js {{ val }}</h1>
      <input
        v-model="val"
        type="search"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    val: '',
  }),
});
</script>

<style>
    :root{
        --logo-size: 10rem
    }
    html, body{
        margin: 0;
        width: 100%;
        height: 100%;
    }
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h1{
        font-family: sans-serif;
    }
    img{
        width: var(--logo-size);
        height: var(--logo-size);
    }
    .center{
        text-align: center;
    }
</style>
