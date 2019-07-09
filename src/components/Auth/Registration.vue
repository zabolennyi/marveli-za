<template lang="pug">
     .content-wrapper
        section
            .container
              .auth
                .auth__banner
                  h1.ui-title-2 banner
                .auth__form
                  span.ui-title-2 Registration
                  form
                    .form-item(:class="{ errorInput: $v.email.$error }")
                      input(
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        :class="{ error: $v.email.$error }"
                        @change="$v.email.$touch()"
                      )
                      .error(v-if="!$v.email.email") C'mon, put the correct email
                    .form-item(:class="{ errorInput: $v.password.$error }")
                      input(
                        type="password"
                        placeholder="password"
                        v-model="password"
                       :class="{ error: $v.password.$error }"
                       @change="$v.password.$touch()"
                      )
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
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: ''
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
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
.auth__banner
.auth__form
  width 50%

.form__item
  .error
    display none
    margin-bottom 8px
    font-size 10px
  &.errorInput
    .error
      display block

input
  &.error
    border-color #fc5c65
</style>
