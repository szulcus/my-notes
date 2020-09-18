<template>
	<div :class="['notes-wrapper', {hide: show}]">
		<div
			class="note"
			v-for="note in notes"
			:key="note.id"
			@click="() => $emit('note-showed', {title: note.title, content: note.content, createdAt: note.createdAt, active: true})"
		>
			<h3
				v-if="note.title"
				class="title"
				:class="{same: !note.content}"
			>
				{{note.title}}
			</h3>
			<p
				class="text"
				:class="{same: !note.title}"
			>
				<span v-if="note.content && typeof(note.content) === 'string'">{{note.content}}</span>
				<ul v-else class="list">
					<li class="list-item" v-for="(item, index) in note.content" :key="index">{{item.content}}</li>
				</ul>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Notes",
		props: {
			notes: Array,
			show: Boolean
		}
	}
</script>

<style lang="scss" scoped>
	.notes-wrapper {
		width: 100%;
		max-width: 1000px;
		display: grid;
		grid-template-columns: repeat(2, calc(50% - 5px));
		grid-gap: 10px;
		margin: 10px auto;
		max-height: calc(100vh - 200px);
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 0;
		}
	}
	.hide {
		display: none;
	}
	.note {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 2px solid $secondary;
		border-radius: 10px;
		padding: 10px;
		@media (hover: hover) {
			transition: all 0.2s ease;
			&:hover {
				cursor: pointer;
				transform: scale(0.99)
			}
			&:hover .text .delete {
				display: block;
			}
		}
	}
	.title {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 10px 0;
	}
	.text {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin: 10px 0;
	}
	.same {
		-webkit-line-clamp: 5;
	}
	.list {
		margin: 0;
		padding-left: 20px;
		list-style-type: disc;
	}
</style>