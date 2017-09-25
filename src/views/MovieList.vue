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
						<div class="movie-box">
							<img :src="subject.images.medium" class="movie-list-image">
							<h3 class="movie-list-title">
								<a href="#">{{subject.title}}</a>
							</h3>
							<h5 class="movie-list-original-title">{{subject.original_title}}</h5>
							<h5 class="movie-list-original-type">类型：{{subject.genres | initType}}</h5>
							<h5>导演：{{subject.directors | initDirectors}}</h5>
							<h5>主演：{{subject.casts | initCasts}}</h5>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import ImageFlow from '../components/ImageFlow.vue'

export default {
	name:'MovieList',
	mounted:function(){
	},
	data:function(){
		return {
			currentType:0
		}
	},
	methods:{
		getMovies:function(type){
			this.currentType = type;
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
	filters:{
		initType:function(value){
			return value.join("/");
		},
		initDirectors:function(value){
			return value.map(function(v){
				return v.name;
			}).join("/");	
		},
		initCasts:function(value){
			return value.map(function(v){
				return v.name;
			}).join("/");
		}
	},
	components:{
		ImageFlow
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
.classify .content .movie-list-image{
	float: left;
	margin-right: 20px;
}
.classify .content .movie-box:after{
 	content: '';
    display: block;
    clear: both;
}
.classify .content .movie-list-title{
	
}
.classify .content .movie-list-title a{
	color: #000;
	font-weight: 500;
}
.classify .content .movie-box h5{
	font-weight: 200;
}
.movie-list-original-type{
	margin-top: 15px;
}
</style>