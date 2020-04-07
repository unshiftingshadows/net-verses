<template>
  <q-page padding>
    <q-card :class="`${$q.screen.lt.md ? 'full-width' : ''} absolute-center bg-primary text-white`" :style="`${$q.screen.lt.md ? 'padding: 50px 10px 50px 10px;' : 'padding: 50px; min-width: 600px;'}`">
      <q-card-section>
        <div class="text-h2 text-center">Login</div>
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
          @keyup="form.invalidPassword = false; $v.form.password.$reset()"
          @keyup.enter="login()"
          :error-message="form.invalidPassword ? 'Whoops! Looks like this is the wrong password...' : 'Please enter a password'"
          :error="$v.form.password.$error || form.invalidPassword"
          no-error-icon
          dark
        />
      </q-card-section>
      <q-card-section>
        <q-btn color="white" text-color="primary" class="float-right" label="Login" @click="login()" />
        <q-btn color="warning" outline label="Forgot Password" @click="forgotPassword()" />
        <br/>
        <br/>
        Don't have an account? <span class="cursor-pointer text-weight-bolder" @click="$router.push({ path: '/signup' })">Click here</span> to sign up.
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        email: '',
        password: '',
        invalidPassword: false
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
      }
    }
  },
  methods: {
    login () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify({
          icon: 'fas fa-exclamation-circle',
          type: 'negative',
          message: 'Please check the fields again'
        })
        return false
      }
      this.$fb.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          console.log('signed in')
          this.$router.push({ path: '/front' })
        })
        .catch(err => {
          console.log('error!', err)
          switch (err.code) {
            case 'auth/user-not-found':
              this.$q.notify({
                icon: 'fas fa-exclamation-circle',
                type: 'negative',
                message: 'User not found',
                timeout: 5000,
                progress: true,
                actions: [
                  { label: 'Signup', color: 'white', handler: () => { this.$router.push({ path: '/signup', query: { email: this.form.email } }) } }
                ]
              })
              break
            case 'auth/wrong-password':
              this.form.invalidPassword = true
              this.$q.notify({
                icon: 'fas fa-exclamation-circle',
                type: 'negative',
                message: 'Invalid password -- please try again'
              })
              break
            default:
              this.$q.notify({
                type: 'warning',
                message: err.message
              })
          }
        })
    },
    forgotPassword () {
      this.$v.form.email.$touch()
      if (this.$v.form.email.$error) {
        this.$q.notify({
          icon: 'fas fa-exclamation-circle',
          type: 'negative',
          message: 'Please enter your email address'
        })
        return false
      }
      this.$fb.auth().sendPasswordResetEmail(this.form.email)
        .then(() => {
          this.$q.notify({
            icon: 'fas fa-check-circle',
            type: 'positive',
            message: `Password reset email sent to: ${this.form.email}. Please allow a few minutes for delivery.`
          })
        })
        .catch(err => {
          switch (err.code) {
            case 'auth/user-not-found':
              this.$q.notify({
                icon: 'fas fa-exclamation-circle',
                type: 'negative',
                message: 'This email address is not associated with an account.',
                timeout: 5000,
                progress: true,
                actions: [
                  { label: 'Click here to signup', color: 'white', handler: () => { this.$router.push({ path: '/signup', query: { email: this.form.email } }) } }
                ]
              })
              break
            default:
              this.$q.notify({
                type: 'warning',
                message: err.message
              })
          }
        })
    }
  }
}
</script>
