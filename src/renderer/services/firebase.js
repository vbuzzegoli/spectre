const admin = require('firebase-admin')

let database
try {
  const serviceAccount = require('../../../../certs/serviceAccountKey.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://spectre-50d44.firebaseio.com'
  })
  database = admin.firestore()
} catch (err) {
  console.error('[FIREBASE] Could not properly initialize the database interface. Missing Credentials or Incompatible Node Version.', err)
}

export default {
  admin,
  database
}
