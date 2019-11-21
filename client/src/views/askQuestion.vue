<template>
  <div class="container">
    <form @submit.prevent="askquestion">
      <div class="d-block text-center">
        <div>
          <input type="text" placeholder="Title" class="form-control" v-model="title">
        </div>
        <br />
        <div>
          <quill v-model="content" output="html" :config="config" class="quill"></quill>
        </div>
      </div>
      <div class="tag-container">
        <div>
          <input
            class="input-form form-control"
            type="text"
            placeholder="Add tags"
            v-model="input_value"
            @keyup.188  ="add_tag"
          >
        </div>
        <div class="allTags">
          <span class="chip"
                v-for="(tag, index) in tags"
                :key="index"
          >{{ tag }}
          <a   class="btn btn-clear" aria-label="Close" role="button"
            @click="delete_tag(index)"><i class="far fa-window-close"></i></a>
          </span>
        </div>
      </div>
      <b-button class="mt-3" variant="outline-secondary" block type="submit" >Ask Question</b-button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'askquestion',
  data () {
    return {
      title: '',
      content: '',
      input_value: '',
      tags: [],
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
  methods: {
    add_tag: function () {
      if (this.input_value !== '' && !this.tags.includes(this.input_value)) {
        this.tags.push(this.input_value.slice(0, this.input_value.length - 1))
        this.input_value = ''
      }
    },
    delete_tag: function (i) {
      this.tags.splice(i, 1)
    },
    askquestion () {
      this.$store.dispatch('askquestion', { 
        title: this.title, 
        description: this.content,
        tags: this.tags
      })
        .then(data => {
          this.$router.push({ path: '/myQuestion' })
        })
    }
  }
}
</script>

<style>
.container {
  margin-top: 10px;
}
.quill {
  height: 220px;
  margin-bottom: 60px;
}
.allTags {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 80px;
  border: 1px #cccccc solid;
  padding: 5px;
}
.chip {
  border: 2px #f48024 solid;
  border-radius: 10px;
  padding: 5px 0px 5px 10px;
}

input:hover, input:active, input:focus {
  outline:0px !important;
  -webkit-appearance:none;
  box-shadow: none !important;
  border: 1px #ced4da solid;
}
</style>
