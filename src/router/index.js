import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../views/todolist/TodoList.vue'
import DownloaderVue from "../views/downloader/DownloaderVue.vue"
import KeyboardVue from "../views/Keyboard/KeyboardVue.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoList,
    },
    {
      path: '/downloader',
      name: 'downloader',
      component: DownloaderVue,
    },
    {
      path: "/keyboard",
      name: "keyboard tes",
      component: KeyboardVue
    }
  ]
})

export default router
