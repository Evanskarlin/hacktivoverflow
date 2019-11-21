<template>
  <div class="container-fluid">
    <div class="mt-3">
      <h1>{{ username }} Question</h1>
    </div>
    <hr>
    <div class="row listquestion grey" v-for="ques in question" :key="ques._id">
      <div class="col-md-1">
        <div>
          {{ ques.upvotes.length - ques.downvotes.length }}
        </div>
        <div>
          votes
        </div>
      </div>
      <div class="col-md-1">
        <div>
          {{ ques.answersId.length }}
        </div>
        <div>
          answers
        </div>
      </div>
      <div class="col-md-1">
        <div>
          {{ ques.views.length }}
        </div>
        <div>
          views
        </div>
      </div>
      <div class="col-md-6 question">
        <div class="title"  @click="detail(ques._id)">
          {{ ques.title }}
        </div>
        <div>
          <span class="chip"
            v-for="(tag, index) in ques.tags"
            :key="index"
            @click="searchTag(tag)"
          >{{ tag }}
          </span>
        </div>
      </div>
      <div class="col-md-2 createdby">
        <p>
          <span>
            created by 
          </span>
          <span class="blue">
            {{ ques.userId.username }}
          </span>
        </p>
      </div>
      <div class="col-md-1">
        <b-dropdown dropleft no-caret variant="link" toggle-class="text-decoration-none">
          <template v-slot:button-content>
            <i class="fas fa-ellipsis-v"></i>
          </template>
          <b-dropdown-item @click="update(ques._id)">Update</b-dropdown-item>
          <b-dropdown-item @click="remove(ques._id)">Delete</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'myQuestion',
  data () {
    return {
      
    }
  },
  computed : {
    ...mapState([
      'username',
      'question'
    ])
  },
  methods : {
    update (id) {
      this.$router.push({ path: `/update/${id}` })
    },
    remove (id) {
      this.$store.dispatch('remove', {
        id
      })
    },
    detail (id) {
      this.$router.push({ path: `/detail/${id}` })
    },
    searchTag (tag) {
      this.$store.dispatch('patch', {
        title: '',
        tag
      })
      this.$router.push({ path: '/' })
    }
  },
  watch: {
    $route(to, from) {
      if(to === '/myQuestion'){
        this.$store.dispatch('mypatch')
      }
    }
  },
  mounted () {
    this.$store.dispatch('mypatch')
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

.title {
  color: #0077cc;
}
.title:hover {
  color: #009ccc;
}
.question {
  text-align: left
}
.listquestion {
  cursor: pointer;
  margin: 10px 0px;
}
.grey {
  color: grey;
  margin-top: 25px;
}
.createdby {
  display: flex;
  align-items: flex-end;
  font-size: 15px;
}
.blue {
  color: #007fcf;
}
</style>
