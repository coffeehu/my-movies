<template>
	<div>
		<img :src="subject.images.medium" class="movie-list-image">
		<h3 class="movie-list-title">
			<a href="#">{{subject.title}}</a>
		</h3>
		<h5 class="movie-list-original-title">{{subject.original_title}}</h5>
		<h5 class="movie-list-original-type">类型：{{subject.genres | initType}}</h5>
		<h5>导演：{{subject.directors | initDirectors}}</h5>
		<h5>主演：{{subject.casts | initCasts}}</h5>
		<div class="movie-list-like " :class="{'icon-star-full':isLike,'icon-star-empty':!isLike}" @click="like"></div>
		<div class="movie-list-record" @click="record" :class="{recordActive:isRecord}">{{recordMessage}}</div>
	</div>
</template>

<script>
export default {
	name:"movieBox",
	props:['subject'],
	data:function(){
		return {
			isLike:false,
			isRecord:false,
			recordMessage:"+看过"
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
	methods:{
		like(){
			if(!this.isLike){
				this.isLike = true;
				this.$emit('likeEvent');
			}else{
				this.isLike = false;
				this.$emit('likeEvent');
			}
		},
		record(){
			if(!this.isRecord){
				this.isRecord = true;
				this.recordMessage = "已看过";
			}else{
				this.isRecord = false;
				this.recordMessage = "+看过";
			}
		}
	},
}
</script>

<style scoped>
.movie-list-image{
	float: left;
	margin-right: 30px;
}
.movie-list-title a{
	color: #000;
	font-weight: 500;
}
.movie-box h5{
	font-weight: 200;
}
.movie-list-original-type{
	margin-top: 15px;
}
.movie-list-like{
	position: absolute;
	font-size: 24px;
	height: 20%;
	top: 40%;
	right: 15%;
	border-radius: 8px;
	cursor: pointer;
}
.movie-list-like .like{
	color: #FF6347;
}
.movie-list-record{
	position: absolute;
	width: 8%;
	max-width: 80px;
	min-width: 30px;
	height: 20%;
	border: 1px solid #FF6347;
	text-align: center;
	top: 40%;
	right: 5%;
	border-radius: 8px;
	cursor: pointer;
	color: #FF6347;
}
.movie-list-record:hover{
	background: #FF6347;
	color: #fff;
}
.recordActive{
	background: gray;
	border: 1px solid gray;
	color: #fff;
	cursor: default;
}
.recordActive:hover{
	background: gray;
	color: #fff;
}

</style>