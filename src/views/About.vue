<template>
	<div class="about-wrapper">
		<div class="message">
			<a href="https://github.com/coffeehu" target="_blank" class="title"><h1 class="icon-github">About Me</h1></a>
			<p><b>Author : </b>Coffee Hu</p>
			<p><b>Describe : </b>一个 vue 练手项目。移动适配后续也会添加。</p>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style scoped>
	.about-wrapper{
		color: #000;
		width:100%;
		height:94%;
		background:#fff;
		margin-top: 6% ;
		position: relative;
	}
	.about-wrapper .message{
		padding-top: 20px;
		position: absolute;
		left: 10%;
		line-height: 35px;
	}
	.about-wrapper .message .title{
		color: #000;
	}
</style>