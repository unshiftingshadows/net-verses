import * as functions from 'firebase-functions';
const axios = require('axios')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const newVerse = functions.https.onCall((data, context) => {
  return axios.get('http://labs.bible.org/api/?passage=votd&formatting=plain&type=json').then((res: any) => {
    console.log('res', res.data)
    const pass = res.data[0]
    const text = pass.text
    const ref = `${pass.bookname} ${pass.chapter}:${pass.verse}`
    return {
      text,
      ref,
      res: res.data
    }
  })
})
