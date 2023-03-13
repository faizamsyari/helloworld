import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import home from '../views/HomeView.vue'
import home from '../views/HomeView.vue'
import admin from '../views/admin.vue'
import tabel from '../views/tabel.vue'
import landing from '../views/landing.vue'
import update from '../views/update.vue'
import tagihan from '../views/addtagihan.vue'
import pembayaran from '../views/pembayaran.vue'
import choose from '../views/userchoose.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/tabel',
    name: 'tabel',
    component: tabel
  },
  {
    path: '/landing/:id?/:em?/:pw?',
    name: 'landing',
    component: landing
  },
  {
    path: '/update/:id?/:idku?/:statusku?/:nominal?',
    name: 'update',
    component: update
  },
  {
    path: '/tagihan/:id?/:nama?/:alamat?/:em?',
    name: 'tagihan',
    component: tagihan
  },
  {
    path: '/choose',
    name: 'choose',
    component: choose
  },
  {
    path: '/pembayaran/:id?/:nominal?/:bank?/:virtual?/:idku?/:em?/:pw?',
    name: 'pembayaran',
    component: pembayaran
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
