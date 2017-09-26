import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import MovieList from '../views/MovieList'
import Like from '../views/Like'
import Record from '../views/Record'
import About from '../views/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '*',
      redirect:'/'
    },
    {
      path: '/',
      name: 'MovieList',
      component: MovieList
    },
    {
    	path:'/like',
    	name:'Like',
    	component: Like
    },
    {
      path:'/record',
      name:'record',
      component: Record
    },
    {
      path:'/about',
      name:'about',
      component: About
    }
  ]
})
