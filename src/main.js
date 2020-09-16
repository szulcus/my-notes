import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/Config/FaIcons.js'
import '@/Styles/Global.scss'
import '@/Config/Firebase'
import '@/Config/Fragment'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
