<template>
	<div class="record-wrapper">
		<ul class="record-list">
			<li v-for="subject in record" class="record-list-item">
				<movie-box v-bind:subject="subject"></movie-box>
			</li>
		</ul>
	</div>
</template>

<script>
import MovieBox from '../components/MovieBox'

export default {
	name:'Record',
	beforeMount:function(){
		this.$store.dispatch('SHOWRECORD');
		console.log("record beforeMount")
	},
	mounted(){
		console.log("record mounted")
	},
	updated(){
		console.log("record updated")
	},
	destroyed(){
		console.log("record destroyed")
	},
	watch:{
		'$route'(){
			console.log("watch ----  $route")
			this.$store.dispatch('SHOWRECORD');
		}
	},
	computed:{
		record:function(){
			return this.$store.state.record;
		}
	},
	components:{
		MovieBox,
	}
}
</script>

<style scoped>
.record-wrapper{
	position: relative;
	width: 100%;
	height: 100%;
	color: #fff;
}
.record-list{
	position: absolute;
	top: 10%;
	width: 100%;
}
.record-list-item{
	width: 100%;
	position: relative;
}
</style>