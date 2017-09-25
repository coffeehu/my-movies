import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import MovieList from '../views/MovieList'
import Like from '../views/Like'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
