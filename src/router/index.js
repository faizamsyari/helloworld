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

router.beforeEach((to,from, next)=>{
  const isauthen = JSON.parse(localStorage.getItem("autenticated"));
  const cek = localStorage.getItem("status");
  const cekpembayaran = localStorage.getItem("statuspembayaran");
  console.log(to,from)
  if(to.name != "home" && isauthen == false){
    console.log("INI MASUK KE LOGIN")
    next({path:"/"})
  } else if (to.name == "home" && isauthen == true && cek == "admin") {
    console.log("TIDAK BOLEH")
    next({path:"/admin"})

  } else if (to.name == "admin" && cek == "client") {
    next({name:"home"})
  } else if (to.name == "tabel" && cek == "client"){
    next({name:"home"})
    
  } else if (to.name == "tagihan" && cek == "client"){
    next({path:"/"})
  } else if (to.name == "update" && cek == "client"){
    next({path:"/"})
  }
  else if(to.name == "login" && from.name == "landing" && isauthen ==false){
    next({path:"/"})
  } else if(to.name == "landing" && cek == "admin"){
    next({path:"/admin"})
  } 
  else {
    next()
  }
  
})


export default router
