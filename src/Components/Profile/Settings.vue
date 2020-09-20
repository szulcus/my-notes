<template>
	<div class="settings-wrapper">
		<Checkbox/>
		<router-link class="link" :to="{name: 'Home'}">Przejdź do notatek</router-link>
	</div>
</template>

<script>
	import Checkbox from '@/Components/Global/Checkbox.vue'
	export default {
		name: "Settings",
		components: {
			Checkbox
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