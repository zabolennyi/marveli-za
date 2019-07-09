<template lang="pug">
     .content-wrapper
        section
            .container
              .auth
                .auth__banner
                  h1.ui-title-2 banner
                .auth__form
                  span.ui-title-2 Registration
                  form(@submit.prevent="onSubmit")
                    .form-item(:class="{ errorInput: $v.email.$error }")
                      input(
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        :class="{ error: $v.email.$error }"
                        @change="$v.email.$touch()"
                      )
                      .error(v-if="!$v.email.required") Email is required
                      .error(v-if="!$v.email.email") C'mon, put the correct email
                    .form-item(:class="{ errorInput: $v.password.$error }")
                      input(
                        type="password"
                        placeholder="Password"
                        v-model="password"
                       :class="{ error: $v.password.$error }"
                       @change="$v.password.$touch()"
                      )
                      .error(v-if="!$v.password.required") Password is required
                      .error(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters.
                    .form-item(:class="{ errorInput: $v.repeatPassword.$error }")
                      input(
                        type="password"
                        placeholder="Repear Pass"
                        v-model="repeatPassword"
                        :class="{ error: $v.repeatPassword.$error }"
                        @change="$v.repeatPassword.$touch()"
                      )
                      .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.
                    .buttons-list
                      button.button--round.button-success(
                        type="submit"
                      )
                        span(v-if="loading") Loading....
                        span(v-else) Registration
                    .status
                      p.typo__p(v-if="submitStatus === 'OK'") Thnx
                      p.typo__p(v-else) {{submitStatus}}
                    .message
                      span Do you have account?
                        router-link(to="/login")  Enter here
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            console.log('Register')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
        // setTimeout(() => {
        //   this.submitStatus = 'OK'
        // }, 500)
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
.auth__banner
.auth__form
  width 50%

.form-item
  .error
    display none
    margin-bottom 8px
    font-size 12px
  &.errorInput
    .error
      display block

.buttons-list
  text-align right
  margin-bottom 20px

.message
  text-align  center
a
  color #fc5c65

input
  &.error
    border-color #fc5c65
</style>
