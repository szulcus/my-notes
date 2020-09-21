<template>
	<div class="languages-wrapper">
		<div :class="['select', {active}]" @click="active = !active">
			<img class="flag" :src="flags[$i18n.locale]" :alt="$i18n.locale">
			{{$i18n.locale}}
		</div>
		<div class="options-container" @mouseleave="active = false">
			<div :class="['option', {selected: $i18n.locale === lang}]" v-for="(lang, index) in langs" :key="`lang${index}`" @click="(e) => setLocale(e, lang)">
				<input
					type="radio"
					class="radio"
					:id="lang"
				/>
				<label class="label" :for="lang">
					{{lang}}
				</label>
				<img class="flag" :src="flags[lang]" :alt="lang">
			</div>
		</div>
	</div>
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
		name: "Languages",
		props: {
			},
		data() {
			return {
				active: false,
				langs: ['pl', 'en', 'de', 'ru', 'fr', 'es', 'it', 'cz'],
				flags: {pl, en, de, ru, fr, es, it, cz}
			}
		},
		methods: {
			setLocale(e, locale) {
				if (this.$i18n.locale !== locale) {
					this.active = false
					this.$i18n.locale = locale
					this.$router.push({
						params: {lang: locale}
					})
					this.$emit('selected', e, locale)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.languages-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100px;
		text-transform: uppercase;
		font-weight: bold;
		letter-spacing: 1px;
		.select {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #404040;
			border-radius: 10px;
			padding: 10px 40px 10px 10px;
			cursor: pointer;
			&::after {
				position: absolute;
				top: 50%;
				right: 10px;
				content: '\f107';
				font-family: "FontAwesome";
				font-size: 20px;
				font-weight: bold;
				transform: translateY(-50%);
				transition: transform 0.4s ease;
			}
		}
		.active {
			&::after {
				transform: translateY(-50%) rotate(180deg);
			}
			& ~ .options-container {
				max-height: 220px;
				opacity: 1;
				overflow-y: scroll;
				&::-webkit-scrollbar{
					width: 0px;
				}
			}
		}
		.options-container {
			position: absolute;
			top: 45px;
			left: 0;
			width: 100%;
			max-height: 0px;
			opacity: 0;
			background: #404040;
			transition: all 0.4s ease;
			border-radius: 10px;
			overflow: hidden;
			.option {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 20px;
				transition: all 0.2s ease;
				cursor: pointer;
				&:hover {
					background-color: var(--lang-selected);
				}
				.label {
					cursor: pointer;
				}
				.radio {
					display: none;
				}
			}
			.selected {
				background-color: var(--lang-selected);
			}
		}
		.flag {
			width: 20px;
			height: 20px;
		}
	}
</style>