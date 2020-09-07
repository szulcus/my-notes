<template>
	<div
		:style="{
			transform: active ? 'translateX(calc(-50vw + 60px))' : ''
		}"
		:class="['add-wrapper', {show: show}]"
		@mouseleave="$emit('hide-menu')"
	>
		<div
			:style="{
				transform: active ? 'scale(1)' : '',
				opacity: active ? '1' : ''
			}"
			class="add-item"
			@click="$emit('note-confirmed')"
			id="add"
		>
			<fa-icon v-if="!active" icon="plus"/>
			<fa-icon v-else icon="check"/>
		</div>
		<div v-if="!active" @click="$emit('note-created', 'text')" class="add-item">
			<fa-icon icon="pen" />
		</div>
		<div v-if="!active" @click="$emit('note-created', 'list')" class="add-item">
			<fa-icon icon="stream"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Add",
		props: [
			'active',
			'show'
		]
	}
</script>

<style lang="scss" scoped>
	.add-wrapper {
		position: fixed;
		bottom: 20px;
		right: 20px;
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
		.add-item {
			display: none;
			&:first-child {
				display: flex;
				transform: scale(1);
				opacity: 1;
			}
		}
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