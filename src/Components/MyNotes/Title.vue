<template>
	<header class="title-wrapper">
		<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
		<router-link v-if="!auth.loggedIn" to="/login" class="link sign-in">
			<fa-icon icon="sign-in-alt" />
		</router-link>
		<router-link
			:to="`/users/${auth.email}`"
			v-else class="link log-in"
			:style="{backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/mynotes-36c73.appspot.com/o/man.png?alt=media&token=628c901f-eea0-456b-b16a-9f32005c0338)`}" />
	</header>
</template>

<script>
	export default {
		name: "Title",
		props: {
			auth: Object
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title-wrapper {
		width: 100%;
		max-width: 900px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		.title {
			text-align: center;
			font-size: 40px;
			margin: 20px 0;
		}
		.title-letter {
			color: $decorative;
		}
		.link {
			width: 50px;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $decorative;
			font-size: 20px;
			border-radius: 50%;
		}
		.sign-in {
			border: 3px solid $secondary;
			@media (hover: hover) {
				transition: all 0.2s ease;
				cursor: pointer;
				&:hover {
					color: $bg;
					background-color: $decorative;
					border: 3px solid $decorative;
				}
			}
		}
		.log-in {
			background: center center no-repeat;
			background-size: cover;
		}
	}
</style>