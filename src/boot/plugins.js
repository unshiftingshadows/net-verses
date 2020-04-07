import vuelidate from 'vuelidate'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/remote-config'

const firebaseConfig = {
  apiKey: 'AIzaSyCMi8vXfEuz3fyeowyP_-xF_RQsCO9JtmQ',
  authDomain: 'unshiftingshadows-d31f1.firebaseapp.com',
  databaseURL: 'https://unshiftingshadows-d31f1.firebaseio.com',
  projectId: 'unshiftingshadows-d31f1',
  storageBucket: 'unshiftingshadows-d31f1.appspot.com',
  messagingSenderId: '1009170052651',
  appId: '1:1009170052651:web:7d2f77e934d4f8b5af5c6e'
}

const fbapp = firebase.initializeApp(firebaseConfig)

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
