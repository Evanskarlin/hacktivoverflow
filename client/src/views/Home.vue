<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="main">
      <Sidebar></Sidebar>
      <div class="page container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
.main{
  display: flex;
  height: 92vh;
}
.page{
  width: 85%;
  overflow: auto;
}
</style>
