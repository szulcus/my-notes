<template>
	<div class="login-wrapper">
		<Form
			type="login"
			:error="error"
			@submited="login"
		/>
	</div>
</template>

<script>
	import Form from '@/Components/Login/Form.vue'
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
			async login(email, password) {
				try {
					const user = this.$au.signInWithEmailAndPassword(email, password)
					console.log(user)
				}
				catch(err) {
					this.error = err
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-wrapper {
		width: 100%;
		height: 100%;
	}
</style>