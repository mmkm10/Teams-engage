import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCz6hLaP9hBgOwh6-FWSGLvyvt8ExFVAtk",
    authDomain: "engage-29989.firebaseapp.com",
    projectId: "engage-29989",
    storageBucket: "engage-29989.appspot.com",
    messagingSenderId: "124856286279",
    appId: "1:124856286279:web:eda5c8c61117e7685e8562",
    measurementId: "G-CQ55J1R7NE"
}
firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export const myFirebase = firebase
export const myFirestore = firebase.firestore()
export const myStorage = firebase.firestore()

