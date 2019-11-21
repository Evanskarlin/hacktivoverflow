import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const url = 'http://54.179.154.132'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    tags: [],
    question: [],
    findById: {}
  },
  mutations: {
    isLogin (state, payload) {
      state.isLogin = payload.isLogin
      state.username = payload.username
      state.tags = payload.tags
    },
    question (state, payload) {
      state.question = payload
    },
    findById (state, payload) {
      state.findById = payload
    }
  },
  actions: {
    register ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url + '/register',
          data: payload
        })
          .then(({ data }) => {
            commit('isLogin', {
              isLogin: true,
              username: data.username,
              tags: data.tags
            })
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Register successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    login ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url + '/login',
          data: payload
        })
          .then(({ data }) => {
            commit('isLogin', {
              isLogin: true,
              username: data.username,
              tags: data.tags
            })
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Sign in successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    findUser ({ state, commit, dispatch }, payload) {
      axios({
        method: 'get',
        url: url + '/findUser',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('isLogin', {
            isLogin: true,
            username: data.username,
            tags: data.tags
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    updateTag ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + '/updateTags',
        data: {
          tags: payload.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findUser')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    askquestion ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url + '/question',
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('petch')
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Ask Question successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    patch ({ state, commit, dispatch }, payload) {
      axios({
        method: 'get',
        url: url + `/question?title=${payload.title}&tag=${payload.tag}`,
      })
        .then(({ data }) => {
          commit('question', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    mypatch ({ state, commit, dispatch }, payload) {
      axios({
        method: 'get',
        url: url + '/question/myquestion',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('question', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    findById ({ state, commit, dispatch }, payload) {
      axios({
        method: 'get',
        url: url + `/question/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('findById', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    update ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: url + `/question/${payload.id}`,
          data: {
            title: payload.title, 
            description: payload.description,
            tags: payload.tags
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('mypatch')
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Update Question successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    remove ({ state, commit, dispatch }, payload) {
      axios({
        method: 'delete',
        url: url + `/question/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('mypatch')
          Toast.fire({
            icon: 'success',
            title: 'Delete Question successfully'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    questionUp ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/question/${payload.id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.id })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    questionDown ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/question/${payload.id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.id })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    view ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/question/${payload.id}/view`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.id })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    addAnswer ({ state, commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: url + `/answer/${payload.id}`,
        data: {
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.id })
          Toast.fire({
            icon: 'success',
            title: 'Add Answer successfully'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    updateAnswer ({ state, commit, dispatch }, payload) {
      axios({
        method: 'put',
        url: url + `/answer/${payload.id}`,
        data: {
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.idQuestion })
          Toast.fire({
            icon: 'success',
            title: 'Update Answer successfully'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    answerUp ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/answer/${payload.id}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.questionId })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    answerDown ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/answer/${payload.id}/downvote`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('findById', { id: payload.questionId })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    }
  },
  modules: {
  }
})
