<template>
	<div
		:style="{
			transform: active ? 'translateX(calc(-50vw + 60px))' : ''
		}"
		:class="['add-wrapper', {show: show, hide: hide}]"
	>
		<div
			:style="{
				transform: active ? 'scale(1)' : '',
				opacity: active ? '1' : ''
			}"
			class="add-item"
			id="add"
		>
			<fa-icon icon="folder"/>
		</div>
		<div v-if="!active" class="add-item">
			<fa-icon icon="save" />
		</div>
		<div v-if="!active" class="add-item">
			<fa-icon icon="trash"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Folders",
		props: [
			'show',
			'hide',
			'active'
		],
		methods: {
		}
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
	.show {
		.add-item {
			display: flex;
			&:first-child {
				transform: scale(0.7);
				opacity: 0.5;
			}
		}
	}
	.hide {
		opacity: 0;
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