<template>
	<div>
		<div
			:style="{
				transform: active ? 'translateX(calc(-50vw + 48px))' : ''
			}"
			:class="['menu-wrapper', 'add', {show: showAdd}]"
			@mouseleave="$emit('hidden-menu', 'add')"
		>
			<div
				:style="{
					transform: active ? 'scale(1)' : '',
					opacity: active ? '1' : ''
				}"
				class="add-item"
				@click="active ? $emit('note-confirmed') : $emit('showed-menu', 'add')"
				id="add"
			>
				<fa-icon v-if="!active" icon="plus"/>
				<fa-icon v-else icon="check"/>
			</div>
			<div @click="$emit('note-created', {title: '', content: '', active: true})" class="add-item">
				<fa-icon icon="pen" />
			</div>
			<div @click="$emit('note-created', {title: '', content: [], active: true})" class="add-item">
				<fa-icon icon="stream"/>
			</div>
		</div>
		<fragment v-if="activeFolder === 'deleted'">
			<div
				class="move"
				:style="{display: active ? 'flex' : 'none'}"
				@click="$emit('note-moved', 'main')"
			>
				<fa-icon icon="home" />
			</div>
			<div
				class="move"
				:style="{display: active ? 'flex' : 'none'}"
				@click="$emit('note-deleted')"
			>
				<fa-icon icon="eraser" />
			</div>
		</fragment>
		<fragment v-else>
			<div
				class="move"
				v-for="(folder, index) in Object.keys(icons).filter(folder => folder !== activeFolder)"
				:key="index"
				:style="{display: active ? 'flex' : 'none'}"
				@click="$emit('note-moved', folder)"
			>
				<fa-icon :icon="icons[folder]" />
			</div>
		</fragment>
		<div
			:style="{
				display: active ? 'none' : 'flex'
			}"
			:class="['menu-wrapper', 'folders', {show: showFolders}]"
			@mouseleave="$emit('hidden-menu', 'folders')"
		>
			<div
				:style="{
					transform: active ? 'scale(1)' : '',
					opacity: active ? '1' : ''
				}"
				class="add-item"
				@click="$emit('showed-menu', 'folders')"
				id="add"
			>
				<fa-icon :icon="icons[activeFolder]"/>
			</div>
			<div
				v-for="(folder, index) in Object.keys(icons).filter(folder => folder !== activeFolder)"
				:key="index"
				class="add-item"
				@click="$emit('entered-folder', folder)">
				<fa-icon :icon="icons[folder]"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Menu",
		props: {
			activeFolder: String,
			active: Boolean,
			showAdd: Boolean,
			showFolders: Boolean
		},
		data() {
			return {
				icons: {
					main: 'home',
					archived: 'download',
					deleted: 'trash'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-wrapper {
		position: fixed;
		bottom: 20px;
		display: flex;
		flex-direction: column-reverse;
		color: var(--bg);
		z-index: 2;
		transition: transform 0.5s ease;
		animation: bounce 0.3s ease;
	}
	.add {
		right: 20px;
	}
	.folders {
		left: 20px;
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
	.add-item {
		width: 50px;
		height: 50px;
		display: none;
		justify-content: center;
		align-items: center;
		background-color: var(--decorative);
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
	.move {
		position: fixed;
		left: calc(50vw - 15px - 60px);
		bottom: 27px;
		width: 36px;
		height: 36px;
		display: none;
		justify-content: center;
		align-items: center;
		background-color: var(--decorative);
		border-radius: 100%;
		color: var(--bg);
		animation: bounce 0.3s 0.5s both;
		&:nth-child(2) {
			left: calc(50vw - 15px + 60px);
		}
	}
</style>