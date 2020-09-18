import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faPlus, faTimes, faStream, faPen, faCheck,
	faFolder, faTrash, faDownload, faHome, faEraser,
	faUser, faLock, faSignature, faMale, faFemale,
	faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faPlus, faTimes, faStream, faPen, faCheck,
	faFolder, faTrash, faDownload, faHome, faEraser,
	faUser, faLock, faSignature, faMale, faFemale,
	faSignInAlt, faSignOutAlt
)

Vue.component('fa-icon', FontAwesomeIcon)