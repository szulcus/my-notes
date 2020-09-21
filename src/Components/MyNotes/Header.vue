<template>
	<header class="title-wrapper">
		<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
		<div class="menu">
			<Languages @selected="$emit('notes-updated')"/>
			<router-link v-if="!auth.loggedIn" :to="{name: 'Login'}" class="link sign-in">
				<fa-icon icon="sign-in-alt" />
			</router-link>
			<div v-else class="logged">
				<div class="nick">{{auth.nick}}</div>
				<router-link
					:to="{name: 'Profile'}"
					class="link log-in"
					:style="{backgroundImage: `url(${auth.photoURL})`}"
				/>
			</div>
		</div>
	</header>
</template>

<script>
	import Languages from '@/Components/Global/Languages'

	export default {
		name: "Header",
		components: {
			Languages
		},
		props: {
			auth: Object,
		},
		data() {
			return {
				active: false
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
			color: var(--decorative);
		}
		.menu {
			display: flex;
			align-items: center;
			z-index: 2;
			.logged {
				display: flex;
				align-items: center;
				.nick {
					max-width: 200px;
					font-size: 18px;
					font-weight: bold;
					margin-right: 10px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					&::first-letter {
						color: var(--decorative);
					}
				}
			}
			.link {
				width: 50px;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: var(--decorative);
				font-size: 20px;
				border-radius: 50%;
			}
			.sign-in {
				border: 3px solid var(--secondary);
				@media (hover: hover) {
					transition: all 0.2s ease;
					cursor: pointer;
					&:hover {
						color: var(--bg);
						background-color: var(--decorative);
						border: 3px solid var(--decorative);
					}
				}
			}
			.log-in {
				background: center center no-repeat;
				background-size: cover;
			}
		}
	}
</style>