<template>
	<div class="home">
		<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
		<Notes :notes="notes" @note-showed="showNote" />
		<Folders
			:show="foldersDisplayed"
			:hide="foldersHidden"
		/>
		<Menu
			:active="active"
			:show="menuDisplayed"
			@note-created="showTools"
			@note-confirmed="confirm"
			@hide-menu="hideMenu"
		/>
		<CreateNote :style="{display: active ? 'flex' : 'none'}" :note="note" :active="active" />
	</div>
</template>

<script>
import Notes from '@/Components/Notes.vue'
import Folders from '@/Components/Folders.vue'
import Menu from '@/Components/Menu.vue'
import CreateNote from '@/Components/CreateNote.vue'

export default {
	name: 'Home',
	components: {
		Menu,
		Folders,
		CreateNote,
		Notes
	},
	data() {
		return {
			note: {
				title: '',
				content: 'content',
				type: 'text'
			},
			menuDisplayed: false,
			foldersDisplayed: false,
			foldersHidden: false,
			active: '',
			isEdited: true,
			notes: [
				{
					title: "Zrobić zakupy",
					content: 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet amet lorem ipsum dolor sit amet amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet amet ',
					createdAt: 1,
					type: 'text'
				},
				{
					title: "Odrobić lekcje",
					content: 'lorem ipsum dolor sit amet',
					createdAt: 2,
					type: 'text'
				},
				{
					title: "Przygotować się do sprawdzianu",
					content: 'lorem ipsum dolor sit amet',
					createdAt: 3,
					type: 'text'
				},
				{
					title: "",
					content: 'lorem ipsum dolor sit amet',
					createdAt: 4,
					type: 'text'
				},
				{
					title: "Przygotować się do sprawdzianu",
					content: '',
					createdAt: 5,
					type: 'text'
				},
				{
					title: "Przygotować się do sprawdzianu",
					content: 'lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
					createdAt: 6,
					type: 'text'
				},
				{
					title: "Przygotować się do sprawdzianuPrzygotować się do sprawdzianu",
					content: ['ziemniaki', 'kasza gryczana', 'ryż', 'ciecierzyca', 'banany'],
					createdAt: 7,
					type: 'list'
				}
			]
		}
	},
	methods: {
		showTools(type) {
			this.active = type
			this.foldersHidden = true
		},
		confirm() {
			this.active = false
			if(!this.isEdited) {
				if (this.note.title || this.note.content) {
					console.log('-FIREBASE- dodaję notatkę...')
					this.notes.push({
						title: this.note.title,
						content: this.note.content
					})
				}
				this.isEdited = true
			}
			else {
				this.isEdited = false
			}
			this.menuDisplayed = false
			this.foldersHidden = false
			this.note = {
				title: '',
				content: '',
				type: this.active
			}
		},
		showNote(note) {
			this.foldersHidden = true
			this.isEdited = true
			this.note = note
			this.active = true
		},
		hideMenu() {
			this.menuDisplayed = false
			this.isEdited = true
		}
	}
}
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		font-size: 40px;
		margin: 20px 0;
	}
	.title-letter {
		color: $decorative;
	}
	.logo {
		opacity: 0.5;
	}
</style>
