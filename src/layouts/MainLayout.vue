<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          NET Verses
        </q-toolbar-title>

        <div class="cursor-pointer" @click="link('http://netbible.org')">NET Bible</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',

  data () {
    return {
      link (url) {
        openURL(url)
      }
    }
  }
}
</script>
