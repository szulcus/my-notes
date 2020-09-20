<template>
	<button :type="type" class="button-wrapper" @click="$emit('clicked', $event)">
		{{content}}
	</button>
</template>

<script>
	export default {
		name: "Button",
		props: {
			content: String,
			type: String
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.button-wrapper {
		display: none;
		position: relative;
		font-size: 20px;
		padding: 15px 20px;
		margin: 30px 0;
		background-color: transparent;
		border-radius: 30px;
		border: 2px solid var(--decorative);
		color: var(--primary);
		letter-spacing: 1px;
		transition: background-color 0.5s ease, transform 0.2s ease;
		overflow: hidden;
		outline: none;
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: var(--decorative);
			opacity: 0.5;
			filter: blur(5px);
			transform: translateX(-200px) skewX(-15deg);
			transition: all 0.7s ease;
			z-index: 2;
		}
		&:hover {
			cursor: pointer;
			background-color: var(--decorative);
			color: var(--bg);
			&::before {
				transform: translate(200px) skewX(-15deg);
				opacity: 0.6;
				transition: all 0.7s ease;
			}
		}
		&:active{
			transform: scale(0.95);
		}
		@media (min-height: 300px) {
			display: block;
		}
	}
</style>