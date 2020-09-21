<template>
	<div class="create-note-wrapper">
		<input id="title" class="title" type="text" placeholder="Tytuł" v-model="note.title" autocomplete="off" />
		<textarea v-if="typeof(note.content) === 'string'" class="text-note" type="text" placeholder="Wpisz treść..." v-model="note.content" />
		<div class="list-note" v-else>
			<div id="list" class="list">
				<div class="list-item" @load="scrollToLast" v-for="(item, index) in note.content" :key="index">
					<fragment v-if="item.content">
						<Checkbox :checked="item.complete" @clicked="$emit('item-completed', index)" />
						<div class="list-item-edit-wrapper">
							<div
								contenteditable="true"
								:class="['list-item-content', {complete: item.complete}]"
								@keypress.enter="(e) => e.preventDefault()"
								@focusout="$emit('content-edited', $event.target.innerText, index)"
							>
								{{item.content}}
							</div>
							<fa-icon @mousedown="$emit('item-deleted', index)" class="bin" icon="times" />
						</div>
					</fragment>
				</div>
			</div>
			<input
				id="list-input"
				class="list-input"
				type="text"
				autocomplete="off"
				:placeholder="`Dodaj ${note.content.length + 1} element...`"
				@keyup.enter="$emit('added-to-list', $event.target.value)"
			/>
		</div>
	</div>
</template>

<script>
	import Checkbox from '@/Components/Global/Checkbox.vue'
	export default {
		name: "CreateNote",
		components: {
			Checkbox
		},
		props: {
			note: Object
		},
		methods: {
			scrollToLast() {
				console.log('test')
				const listElement = document.getElementById('list')
				if (listElement && listElement.children[listElement.children.length - 1]) {
					listElement.children[listElement.children.length - 1].scrollIntoView({behavior: 'smooth'})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.create-note-wrapper {
		position: absolute;
		top: 10px;
		left: 50%;
		width: 100%;
		max-width: 1000px;
		height: calc(100% - 100px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--strong);
		border-radius: 30px;
		transform: translateX(-50%);
		animation: writeElation 0.3s ease;
		z-index: 2;
	}
	.title {
		width: 90%;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
	}
	.text-note {
		width: 90%;
		height: calc(100% - 150px);
	}
	.list-note {
		width: 100%;
		height: calc(100% - 150px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.list {
			width: 100%;
			max-width: 500px;
			height: calc(100% - 78px);
			overflow-y: scroll;
			padding: 0 50px;
			&::-webkit-scrollbar {
				width: 0;
			}
		}
		.list-item {
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 18px;
			margin: 10px 0;
			animation: opacity 0.3s ease;
			/* .custom-checkbox {
				display: block;
				min-width: 25px;
				height: 25px;
				margin-right: 10px;
				cursor: pointer;
				.checkmark {
					position: relative;
					width: 100%;
					height: 100%;
					border: 2px solid var(--decorative);
					display: inline-block;
					border-radius: 5px;
					transition: all 0.2s ease;
					&::before {
						content: '\f00c';
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%) scale(0.5) rotate(50deg);
						font-family: "FontAwesome";
						color: var(--strong);
						opacity: 0;
						transition: all 0.2s 0.1s ease;
					}
				}
				input {
					display: none;
					&:checked {
						& + .checkmark {
							background-color: var(--decorative);
							&::before {
								transform: translate(-50%, -50%) scale(1) rotate(0);
								opacity: 1;
							}
						}
					}
				}
			} */
			.complete {
				opacity: 0.5;
				text-decoration: line-through;
			}
		}
		.list-item-edit-wrapper {
			position: relative;
			.list-item-content {
				padding: 7px 7px 5px 0px;
				transition: all 0.2s ease;
				border-radius: 5px;
				outline: none;
				+ .bin {
					display: none;
					position: absolute;
					top: 50%;
					right: -20px;
					color: var(--decorative);
					transform: translateY(-50%);
					animation: opacity 0.3s 0.1s both;
					cursor: pointer;
				}
				&:focus {
					background: var(--bg);
					padding: 7px 7px 5px 7px;
					+ .bin {
						display: block;
					}
				}
			}
		}
	}
</style>