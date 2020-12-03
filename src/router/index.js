import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostList from '../views/PostList'
import EditPost from '../views/EditPost.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', component: Login },
  { path: '/postlist', component: PostList },
  { path: '/editpost', component: EditPost }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    return next()
  } else {
    if (localStorage.getItem("token")) {
      return next()
    } else {
      return router.push('/login')
    }
  }
})

export default router
