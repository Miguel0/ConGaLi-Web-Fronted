<template>
  <generic-modal v-on:modalBackgroundClicked='cancel'>
    <span slot='header'></span>

    <div slot="body" class="custom-modal-body">

      <ul class="form-switcher">
        <li @click.prevent="isForLogIn = false">
          <a class="noselect" :class="{'active': isForLogIn}" href="" id="login-form">Login</a>
        </li>
        <li class="noselect" @click.prevent="isForLogIn = true">
          <a :class="{'active': !isForLogIn}" href="" id="register-form">Register</a>
        </li>
      </ul>

      <div class="form-group" :class="{ 'form-group--error': $v.userData.user.$error }">
        <label class="form__label">User</label>
        <input class="form__input" v-model="userData.user" @input="$v.userData.user.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.userData.user.between">User must have at least {{$v.userData.user.$params.minLength.min}} letters.</span>
      
      <div v-if='isForLogIn' class="form-group" :class="{ 'form-group--error': $v.userData.email.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" type="email" v-model="userData.email" @input="$v.userData.email.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.userData.email.between">Email must have a valid formand and at least {{$v.userData.email.$params.minLength.min}} letters.</span>
      
      <div class="form-group" :class="{ 'form-group--error': $v.userData.password.$error }">
        <label class="form__label">Password</label>
        <input class="form__input" type="password" v-model="userData.password" @input="$v.userData.password.$touch()">
      </div>
      <span class="form-group__message" v-if="!$v.userData.password.between">Password must have at least {{$v.userData.password.$params.minLength.min}} letters.</span>
    </div>

    <div slot="footer" class="noselect">
      <a class='modal-default-button actionButton' @click.prevent='cancel'>Cancel</a>
      <a v-if="isForLogIn" class='modal-default-button actionButton' @click.prevent='propagateSignUp'>SignUp</a>
      <a v-else class='modal-default-button actionButton' @click.prevent='propagateLogIn'>LogIn</a>

      <div class="links">
          <a v-if="isForLogIn" href="" @click="propagateForgotPassword">Forgot your password?</a>
          <a v-else href="" @click="isForLogIn = true">Already have an account?</a>
      </div>
    </div>
  </generic-modal>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import GenericModal from './GenericModal.vue'

export default {
  name: 'session-manager-modal',
  components: {
    'generic-modal': GenericModal
  },
  methods: {
    propagateForgotPassword () {
      this.$emit('forgotPassword', this.$data.userData)
    },
    propagateSignUp () {
      this.$emit('signUp', this.$data.userData)
    },
    propagateLogIn () {
      this.$emit('logIn', this.$data.userData)
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  validations: {
    userData: {
      user: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      email: {
        required,
        minLength: minLength(8),
        email
      }
    }
  },
  data () {
    return {
      userData: {
        user: '',
        password: '',
        email: ''
      },
      isForLogIn: false
    }
  }
}
</script>

<style scoped>
.custom-modal-body {
  margin-top: -3.35em;
  margin-left: -2em;
  margin-right: -2em;
  margin-bottom: 0px;
}

ul.form-switcher {
  width: 100%;
  margin-bottom: 1em;
  height: 50px;
}

ul.form-switcher li {
  width: 50%;
  margin: 0px;
  display: block;
  float: left;
}

ul.form-switcher li a {
  width: 100%;
  display: block;
  height: 50px;
  line-height: 50px;
  color: #666666;
  background-color: #dddddd;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

ul.form-switcher li a.active {
  color: #000000;
  background-color: #f6f6f6;
}

.links {
  text-align: center;
  padding-top: 25px;
  font-size: 13px;
  width: 100%;
  display:inline-block;
}

.links a {
  color: #3fb67b;
}
</style>
