import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import Home from '../views/Home'
import MovieList from '../views/MovieList'
import Like from '../views/Like'
import Record from '../views/Record'
import About from '../views/About'
import Detail from '../views/Detail'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '*',
      redirect:'/'
    },

    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path:'',
          redirect:'movieList'
        },
        {
          path:'movieList',
          name:'MovieList',
          component: MovieList
        },
        {
          path:'like',
          name:'Like',
          component: Like
        },
        {
          path:'record',
          name:'Record',
          component: Record
        },
        {
          path:'about',
          name:'About',
          component: About
        }
      ]
    },

    {
      path:'/detail/:id',
      name:'Detail',
      component: Detail
    }

  ]
})
