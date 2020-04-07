<template>
  <q-page ref="page" padding class="page-image" :style="`background-image: url(${background})`">
    <q-card v-if="!loading" :class="`verse-card ${$q.screen.lt.md ? 'full-width' : ''}`" :style="`${$q.screen.lt.md ? '' : 'padding: 50px;'} min-margin: 10px; margin: 50px;`">
      <q-card-section>
        <h4 class="text-right text-weight-light">Today's Verse</h4>
      </q-card-section>
      <q-card-section>
        <div :class="`${$q.screen.lt.md ? 'text-h4' : 'text-h2'} text-center`">{{ verseText }}<br/>
        <span class="text-subtitle2">- {{ refText }} <span @click="link('http://netbible.org')" class="text-primary cursor-pointer">(NET)</span></span></div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { date, LocalStorage, openURL } from 'quasar'

export default {
  name: 'FrontPage',
  data () {
    return {
      loading: false,
      verseText: '',
      refText: '',
      background: ''
    }
  },
  created () {
    this.getVerse()
    this.$rc.fetchAndActivate().then(() => {
      this.background = this.$rc.getValue('background')._value
      console.log(this.$rc.getValue('background'))
    })
  },
  methods: {
    getVerse () {
      if (LocalStorage.getItem('date') === date.formatDate(Date.now(), 'YYYY-MM-DD')) {
        this.verseText = LocalStorage.getItem('text')
        this.refText = LocalStorage.getItem('ref')
        this.loading = false
      } else {
        this.$fb.functions().httpsCallable('newVerse')().then(res => {
          console.log('done', res)
          this.verseText = res.data.text
          this.refText = res.data.ref
          LocalStorage.set('date', date.formatDate(Date.now(), 'YYYY-MM-DD'))
          LocalStorage.set('text', res.data.text)
          LocalStorage.set('ref', res.data.ref)
          this.loading = false
        })
      }
    },
    link (url) {
      openURL(url)
    }
  }
}
</script>

<style scoped>

.verse-card {
  background-color: rgba(0, 0, 0, 0.65);
  color: white;
}

.page-image {
  /* background-image: url("https://images.unsplash.com/photo-1585766765962-28aa4c7d719c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"); */
  background-position: center center;
}

</style>
