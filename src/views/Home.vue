<template>
	<div class="home-wrapper">
		<Title
			:auth="auth"
		/>
		<Notes
			:notes="notes"
			:show="note.active"
			@note-showed="showNote"
		/>
		<Menu
			:active="note.active"
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
			:style="{display: note.active ? 'flex' : 'none'}"
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
import Title from '@/Components/MyNotes/Title.vue'
import Menu from '@/Components/MyNotes/Menu.vue'
import CreateNote from '@/Components/MyNotes/CreateNote.vue'
import notes from '@/Assets/Json/notes.json'

export default {
	name: 'Home',
	components: {
		Title,
		Menu,
		CreateNote,
		Notes
	},
	data() {
		return {
			allNotes: {},
			note: {
				title: '',
				content: '',
				active: false
			},
			auth: {
				loggedIn: false,
				photoUrl: '',
				email: ''
			},
			action: '',
			showAddMenu: false,
			showFoldersMenu: false,
			notes: [],
			constNotes: {},
			activeFolder: 'main'
		}
	},
	mounted() {
		this.$au.onAuthStateChanged(user => {
			if (user) {
				console.log('logged in', user)
				const {photoURL} = user
				this.auth = {
					loggedIn: true,
					email: user.email,
					photoURL
				}
				this.$db.collection('users').doc(user.email).onSnapshot(snap => {
					const originalNotes = snap.data().notes[this.activeFolder]
					const notesArray = []

					Object.keys(snap.data().notes[this.activeFolder]).sort().forEach(key => {
						notesArray.push(originalNotes[key])
					})
					this.notes = notesArray
					this.constNotes = originalNotes
				})
			}
			else {
				console.log('not logged in')
				const date = new Date().getTime()
				this.allNotes = JSON.parse(JSON.stringify(notes).replace(/\[time1\]/g, date).replace(/\[time2\]/g, date + 1))

				const originalNotes = this.allNotes[this.activeFolder]
				const notesArray = []
				Object.keys(this.allNotes[this.activeFolder]).sort().forEach(key => {
					notesArray.push(originalNotes[key])
				})
				this.notes = notesArray
				this.constNotes = originalNotes
			}
		})
	},
	methods: {
		confirm() {
			console.log('confirm')
			if (this.note.title || this.note.content.length !== 0) {
					if (this.note.createdAt && this.note.createdAt === this.constNotes[this.note.createdAt].createdAt) {
						const sec = this.note.createdAt
						if (this.auth.loggetIn) {
							this.$db.collection('users').doc(this.auth.email).update({
								[`notes.${this.activeFolder}.${sec}`]: this.note
							})
						}
						else {
							this.allNotes[this.activeFolder][sec] = this.note
							const originalNotes = this.allNotes[this.activeFolder]
							const notesArray = []
							Object.keys(this.allNotes[this.activeFolder]).sort().forEach(key => {
								notesArray.push(originalNotes[key])
							})
							this.notes = notesArray
							this.constNotes = originalNotes
						}
					}
					else {
						const sec = Math.round(new Date().getTime()).toString()
						this.note.createdAt = sec
						if (this.auth.loggetIn) {
							this.$db.collection('users').doc(this.auth.email).update({
								[`notes.${this.activeFolder}.${sec}`]: this.note
							})
						}
						else {
							this.allNotes[this.activeFolder][sec] = this.note
							const originalNotes = this.allNotes[this.activeFolder]
							const notesArray = []
							Object.keys(this.allNotes[this.activeFolder]).sort().forEach(key => {
								notesArray.push(originalNotes[key])
							})
							this.notes = notesArray
							this.constNotes = originalNotes
						}
					}
			}
			this.showAddMenu = false
			this.note = {
				title: '',
				content: '',
				active: false
			}
		},
		moveNote(folder) {
			if (this.note.title || this.note.content.length !== 0) {
				this.$delete(this.note, 'active')
				console.log(this.note.createdAt === this.constNotes[this.note.createdAt].createdAt)
				if (this.note.createdAt && this.note.createdAt === this.constNotes[this.note.createdAt].createdAt) {
					const sec = this.note.createdAt
					this.$db.collection('users').doc(this.auth.email).update({
						[`notes.${folder}.${sec}`]: this.note
					})
					this.$db.collection('users').doc(this.auth.email).update({
						[`notes.${this.activeFolder}.${sec}`]: this.$firebase.firestore.FieldValue.delete()
					})
				}
				else {
					const sec = Math.round(new Date().getTime()).toString()
					this.note.createdAt = sec
					this.$db.collection('users').doc(this.auth.email).update({
						[`notes.${folder}.${sec}`]: this.note
					})
				}
				this.note = {
					title: '',
					content: '',
					active: false
				}
			}
		},
		deleteNote() {
			if (this.note.title || this.note.content.length !== 0) {
				if (this.note.createdAt && this.note.createdAt === this.constNotes[this.note.createdAt].createdAt) {
					const sec = this.note.createdAt
					this.$db.collection('users').doc(this.auth.email).update({
						[`notes.${this.activeFolder}.${sec}`]: this.$firebase.firestore.FieldValue.delete()
					})
				}
				this.note = {
					title: '',
					content: '',
					active: false
				}
			}
		},
		showNote(note) {
			this.note = note
			this.showAddMenu = false
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
			if (this.auth.loggedIn) {
				this.$db.collection('users').doc(this.auth.email).onSnapshot((snap) => {
					const notesData = snap.data().notes[this.activeFolder]
					const notes = []
					Object.keys(notesData).sort().forEach((key) => notes.push(notesData[key]))
					this.notes = notes
					this.constNotes = notesData
				})
			}
			else {
				const originalNotes = this.allNotes[this.activeFolder]
				const notesArray = []
				Object.keys(this.allNotes[this.activeFolder]).sort().forEach(key => {
					notesArray.push(originalNotes[key])
				})
				this.notes = notesArray
				this.constNotes = originalNotes
			}
			this.hideMenu('folders')
		}
	}
}
</script>

<style lang="scss" scoped>
	.home-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
