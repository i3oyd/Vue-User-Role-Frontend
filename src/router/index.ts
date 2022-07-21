import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/Login.vue'
import RegisterView from '@/views/Register.vue'
import UsersView from '@/views/Users.vue'
import UserCreateView from'@/views/UserCreate.vue'
import UserEditView from '@/views/UserEdit.vue'
import LogOutView from '@/views/LogOut.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/users/edit',
      name: 'edit-user',
      component: UserEditView
    },
    {
      path: '/users/create',
      name: 'create-user',
      component: UserCreateView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOutView
    }
  ]
})

export default router
