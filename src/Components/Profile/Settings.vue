<template>
	<div class="settings-wrapper">
		<Checkbox v-if="false" />
		<h2>Motywy</h2>
		<div class="themes">
			<div class="theme" v-for="(theme, index) in themes" :key="index">
				<img class="preview-img" :src="theme" alt="">
			</div>
		</div>
		<h2>Linie</h2>
		<div class="themes">
			<div class="theme" v-for="(border, index) in noteBorders" :key="index">
				<img class="preview-img" :src="border" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	// COMPONENTS
	import Checkbox from '@/Components/Global/Checkbox.vue'
	// IMAGES
		// THEMES
		import defaultTheme from '@/Assets/Images/themes/default.png'
		import fortuneTheme from '@/Assets/Images/themes/fortune.png'
		import happinesTheme from '@/Assets/Images/themes/happines.png'
		import amazingTheme from '@/Assets/Images/themes/amazing.png'
		import dreamsTheme from '@/Assets/Images/themes/dreams.png'
		// BORDERS
		import notImportantBorder from '@/Assets/Images/note-borders/not-important.png'
		import necessaryBorder from '@/Assets/Images/note-borders/necessary.png'
		import powerfulBorder from '@/Assets/Images/note-borders/powerful.png'
		import importantBorder from '@/Assets/Images/note-borders/important.png'
		import ordinaryBorder from '@/Assets/Images/note-borders/ordinary.png'

	export default {
		name: "Settings",
		components: {
			Checkbox
		},
		data() {
			return {
				themes: [
					defaultTheme,
					fortuneTheme,
					happinesTheme,
					amazingTheme,
					dreamsTheme
				],
				noteBorders: [
					notImportantBorder,
					necessaryBorder,
					powerfulBorder,
					importantBorder,
					ordinaryBorder
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.settings-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		.preview-img {
			width: 50px;
			height: 50px;
			transition: all 0.1s ease;
			cursor: pointer;
			&:hover {
				transform: scale(1.1);
			}
		}
		.themes {
			display: flex;
			.theme {
				display: flex;
				align-items: center;
				margin: 0 10px;
			}
		}
		.link {
			color: var(--primary);
			text-decoration: none;
			font-size: 18px;
			@media (hover: hover) {
				transition: all 0.2s ease;
				&:hover {
					opacity: 0.7;
				}
			}
		}
	}
</style>