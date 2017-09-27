<template>
	<div>
		<Image-Flow></Image-Flow>
		<div class="classify">
			<ul class="header">
				<li @click="getMovies(0)" :class="{active:currentType==0}">正在热映({{in_theaters_total}})</li>
				<li @click="getMovies(1)" :class="{active:currentType==1}">即将上映({{coming_soon_total}})</li>
			</ul>
			<div class="content">
				<ul>
					<li v-for="subject in currentMovies">
						<movie-box class="movie-box" v-bind:subject="subject" @likeEvent="showLikeMessage"></movie-box>
					</li>
				</ul>
				<Copyright class="copyright"></Copyright>
			</div>
		</div>
		<div class="likeMessage" v-bind:class="{likeMessageActive}"
		@transitionend="showLikeMessageEnd">已加入到<br/>"我喜欢的"</div>
	</div>
</template>

<script>
import ImageFlow from '../components/ImageFlow.vue'
import MovieBox from '../components/MovieBox.vue'
import Copyright from './Copyright'

export default {
	name:'MovieList',
	beforeMount:function(){
		console.log("movieList beforeMount")
		this.$store.dispatch('FETCH_MOVIES',{type:'in_theaters'});
		this.$store.dispatch('FETCH_MOVIES',{type:'coming_soon'});
	},
	mounted:function(){
		console.log("movieList mounted")
	},
	beforeRouteEnter(to, from, next){
		console.log("movieList beforeRouteEnter");
		next();
	},
	data:function(){
		return {
			currentType:0,
			likeMessageActive:false
		}
	},
	methods:{
		getMovies:function(type){
			this.currentType = type;
		},
		showLikeMessage:function(){
/*			if(!this.likeMessageActive)
				this.likeMessageActive = true;
			else 
				this.likeMessageActive = false;*/
		},
		showLikeMessageEnd:function(){

		}
	},
	computed:{
		in_theaters:function(){
			return this.$store.state.moviesInTheaters.subjects;
		},
		coming_soon:function(){
			return this.$store.state.moviesComingSoon.subjects;
		},
		currentMovies:function(){
			if(this.currentType == 0) return this.in_theaters;
			else return this.coming_soon;
		},
		in_theaters_total:function(){
			return this.$store.state.moviesInTheaters.total;
		},
		coming_soon_total:function(){
			return this.$store.state.moviesComingSoon.total;
		}
	},
	components:{
		ImageFlow,
		MovieBox,
		Copyright
	},
}
</script>

<style scoped>
.classify{
	position: absolute;
	width: 88%;
	height: 100%;
	background: #fff;
	top: 100%;
	margin-left: 6%;
}
/*分类标签栏：正在热映，即将上映*/
.classify .header{
	border-bottom: 1px solid rgba(0,0,0,0.1);
	height: 80px;
	line-height: 80px;
	font-size: 20px;
}
.classify .header li{
	display: inline-block;
	margin-right: 8%;
	cursor: pointer;
}
.classify .header li.active{
	color: red;
	border-bottom: 2px solid red;
}
/*内容列表栏*/
.classify .content{
	position: relative;
}
.classify .content ul{
	list-style: none;
}
.classify .content ul li{
	border-bottom: 1px solid rgba(0,0,0,0.1);
	padding: 20px 0;
	height: 150px;
}

.classify .content .movie-box{
	position: relative;
	line-height: 25px;
}
.movie-box:after{
 	content: '';
    display: block;
    clear: both;
}

.likeMessage{
	position: fixed;
	width: 10%;
	height: 8%;
	top: 47%;
	left: 45%;
	background: rgba(128,128,128,0.5);
	text-align: center;
	border-radius: 6px;
	visibility: hidden;
}
.likeMessageActive{
	visibility: visible;
}


</style>