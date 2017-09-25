// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './views/App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

/* 
	http://api.douban.com/v2/movie/in_theaters
	/v2/movie/in_theaters 正在上映的电影；
	/v2/movie/coming_soon 即将上映的电影；
	/v2/movie/subject/:id 单个电影条目信息。
	/v2/movie/search?q={text} 电影搜索api；
*/