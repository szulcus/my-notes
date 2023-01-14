import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/functions'
import 'firebase/storage'

const config = {
	apiKey: "AIzaSyAR-duWiLkM6jOFep6bF0AUGZkDWkdoPEg",
	authDomain: "mynotes-36c73.firebaseapp.com",
	databaseURL: "https://mynotes-36c73.firebaseio.com",
	projectId: "mynotes-36c73",
	storageBucket: "mynotes-36c73.appspot.com",
	messagingSenderId: "168383913770",
	appId: "1:168383913770:web:2d902848eb45e234128853",
	measurementId: "G-Q445ZJWC45"
};

firebase.initializeApp(config);
firebase.firestore().settings({});

Vue.prototype.$firebase = firebase;
Vue.prototype.$db = firebase.firestore();
Vue.prototype.$au = firebase.auth();
Vue.prototype.$auth = firebase.auth;
Vue.prototype.$fu = firebase.functions();
Vue.prototype.$st = firebase.storage();

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		firebase.firestore().collection('users').doc(user.email).get().then(snap => {
			const colors = Object.entries(snap.data().config.colors)
			colors.forEach(color => {
				document.documentElement.style.setProperty(`--${color[0]}`, color[1]);
			})
		})
	}
	else {
		const colors = [
			['bg', '#202020'],
			['decorative', 'limegreen'],
			['primary', 'lightgray'],
			['secondary', 'gray'],
			['weak', 'white'],
			['strong', 'black'],
			['wrong', 'tomato'],
			['correct', 'limegreen'],
		]
		colors.forEach(color => {
			document.documentElement.style.setProperty(`--${color[0]}`, color[1]);
		})
	}
})
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		Vue.prototype.$user = user;
	}
})