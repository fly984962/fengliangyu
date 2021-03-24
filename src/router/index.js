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
        // 首页
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
        // 排行榜
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/music/ranking/index'),
      },
      {
        // 歌单
        path: '/songlist',
        name: 'songlist',
        component: () => import('../views/music/songlist/index'),
      },
      {
        // MV
        path: '/mv',
        name: 'mv',
        component: () => import('../views/music/mv/index'),
      },
      {
        // 歌手
        path: '/singer',
        name: 'singer',
        component: () => import('../views/music/singer/index'),
      },
      {
        // 我的音乐
        path: '/mymusic',
        name: 'mymusic',
        component: () => import('../views/music/mymusic/index'),
      },
      {
        // MV播放页
        path: '/mvplay',
        name: 'mvplay',
        component: () => import('../components/mvplay/index'),
      },
      {
        // 歌单页
        path: '/musicsong',
        name: 'musicsong',
        component: () => import('../components/musicSong/index'),
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
