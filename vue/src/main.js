import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


import App from './App.vue'
import router from './router'


import { 
    faChevronDown,
    faCircle, faEllipsisVertical, 
    faMagnifyingGlass, faPlus, faSort, 
    faSquarePhone, faSquarePlus, faUsers, faVideo,
    faMicrophone,faFaceSmile,faArrowLeft,
    faFile,faImages,faCamera, faUser,
    faSquarePollVertical,faCircleXmark,
    faBell, faStar, faArrowRotateRight,
    faLock,faTrash,faBan,
    faThumbsDown, faCheckDouble, faCheck

} from '@fortawesome/free-solid-svg-icons'


library.add(
    faUsers, faCircle,faUser,
    faSquarePlus, faEllipsisVertical, faPlus,
    faSort, faMagnifyingGlass,
    faChevronDown, faVideo, faThumbsDown,
    faSquarePhone, faMicrophone,
    faFaceSmile, faArrowLeft,faTrash,
    faFile, faImages, faCamera,faBan,
    faSquarePollVertical, faCircleXmark, faBell,
    faStar, faArrowRotateRight, faLock, faCheckDouble, faCheck
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
