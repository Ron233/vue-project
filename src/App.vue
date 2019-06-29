<template>
  <div id="app" @click="click" >
    <!-- <img src="./assets/logo.png" v-tap='tap' v-press='tap'> -->
    <!-- <router-view/> -->
    <div class="alert" v-if="show" v-pan='tap'>
      <div class="alert_child"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      show: true
    }
  },
  mounted () {
  },
  methods: {
    click () {
      console.log('click')
    },
    tap () {
      // this.show = false
      console.log('tap')
    },
    swiper () {
      console.log('swiper')
    }
  }
}
</script>

<style>
html,body{
  height: 100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%
}
.alert{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.7)
}
.alert_child{
  height: 800px;
}
</style>
