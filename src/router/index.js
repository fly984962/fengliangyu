import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'routerList',
    component: () => import('../views/routerList/index')
  },
  {
    path: '/music',
    name: 'music',
    component: () => import('../views/music/index'),
    children: [
      {
        path:'/',
        redirect:'/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/music/home/index'),
        // children: [
        //   {
        //     path: '/home/mvplay',
        //     name: 'mvplay',
        //     component: () => import('../views/music/home/mvplay/index'),
        //   }
        // ]
      },
      {
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/music/ranking/index'),
      },
      {
        path: '/songlist',
        name: 'songlist',
        component: () => import('../views/music/songlist/index'),
      },
      {
        path: '/mv',
        name: 'mv',
        component: () => import('../views/music/mv/index'),
      },
      {
        path: '/singer',
        name: 'singer',
        component: () => import('../views/music/singer/index'),
      },
      {
        path: '/mymusic',
        name: 'mymusic',
        component: () => import('../views/music/mymusic/index'),
      },
      {
        path: '/mvplay',
        name: 'mvplay',
        component: () => import('../components/mvplay/index'),
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {  // 解决导航条点击两次报错
return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
