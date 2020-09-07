import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faStream, faPen, faCheck, faFolder, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faStream, faPen, faCheck, faFolder, faSave, faTrash)

Vue.component('fa-icon', FontAwesomeIcon)