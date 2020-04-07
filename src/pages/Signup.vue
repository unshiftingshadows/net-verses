<template>
  <q-page padding>
    <q-card :class="`${$q.screen.lt.md ? 'full-width' : ''} absolute-center bg-primary text-white`" :style="`${$q.screen.lt.md ? 'padding: 50px 10px 50px 10px;' : 'padding: 50px; min-width: 600px;'}`">
      <q-card-section>
        <div class="text-h2 text-center">Signup</div>
      </q-card-section>
      <q-card-section>
        <q-input
          type="email"
          v-model="form.email"
          label="Email"
          @blur="$v.form.email.$touch"
          @keyup="$v.form.email.$reset"
          error-message="Please enter a valid email address"
          :error="$v.form.email.$error"
          no-error-icon
          dark
        />
        <q-input
          type="password"
          v-model="form.password"
          label="Password"
          @keyup="$v.form.password.$reset"
          error-message="Please enter a password"
          :error="$v.form.password.$error"
          no-error-icon
          dark
        />
        <q-input
          type="password"
          v-model="form.passwordcheck"
          label="Password (again)"
          @keyup="$v.form.passwordcheck.$reset"
          @keyup.enter="signup()"
          error-message="Passwords must match"
          :error="$v.form.passwordcheck.$error"
          no-error-icon
          dark
        />
      </q-card-section>
      <q-card-section>
        <q-btn color="white" text-color="primary" class="float-right" label="Signup" @click="signup()" />
        Already have an account? <span class="cursor-pointer text-weight-bolder" @click="$router.push({ path: '/login' })">Click here</span> to login.
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'SignupPage',
  data () {
    return {
      form: {
        email: '',
        password: '',
        passwordcheck: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      },
      passwordcheck: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  mounted () {
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email
    }
  },
  methods: {
    signup () {
      this.$v.$reset()
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('somethings not right')
        return false
      }
      this.$fb.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          console.log('signed up')
          this.$router.push({ path: '/front' })
        })
        .catch((err) => {
          console.log('error!', err)
          switch (err.message) {
            default:
              this.$q.notify({
                icon: 'fas fa-exclamation-circle',
                type: 'negative',
                message: err.message
              })
          }
        })
    }
  }
}
</script>
