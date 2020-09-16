<template>
	<div class="home">
		<h1 class="title"><span class="title-letter">M</span>y<span class="title-letter">N</span>otes</h1>
		<Notes
			:notes="notes"
			:show="note.type"
			@note-showed="showNote"
		/>
		<Menu
			:active="note.type"
			:showAdd="showAddMenu"
			:showFolders="showFoldersMenu"
			:activeFolder="activeFolder"
			@hidden-menu="hideMenu"
			@showed-menu="showMenu"
			@note-created="showNote"
			@note-confirmed="confirm"
			@note-moved="moveNote"
			@note-deleted="deleteNote"
			@entered-folder="goTo"
		/>
		<CreateNote
			:style="{display: note.type ? 'flex' : 'none'}"
			:note="note"
			@added-to-list="addToList"
			@item-completed="addCompleteItem"
			@content-edited="editListItem"
			@item-deleted="deleteItem"
		/>
	</div>
</template>

<script>
import Notes from '@/Components/MyNotes/Notes.vue'
import Menu from '@/Components/MyNotes/Menu.vue'
import CreateNote from '@/Components/MyNotes/CreateNote.vue'

export default {
	name: 'Home',
	components: {
		Menu,
		CreateNote,
		Notes
	},
	data() {
		return {
			note: {
				title: '',
				content: '',
				type: ''
			},
			action: '',
			type: '',
			showAddMenu: false,
			showFoldersMenu: false,
			notes: [],
			constNotes: {},
			activeFolder: 'main'
		}
	},
	mounted() {
		this.$db.collection('users').doc('Szulcuś').onSnapshot((snap) => {
			const notesData = snap.data().notes[this.activeFolder]
			const notes = []
			Object.keys(notesData).sort().forEach((key) => notes.push(notesData[key]))
			this.notes = notes
			this.constNotes = notesData
		})
	},
	methods: {
		confirm() {
			if (this.note.title || this.note.content.length !== 0) {
				if (this.note.createdAt && JSON.stringify(this.note) === JSON.stringify(this.constNotes[this.note.createdAt])) {
					const sec = this.note.createdAt
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${this.activeFolder}.${sec}`]: this.note
					})
				}
				else {
					const sec = Math.round(new Date().getTime())
					this.note.createdAt = new Date().getTime()
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${this.activeFolder}.${sec}`]: this.note
					})
				}
			}
			this.showAddMenu = false
			this.note = {
				title: '',
				content: '',
				type: this.type
			}
		},
		moveNote(folder) {
			if (this.note.title || this.note.content.length !== 0) {
				if (this.note.createdAt && JSON.stringify(this.note) === JSON.stringify(this.constNotes[this.note.createdAt])) {
					const sec = this.note.createdAt
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${folder}.${sec}`]: this.note
					})
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${this.activeFolder}.${sec}`]: this.$firebase.firestore.FieldValue.delete()
					})
				}
				else {
					const sec = Math.round(new Date().getTime())
					this.note.createdAt = new Date().getTime()
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${folder}.${sec}`]: this.note
					})
				}
				this.note = {
					title: '',
					content: '',
					type: ''
				}
			}
		},
		deleteNote() {
			if (this.note.title || this.note.content.length !== 0) {
				if (this.note.createdAt && JSON.stringify(this.note) === JSON.stringify(this.constNotes[this.note.createdAt])) {
					const sec = this.note.createdAt
					this.$db.collection('users').doc('Szulcuś').update({
						[`notes.${this.activeFolder}.${sec}`]: this.$firebase.firestore.FieldValue.delete()
					})
				}
				this.note = {
					title: '',
					content: '',
					type: ''
				}
			}
		},
		showNote(note) {
			this.note = note
		},
		showMenu(type) {
			this[`show${type[0].toUpperCase() + type.slice(1)}Menu`] = true
		},
		hideMenu(type) {
			this[`show${type[0].toUpperCase() + type.slice(1)}Menu`] = false
		},
		addToList(value) {
			if (value) {
				this.note.content.push({
					content: value,
					complete: false
				})
				document.getElementById('list-input').value = ''
			}
		},
		editListItem(text, index) {
			// console.log(text, index)
			if (text) {
				this.note.content[index].content = text
			}
		},
		addCompleteItem(index) {
			this.note.content[index].complete = !this.note.content[index].complete
		},
		deleteItem(index) {
			console.log('coś', index)
			this.$delete(this.note.content, index)
		},
		goTo(folder) {
			this.activeFolder = folder
			this.$db.collection('users').doc('Szulcuś').onSnapshot((snap) => {
				const notesData = snap.data().notes[this.activeFolder]
				const notes = []
				Object.keys(notesData).sort().forEach((key) => notes.push(notesData[key]))
				this.notes = notes
				this.constNotes = notesData
			})
			this.hideMenu('folders')
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
