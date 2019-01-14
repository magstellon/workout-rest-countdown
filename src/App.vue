<template>
  <div id="app">
    <Interval v-if="started" @stop="stop"/>
    <Start v-else :started="started" @start="start"/>
  </div>
</template>

<script>
import Start from './components/Start.vue'
import Interval from './components/Interval.vue'

export default {
  name: 'app',
  components: {
    Start,
    Interval
  },
  data() {
      return {
          started: false
      }
  },
  methods: {
    start() {
      this.started = true;
    },
    stop() {
      this.started = false;
    }
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
  background-image: radial-gradient(circle, #020032, #0c0a2d, #141228, #1a1823, #1e1e1e);
}
</style>
