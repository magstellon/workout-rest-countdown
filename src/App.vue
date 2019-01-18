<template>
  <div id="app">
    <Interval />
  </div>
</template>

<script>
import Interval from './components/Interval.vue'

export default {
  name: 'app',
  components: {
    Interval
  }
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
