<template>
	<div class="profile-wrapper">
		<fragment v-if="loggedIn === undefined">...</fragment>
		<fragment v-else-if="loggedIn === true">
			<Header
				:src="photoURL"
				:content="nick"
			/>
			<Settings />
			<div class="buttons">
				<Button content="Strona główna" @clicked="logOut" />
				<Button content="Wyloguj się" @clicked="logOut" />
			</div>
		</fragment>
		<fragment v-else-if="loggedIn === false">
			Nie jesteś zalogowany!
			<Button content="Zaloguj się" @clicked="$router.push('/login')" />
		</fragment>
	</div>
</template>

<script>
	import Header from '@/Components/Profile/Header.vue'
	import Settings from '@/Components/Profile/Settings.vue'
	import Button from '@/Components/Global/Button.vue'
	export default {
		name: "Profile",
		components: {
			Header,
			Settings,
			Button
		},
		data() {
			return {
				loggedIn: undefined,
				email: '',
				photoURL: '',
				nick: ''
			}
		},
		mounted() {
			this.$au.onAuthStateChanged(user => {
				console.log(user)
				if (user) {
					this.loggedIn = true
					this.email = user.email,
					this.photoURL = user.photoURL
					this.nick = user.displayName
				}
				else {
					this.loggedIn = false
				}
			})
		},
		methods: {
			async logOut() {
				try {
					const data = await this.$au.signOut()
					console.log(data)
					this.$router.push({name: 'Login'})
				}
				catch(err) {
					console.log(err)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		.buttons {
			display: flex;
		}
	}
</style>