<template>
	<div class="create-note-wrapper">
		<input id="title" class="title" type="text" placeholder="Tytuł" v-model="note.title" autocomplete="off" />
		<textarea v-if="note.type === 'text'" class="note" type="text" placeholder="Wpisz treść..." v-model="note.content" />
		<div v-else>
			<!-- <input v-for="item in note.content" type="text" :key="item" /> -->
			<p class="list-item" v-for="item in note.content" :key="item">{{item}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CreateNote",
		props: ['note', 'active']
	}
</script>

<style lang="scss" scoped>
	.create-note-wrapper {
		position: absolute;
		top: 0;
		left: 50%;
		width: 100%;
		max-width: 1000px;
		height: calc(100% - 90px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: $black;
		border-radius: 30px;
		transform: translateX(-50%);
		animation: writeElation 0.3s ease;
	}
	.title {
		width: 90%;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
	}
	.note {
		width: 90%;
		min-height: calc(100% - 150px);
	}
	.list-item {
		text-align: center;
		font-size: 18px;
	}
</style>