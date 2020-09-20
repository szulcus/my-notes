<template>
	<div class="login-wrapper">
		<Form
			type="register"
			:error="error"
			@submited="signUp"
		/>
	</div>
</template>

<script>
	import Form from '@/Components/Login/Form.vue'
	import notes from '@/Assets/Json/notes.json'

	export default {
		name: "Login",
		components: {
			Form
		},
		data() {
			return {
				error: {}
			}
		},
		methods: {
			async signUp(nick, email, password, gender) {
				if (gender) {
					try {
						this.$au.createUserWithEmailAndPassword(email, password).then(data => {
							const date = new Date().getTime()
							const notesObj = JSON.stringify(notes).replace(/\[time1\]/g, date).replace(/\[time2\]/g, date + 1)
							this.$db.collection('users').doc(data.user.email).set({
								info: {
									email: data.user.email,
									uid: data.user.uid,
									nick,
									gender
								},
								notes: JSON.parse(notesObj)
							}).then(() => {
								const user = this.$au.currentUser;
								user.updateProfile({
									displayName: nick,
									photoURL: gender === 'male' ? (
										'https://firebasestorage.googleapis.com/v0/b/mynotes-36c73.appspot.com/o/man.png?alt=media&token=628c901f-eea0-456b-b16a-9f32005c0338'
									) : (
										'https://firebasestorage.googleapis.com/v0/b/mynotes-36c73.appspot.com/o/female.png?alt=media&token=fd0044b4-a6d0-476d-93b6-bd3975bfaf97'
									)
								}).catch(err => {
									console.log(err)
								});
								this.$router.push('/')
							})
						}).catch(err => {
							this.error = err
						})
					}
					catch(err) {
						console.log(err)
					}
				}
				else {
					alert('Najpierw wybierz płeć!')
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.login-wrapper {
		width: 100%;
		height: 100%;
	}
</style>