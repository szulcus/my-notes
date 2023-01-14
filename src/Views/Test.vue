<template>
	<div class="test-wrapper">
		<ol>
			<li v-for="(num, index) in numbers" :key="index">{{`${Math.pow(1 + (1 / num), num)}`}}</li>
		</ol>
	</div>
</template>

<script>
	export default {
		name: "Test",
		data() {
			return {
				numbers: [...Array(300).keys()]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.test-wrapper {
		ol {
			display: grid;
			grid-template-columns: repeat(6, 1fr);
		}
	}
</style>