<template>
	<header class="title-wrapper">
		<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
		<div class="menu">
			<ul class="locales">
				<div>
					<fragment
						v-for="(lang, i) in langs"
						:key="`Lang${i}`"
					>
						<li
							class="locales-item"
							@click.prevent="setLocale(lang)"
							v-if="lang === $i18n.locale"
						>
							{{lang}}
							<img class="flag" :src="flags[lang]" alt="">
							<fa-icon class="locales-arrow" icon="angle-down" />
						</li>
					</fragment>
				</div>
				<img class="flag" :src="flags['en']" alt="">
			</ul>
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
	import pl from '@/Assets/Images/flags/pl.svg'
	import en from '@/Assets/Images/flags/en.svg'
	import de from '@/Assets/Images/flags/de.svg'
	import ru from '@/Assets/Images/flags/ru.svg'
	import fr from '@/Assets/Images/flags/fr.svg'
	import es from '@/Assets/Images/flags/es.svg'
	import it from '@/Assets/Images/flags/it.svg'
	import cz from '@/Assets/Images/flags/cz.svg'

	export default {
		name: "Title",
		props: {
			auth: Object
		},
		data() {
			return {
				langs: ['pl', 'en'],
				flags: {
					pl,
					en,
					de,
					ru,
					fr,
					es,
					it,
					cz
				}
			}
		},
		methods: {
			setLocale(locale) {
				this.$i18n.locale = locale
				this.$router.push({
					params: {lang: locale}
				})
			},
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
			.flag {
					width: 20px;
					height: 20px;
				}
			.locales {
				width: 100px;
				height: 50px;
				display: flex;
				flex-direction: column;
				align-items: center;
				/* justify-content: center; */
				/* justify-content: space-evenly; */
				align-items: center;
				margin: 0 10px 0 0;
				padding: 0;
				border: 3px solid var(--secondary);
				border-radius: 50px;
				list-style: none;
				.locales-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					background-color: transparent;
					color: var(--primary);
					padding: 0;
					font-size: 15px;
					font-weight: bold;
					text-transform: uppercase;
					transition: all 0.2s ease;
				}
			}
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