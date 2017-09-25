import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		moviesInTheaters: {
			tops:[], // 轮播展示用的，6个
			subjects:[],
			total:0
		},
		moviesComingSoon: {
			subjects:[],
			total:0
		},
	},
	getters,
	mutations,
	actions
})
