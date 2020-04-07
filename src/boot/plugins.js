import vuelidate from 'vuelidate'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/remote-config'

import { config } from './fbConfig'

const fbapp = firebase.initializeApp(config)

const remoteConfig = fbapp.remoteConfig()
remoteConfig.settings = {
  fetchTimeoutMillis: 60000,
  minimumFetchIntervalMillis: 3600000
}
remoteConfig.defaultConfig = ({
  background: '"https://images.unsplash.com/photo-1585766765962-28aa4c7d719c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"'
})

// 'async' is optional
export default async ({ Vue }) => {
  Vue.use(vuelidate)
  Vue.prototype.$fb = fbapp
  Vue.prototype.$rc = remoteConfig
  Vue.prototype.$firebase = firebase
}
