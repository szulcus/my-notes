<template>
	<div class="secret-wrapper">
		{{$route.params.email}}
		<button @click="logOut">wyloguj się</button>
		<div v-if="email">
			<p>{{email}}</p>
			<img :src="photoURL" alt="avatar">
		</div>
		<div v-else>...</div>
	</div>
</template>

<script>
	export default {
		name: "Secret",
		data() {
			return {
				email: '',
				photoURL: ''
			}
		},
		mounted() {
			this.$au.onAuthStateChanged(user => {
				console.log(user)
				if (user) {
					this.email = user.email,
					this.photoURL = user.photoURL
				}
			})
		},
		methods: {
			async logOut() {
				try {
					const data = await this.$au.signOut()
					console.log(data)
					this.$router.push('/login')
				}
				catch(err) {
					console.log(err)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.secret-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>