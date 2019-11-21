<template>
  <div class="sidebar">
    <router-link to="/">
      <div class="router-link">
        Home
      </div>
    </router-link>
    <router-link to="/myQuestion">
      <div class="router-link">
        My Question
      </div>
    </router-link>
    <router-link to="/askQuestion">
      <div class="router-link">
        Ask Question
      </div>
    </router-link>
    <div class="router-link">
      Search By Tag
      <b-input-group class="gabung mt-2">
        <template v-slot:prepend>
          <b-input-group-text class="searchButton"><i class="fas fa-search"></i></b-input-group-text>
        </template>
        <form  @submit.prevent="searchSubmit">
          <b-form-input placeholder="Search..." style="width: 8vw; height: 30px;border-left: none;" no-fade v-model="search"></b-form-input>
        </form>
      </b-input-group>
    </div>
    <div class="router-link">
      My tags
      <div class="mt-2 col">
        <span class="chip"
          v-for="(tag, index) in tags"
          :key="index"
          @click="searchTag(tag)"
        >{{ tag }}
        <a   class="btn btn-clear" aria-label="Close" role="button"
          @click.prevent="removetag(index)"><i class="far fa-window-close"></i></a>
        </span>
      </div>
    </div>
    <div class="router-link">
      <input
        class="input-form form-control"
        type="text"
        placeholder="Add tags"
        v-model="input_value"
        @keyup.enter  ="add_tag"
      >
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'sidebar',
  data () {
    return {
      search: '',
      input_value: ''
    }
  },
  computed: {
    ...mapState([
      'tags'
    ]),
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    searchSubmit () {
      this.$store.dispatch('patch', {
        title: '',
        tag: this.search
      })
      this.$router.push({ path: '/' })
    },
    searchTag (tag) {
      this.$store.dispatch('patch', {
        title: '',
        tag
      })
      this.$router.push({ path: '/' })
    },
    add_tag () {
      let oldTag = []
      this.tags.forEach((tag, index) => {
        oldTag.push(tag)
      });
      oldTag.push(this.input_value)
      this.$store.dispatch('updateTag', {
        tags: oldTag
      })
    },
    removetag (i) {
      let oldTag = []
      this.tags.forEach((tag, index) => {
        if(index !== i){
          oldTag.push(tag)
        }
      });
      this.$store.dispatch('updateTag', {
        tags: oldTag
      })
    }
  }
}
</script>

<style>
.chip {
  color: #437ab5;
  border-radius: 3px;
  border: 0px #e1ecf4;
  background-color: #e1ecf4;
  padding: 0px 5px 0px 10px;
  margin-right: 10px;
  font-size: 13px;
  cursor: pointer;
}
.chip:hover {
  background-color: #c0dff5;
}
.sidebar{
  border-right: 1px rgb(146, 146, 146) solid;
  width: 15%;
  padding: 20px 0px 10px 15px;
  display: flex;
  flex-direction: column;
  text-align: right;
}
a {
  color: black !important;
}

a.router-link-exact-active {
  border-right: 3px #f48024 solid;
  background-color: #f2f2f2;
  font-weight: bold;
}

.router-link {
  text-align: left;
  padding: 7px 10px;
  font-size: 14px;
}
input:hover, input:active, input:focus {
  outline:0px !important;
  -webkit-appearance:none;
  box-shadow: none !important;
  border: 1px #ced4da solid;
}
</style>
