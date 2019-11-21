<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route(to, from) {
      
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('findUser')
    }
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
</style>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
</style>
