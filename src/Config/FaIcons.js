import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faPlus,
	faStream,
	faPen,
	faCheck,
	faFolder,
	faSave,
	faTrash,
	faDownload,
	faTimes,
	faHome,
	faEraser,
	faUser,
	faLock
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faPlus,
	faStream,
	faPen,
	faCheck,
	faFolder,
	faSave,
	faTrash,
	faDownload,
	faTimes,
	faHome,
	faEraser,
	faUser,
	faLock
)

Vue.component('fa-icon', FontAwesomeIcon)