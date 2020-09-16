<template>
	<div
		:class="['add-wrapper', {hide: hide}]"
	>
		<div
			class="add-item"
			id="add"
		>
			<fa-icon icon="folder"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Folders",
		props: [
			'hide'
		]
	}
</script>

<style lang="scss" scoped>
	.add-wrapper {
		position: fixed;
		bottom: 20px;
		left: 20px;
		display: flex;
		flex-direction: column-reverse;
		color: $bg;
		z-index: 2;
		transition: transform 0.5s ease;
	}
	.hide {
		display: none;
	}
	.add-item {
		width: 50px;
		height: 50px;
		display: none;
		justify-content: center;
		align-items: center;
		background-color: $decorative;
		font-size: 20px;
		border-radius: 100%;
		margin-bottom: 10px;
		transition: all 0.2s ease;
		&:first-child {
			display: flex;
			margin-bottom: 0;
		}
		&:nth-child(2) {
			animation: bounce 0.3s ease;
		}
		&:nth-child(3) {
			animation: bounce 0.4s ease;
		}
		&:hover {
			cursor: pointer;
			transform: scale(0.95);
		}
	}
</style>