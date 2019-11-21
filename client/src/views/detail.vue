<template>
  <div class="container-fluid detail">
    <h1>Question</h1>
    <div class="mt-3 row">
      <div class="col-md-2 grey">
        <div class="listquestion" @click="questionUp(findById._id)">
          <i class="fas fa-caret-up"></i>
        </div>
        <div>
          {{ findById.upvotes.length - findById.downvotes.length }}
        </div>
        <div class="listquestion" @click="questionDown(findById._id)">
          <i class="fas fa-caret-down"></i>
        </div>
      </div>
      <div class="col-md-7 question">
        <div class="title">
          {{ findById.title }}
        </div>
        <div>
          <p v-html="findById.description"></p>
        </div>
        <div>
          <span class="chip"
            v-for="(tag, index) in findById.tags"
            :key="index"
            @click="searchTag(tag)"
          >{{ tag }}
          </span>
        </div>
      </div>
      <div class="col-md-2">
        <p>
          <span>
            created by 
          </span>
          <span class="blue">
            {{ findById.userId.username }}
          </span>
        </p>
      </div>
    </div>
    <hr>
    <div v-if="findById.answersId.length > 0">
      <h1>Answer</h1>
      <!-- {{findById.answersId}} -->
      <div class="row" v-for="ans in findById.answersId" :key="ans._id">
        <div class="col-md-2 grey">
          <div class="listquestion" @click="answerUp(ans._id)">
            <i class="fas fa-caret-up"></i>
          </div>
          <div>
            {{ ans.upvotes.length - ans.downvotes.length }}
          </div>
          <div class="listquestion" @click="answerDown(ans._id)">
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
        <div class="col-md-7 question">
          <div>
            <p v-html="ans.description"></p>
          </div>
        </div>
        <div class="col-md-2">
          <p>
            <span>
              created by 
            </span>
            <span class="blue">
              {{ ans.userId.username }}
            </span>
          </p>
        </div>
        <div class="col-md-1" v-if="username === ans.userId.username">
          <b-dropdown dropleft no-caret variant="link" toggle-class="text-decoration-none">
            <template v-slot:button-content>
              <i class="fas fa-ellipsis-v"></i>
            </template>
            <b-dropdown-item @click="showModal(ans)">Update</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <hr>
    </div>
    <h6>Add Answer</h6>
    <div>
      <form @submit.prevent="addAnswer">
        <quill v-model="content" output="html" :config="config" class="quill"></quill>
        <button type="submit" class="btn btn-secondary mt-3 mb-5">
          Add Answer
        </button>
      </form>
    </div>
    <b-modal ref="my-modal" hide-footer title="Update Answer">
      <div class="d-block text-center">
        <form @submit.prevent="updateAnswer">
          <quill v-model="updateAns" output="html" :config="config" class="quill"></quill>
          <button type="submit" class="btn btn-secondary mt-3 mb-5">
            Update Answer
          </button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      content: '',
      updateAns: '',
      updateId: '',
      config: {
        placeholder: 'Description Here ...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        }
      }
    }
  },
  computed : {
    ...mapState([
      'findById',
      'username'
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
    questionUp (id) {
      this.$store.dispatch('questionUp', {
        id
      })
    },
    questionDown (id) {
      this.$store.dispatch('questionDown', {
        id
      })
    },
    addAnswer () {
      this.$store.dispatch('addAnswer', {
        id : this.$route.params.id,
        description: this.content
      })
    },
    answerUp (id) {
      this.$store.dispatch('answerUp', {
        id,
        questionId: this.$route.params.id
      })
    },
    answerDown (id) {
      this.$store.dispatch('answerDown', {
        id,
        questionId: this.$route.params.id
      })
    },
    searchTag (tag) {
      this.$store.dispatch('patch', {
        title: '',
        tag
      })
      this.$router.push({ path: '/' })
    },
    showModal(data) {
      this.updateAns = data.description
      this.updateId = data._id
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    updateAnswer() {
      this.$refs['my-modal'].hide()
      this.$store.dispatch('updateAnswer', {
        id: this.updateId,
        description: this.updateAns,
        idQuestion: this.$route.params.id
      })
    }
  },
  watch: {
    $route(to, from) {
      if(to === '/detail'){
        this.$store.dispatch('findById', {
          id: this.$route.params.id
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('view', {
      id: this.$route.params.id
    })
  }
}
</script>

<style>
.detail .chip {
  color: #437ab5;
  border-radius: 3px;
  border: 0px #e1ecf4;
  background-color: #e1ecf4;
  padding: 0px 5px 0px 10px;
  margin-right: 10px;
  font-size: 13px;
  cursor: pointer;
}
.detail .chip:hover {
  background-color: #c0dff5;
}

.detail .title {
  color: #0077cc;
}
.detail .title:hover {
  color: #009ccc;
}
.detail .question {
  text-align: left
}
.detail .listquestion {
  cursor: pointer;
  margin: 10px 0px;
}
.detail .grey {
  color: grey;
  margin-top: 25px;
  font-size: 20px;
  font-weight: bold;
}
/* .createdby {
  display: flex;
  align-items: flex-end;
  font-size: 15px;
} */
.detail .blue {
  color: #007fcf;
}
.detail .quill {
  height: 220px;
  margin-bottom: 60px;
}
</style>
