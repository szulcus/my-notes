<template>
	<header class="header-component">
		<div class="title-wrapper">
			<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
			<svg width="42" height="15">
				<path d="M-568.5,7.5A7.5,7.5,0,0,1-561,0a7.5,7.5,0,0,1,7.5,7.5A7.5,7.5,0,0,1-561,15,7.5,7.5,0,0,1-568.5,7.5Zm18,0a5.25,5.25,0,0,1,5.25-5.25A5.25,5.25,0,0,1-540,7.5a5.25,5.25,0,0,1-5.25,5.25A5.25,5.25,0,0,1-550.5,7.5Zm-31.5,0a5.25,5.25,0,0,1,5.25-5.25A5.25,5.25,0,0,1-571.5,7.5a5.25,5.25,0,0,1-5.25,5.25A5.25,5.25,0,0,1-582,7.5Z" transform="translate(582)" fill="var(--decorative)"/>
			</svg>
		</div>
		<div class="menu">
			<Languages @selected="$emit('notes-updated')"/>
			<router-link v-if="!auth.loggedIn" :to="{name: 'Login'}" class="link sign-in">
				<fa-icon icon="sign-in-alt" />
			</router-link>
			<div v-else class="logged">
				<div class="nick">{{auth.nick}} lorem lorem</div>
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
	import logo from '@/Assets/Images/logo/120x120.png'

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
				active: false,
				logo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-component {
		width: 100%;
		max-width: 900px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		margin-bottom: 10px;
		.title-wrapper {
			display: flex;
			align-items: center;
			border-radius: 30px;
			padding: 5px;
			@media (min-width: 550px) {
				padding: 15px 20px;
			}
			.title {
				display: none;
				text-align: center;
				font-size: 40px;
				margin: 0 15px 0 0;
				.title-letter {
					color: var(--decorative);
				}
				@media (min-width: 550px) {
					display: block;
				}
			}
		}
		.menu {
			display: flex;
			align-items: center;
			z-index: 2;
			.logged {
				display: flex;
				align-items: center;
				.nick {
					display: none;
					max-width: 120px;
					margin-left: 15px;
					font-size: 18px;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					&::first-letter {
						color: var(--decorative);
					}
					@media (min-width: 650px) {
						display: block;
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
				margin-left: 10px;
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