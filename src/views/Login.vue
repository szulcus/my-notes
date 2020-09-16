<template>
	<div class="login-wrapper">
		<header class="title">
			Logowanie
		</header>
		<Form />
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
				data: 'daata'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		display: none;
		margin: 20px 0;
		font-size: 30px;
		font-weight: bold;
		letter-spacing: 1px;
		&::first-letter {
			color: $decorative;
		}
		@media (min-height: 350px) {
			display: block;
		}
	}
	.login-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>