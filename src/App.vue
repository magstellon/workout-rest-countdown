<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
body, html, #app {
  min-height: 100%;
  margin: 0;
  min-width: 320px;

  font-family: 'Roboto', serif;
  font-size: 48px;

  color: #fff;
  background-image: radial-gradient(circle, #051937, #061534, #080f30, #0a082d, #0c0029);
}
</style>
