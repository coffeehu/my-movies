<template>
	<div>
		<h1 style="margin:100px">Detail {{ $route.params.id }}</h1>		
	</div>
</template>

<script>
export default {
	name:'detail',
	beforeRouteEnter(to, from, next){
		console.log("detail beforeRouteEnter");
		next();
	},
	data:function(){
		return {
		}
	}
}
</script>

<style scoped>
	h1{
		color: #000
	}
</style>