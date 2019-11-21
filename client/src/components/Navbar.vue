<template>
  <div id="nav">
    <router-link to="/" style="text-decoration: none; border: 0px;">
      <div class="click center">
        <img src="@/assets/logo.png" alt="" style="width: 30px; height: auto">
        Hacktiv <span class="bold">Overflow</span>
      </div>
    </router-link>
    <router-link to="/askQuestion" style="text-decoration: none; border: 0px;">
      <div class="greyy">
        Question
      </div>
    </router-link>
    <div>
      <b-input-group class="gabung">
        <template v-slot:prepend>
          <b-input-group-text class="searchButton"><i class="fas fa-search"></i></b-input-group-text>
        </template>
        <form  @submit.prevent="searchSubmit">
          <b-form-input placeholder="Search..." style="width: 50vw; height: 30px;border-left: none;" no-fade v-model="search"></b-form-input>
        </form>
      </b-input-group>
    </div>
    <div>
      <b-dropdown id="dropdown-right" right :text="username" size="sm" variant="outline-secondary" class="m-2">
        <b-dropdown-item>
          <div class="center" style="font-size: 40px;">
            <i class="fas fa-user-circle"></i>
          </div>
          <div class="center">
            {{ username }}
          </div>
        </b-dropdown-item>
        <hr>
        <b-dropdown-item @click="login" v-if="!isLogin">Login | Register</b-dropdown-item>
        <b-dropdown-item @click="logout" v-if="isLogin">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    username () {
      if(this.$store.state.username){
        return this.$store.state.username
      }
      else{
        return "Infinite Fox"
      }
    }
  },
  methods: {
    logout () {
      this.$store.commit('isLogin', {
        isLogin: false,
        username: ''
      })
      localStorage.clear()
      this.$router.push({ path: '/login' })
    },
    login () {
      this.$router.push({ path: '/login' })
    },
    searchSubmit () {
      this.$store.dispatch('patch', {
        title: this.search,
        tag: ''
      })
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.searchButton{
  background-color: white;
  border-right: none;
}

#nav {
  border-top: 3px #f48024 solid;
  border-bottom: 1px rgb(146, 146, 146) solid;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #222426;
  height: 8vh;
}

.bold {
  font-weight: bold;
  font-size: 20px;
}

.click {
  cursor: pointer;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.greyy {
  color: rgb(95, 95, 95);
  font-size: 15px;
}

input:hover, input:active, input:focus {
  outline:0px !important;
  -webkit-appearance:none;
  box-shadow: none !important;
  border: 1px #ced4da solid;
}
</style>
