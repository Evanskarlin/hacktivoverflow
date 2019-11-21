<template>
  <div class="form">
    <ul class="tab-group">
      <li class="tab active"><a href="#signup">Sign Up</a></li>
      <li class="tab"><a href="#login">Log In</a></li>
    </ul>

    <div class="tab-content">
      <div id="signup">
        <h1>Sign Up for Free</h1>
        <form @submit.prevent="register">
          <div class="field-wrap">
            <label>
              Username<span class="req">*</span>
            </label>
            <input type="text" v-model="usernamereg">
          </div>

          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="text" v-model="emailreg">
          </div>

          <div class="field-wrap">
            <label>
              Set a Password<span class="req">*</span>
            </label>
            <input type="password" v-model="passwordreg">
          </div>

          <div class="field-wrap">
            <div class="tag-container">
              <div>
                <label>
                  Add tags<span class="req">*</span>
                </label>
                <input
                  type="text"
                  v-model="input_value"
                  @keyup.188  ="add_tag"
                >
              </div>
              <div class="centerLogin">
                <div class="setengah allTags">
                  <span class="chip"
                    v-for="(tag, index) in tags"
                    :key="index"
                  >
                  {{ tag }}
                  <a class="btn btn-clear" aria-label="Close" role="button"
                    @click="delete_tag(index)"><i class="far fa-window-close"></i></a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="button button-block">Get Started</button>
        </form>
      </div>

      <div id="login">
        <h1>Welcome Back!</h1>
        <form @submit.prevent="login">
          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="text" v-model="emaillog">
          </div>

          <div class="field-wrap">
            <label>
              Password<span class="req">*</span>
            </label>
            <input type="password" v-model="passwordlog">
          </div>
          <button class="button button-block">Log In</button>
        </form>
      </div>

    </div><!-- tab-content -->
  </div> <!-- /form -->
</template>

<script>
import $ from "jquery";

export default {
  name: 'login',
  data () {
    return {
      emaillog: '',
      passwordlog: '',
      usernamereg: '',
      emailreg: '',
      passwordreg: '',
      input_value: '',
      tags: []
    }
  },
  methods : {
    add_tag: function () {
      if (this.input_value !== '' && !this.tags.includes(this.input_value)) {
        this.tags.push(this.input_value.slice(0, this.input_value.length - 1))
        this.input_value = ''
      }
    },
    delete_tag: function (i) {
      this.tags.splice(i, 1)
    },
    register () {
      this.$store.dispatch('register', {
        username: this.usernamereg,
        email: this.emailreg,
        password: this.passwordreg,
        tags: this.tags
      })
        .then((data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$router.push({ path: '/' })
        })
    },
    login () {
      this.$store.dispatch('login', {
        email: this.emaillog,
        password: this.passwordlog
      })
        .then((data) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          this.$router.push({ path: '/' })
        })
    }
  },
  mounted () {
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
      var $this = $(this)
      var label = $this.prev('label')

      if (e.type === 'keyup') {
        if ($this.val() === '') {
          label.removeClass('active highlight')
        } else {
          label.addClass('active highlight')
        }
      } else if (e.type === 'blur') {
        if ($this.val() === '') {
          label.removeClass('active highlight')
        } else {
          label.removeClass('highlight')
        }
      } else if (e.type === 'focus') {
        if ($this.val() === '') {
          label.removeClass('highlight')
        } else if ($this.val() !== '') {
          label.addClass('highlight')
        }
      }
    })

    $('.tab a').on('click', function (e) {
      e.preventDefault()

      $(this).parent().addClass('active')
      $(this).parent().siblings().removeClass('active')

      let target = $(this).attr('href')

      $('.tab-content > div').not(target).hide()

      $(target).fadeIn(600)
    })
  }
}
</script>

<style>
.allTags {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 40px;
  width: 80%;
  text-align: right;
}
.centerLogin {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: center;
}
.chip {
  border: 1px #f48024 solid;
  border-radius: 10px;
  padding: 5px 0px 5px 10px;
}

/* codepen */
*, *:before, *:after {
  box-sizing: border-box;
}
html {
  overflow-y: scroll;
}
body {
  font-family: 'Titillium Web', sans-serif;
}
a {
  text-decoration: none;
  color: #f48024;
  transition: 0.5s ease;
}
a:hover {
  color: white;
}
.form {
  background: #dfdcdc;
  padding: 40px;
  max-width: 600px;
  margin: 10px auto;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, .3);
}
.tab-group {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}
.tab-group:after {
  content: "";
  display: table;
  clear: both;
}
.tab-group li a {
  display: block;
  text-decoration: none;
  padding: 15px;
  background: white;
  color: #f48024;
  font-size: 20px;
  float: left;
  width: 50%;
  text-align: center;
  cursor: pointer;
  transition: 0.5s ease;
}
.tab-group li a:hover {
  background: #f48024;
  color: #fff;
}
.tab-group .active a {
  background: #f48024;
  color: #fff;
}
.tab-content > div:last-child {
  display: none;
}
h1 {
  text-align: center;
  color: black;
  font-weight: 300;
  margin: 0 0 10px;
}
label {
  position: absolute;
  transform: translateY(6px);
  left: 13px;
  color: black;
  transition: all 0.25s ease;
  -webkit-backface-visibility: hidden;
  pointer-events: none;
  font-size: 22px;
}
label .req {
  margin: 2px;
  color: #f48024;
}
label.active {
  transform: translateY(50px);
  left: 2px;
  font-size: 14px;
}
label.active .req {
  opacity: 0;
}
label.highlight {
  color: black;
}
input, textarea {
  font-size: 22px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #a0b3b0;
  color: black;
  border-radius: 0;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
input:focus, textarea:focus {
  outline: 0;
  border-color: #f48024;
}
textarea {
  border: 2px solid #a0b3b0;
  resize: vertical;
}
.field-wrap {
  position: relative;
  margin-bottom: 30px;
}
.top-row:after {
  content: "";
  display: table;
  clear: both;
}
.top-row > div {
  float: left;
  width: 48%;
  margin-right: 4%;
}
.top-row > div:last-child {
  margin: 0;
}
.button {
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 10px 0;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #f48024;
  color: #fff;
  transition: all 0.5s ease;
  -webkit-appearance: none;
}
.button:hover, .button:focus {
  background: white;
  color: #f48024;
}
.button-block {
  display: block;
  width: 100%;
}
.forgot {
  margin-top: -20px;
  text-align: right;
}
</style>
