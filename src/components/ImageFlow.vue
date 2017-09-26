<template>
	<div id="imageFlow">
		<div class="wrapper" ref="wrapper">
			<ul class="view" id="view">
				<li class="display" v-for="(top,index) in tops" @mouseover="onMouseoverHanlder(displays[index])" @mouseout="onMouseoutHanlder(displays[index])">
					<img :src="top.images.large" class="display-img" @click="move(displays[index])" >
				</li>
			</ul>
			<ul class="reflection" id="reflection">
				<li class="reflectionItem" v-for="top in tops">
					<canvas></canvas>
				</li>
			</ul>
		</div>
		<div class="arrow" ref="arrow">
			<div class="arrow-left" @click="toLeft"></div>
			<div class="arrow-right" @click="toRight"></div>
			<div class="arrow-movie-name" ref="arrow-movie-name"></div>
		</div>
	</div>
</template>

<script>

export default {
	data:function(){
		return {
			displays:[],
		}
	},
	beforeMount:function(){
	},
	mounted:function(){
	},
	updated:function(){
		/*=========图片轮播对象的构造函数=========*/
		var displays = this.displays;

		function ImageFlow(id,scale){
			this.el = document.getElementById(id);
			this.width = this.el.clientWidth;
			this.viewEl = document.getElementById('view'); // 展示栏
			this.reflectionEl = document.getElementById('reflection'); // 倒影栏
			this.displays = displays;
			this.displayEls = this.viewEl.getElementsByClassName('display');
			this.scale = scale;
			this.id = null; // 定时任务id
			this.time = 0;
			this.currentIndex = 0; // 当前大图的索引
			
			for(var i=0;i<this.displayEls.length;i++){
				// 生成 display 实例
				var display = new Display(i,this.displayEls[i],this.viewEl,this,this.reflectionEl,scale);
				this.displays[i] = display;
			}
		}

		var _component = this;
		// n:起始索引。  time：间隔时间
		ImageFlow.prototype.run = function(n,time){

			this.time = time;
			var toRight = true;
			// 为什么要用 mouseover?
			/*想象场景：我们点击小图时，调用 onClickHandler，当前元素的isChecked 为 false（这是第一次）；
			接着会打断定时任务，调用run，run里面又会调用 onClickHandler ，此时 同一个元素的isChecked 为 true。（这是第二次）；
			然后生成定时任务，n+1,继续循环调用 onClickHandler（这是第三次）...

			上面有什么问题吗？
			有问题。相当于点击了一个小图，执行了 两次 onClickHandler，并且 同一个元素的isChecked连续产生了两个值， 一次为false，第二次为 true。 不利于我们判断。

			加了 mouseover 后：点击小图，调用 onClickHandler，isChecked 为 false；
			然后由于当前 mouseover=true，所以不会执行第二次onClickHandler（当然定时任务还在不断循环），所以只会执行一次onClickHandler，且输出 isChecked=false，这符合我们的判断。

			当然第三次循环的时候就会执行 onClickHandler 了，因为下面几个图片的 mouseover 默认都是 false。所以滚动不会受影响
			*/

			if(!this.displays[n].el.mouseover){
				_component.onClickHandler(this.displays[n].el,this.scale);
			}
			
			if(n==this.displays.length-1) toRight=false;
			if(n==0) toRight=true;
			if(toRight){
				n+=1;
			}else{
				n-=1;
			}

			var _this = this;
			this.id = setInterval(function(){
				if(!_this.displays[n].el.mouseover){
					_component.onClickHandler(_this.displays[n].el, _this.scale);
				}
				//_component.onClickHandler(_this.displays[n].el, _this.scale);
				if(n==_this.displays.length-1) toRight=false;
				if(n==0) toRight=true;
				if(toRight){
					n+=1;
				}else{
					n-=1;
				}
			},time);
		}

		/*=========Display 图片展示对象的构造函数============*/
		function Display(n,el,parent,root,reflectionEl,scale){
			this.el = el;  // li 元素
			this.n = this.el.n = n;  // 索引
			this.parent = this.el.parent = parent;  // ul 元素
			this.root = this.el.root = root;  // ImageFlow 实例
			this.wrapper = this.el.wrapper = this.root.el.getElementsByClassName('wrapper')[0];
			this.reflectionEl = this.el.reflectionEl = reflectionEl; // 倒影栏元素
			this.img = this.el.getElementsByClassName('display-img')[0];
			this.img.width = this.root.width * 0.1;
			this.img.height = this.img.width * 1.3;
			this.reflectionItem = this.reflectionEl.getElementsByTagName("canvas")[this.n]; // 画布，真正的倒影图片
			this.el.instance = this;

			// 对应的倒影：倒影栏<ul>里的 <li>
			var li = this.reflectionEl.getElementsByTagName('li')[this.n];
			this.el.reflection = li; // 设置对应的倒影

			// 图片加载完成后生成倒影
			var _reflectionItem = this.reflectionItem;
			this.img.onload = function(){
				_reflectionItem.width = this.width;
				_reflectionItem.height = this.height*0.8;
				
				var context = _reflectionItem.getContext("2d");
				context.translate(0, _reflectionItem.height);
		      	context.scale(1, -1); 
				context.drawImage(this, 0, 0, _reflectionItem.width, _reflectionItem.height);
				context.globalCompositeOperation = "destination-out";

				var gradient = context.createLinearGradient(0, 0, 0, _reflectionItem.height);
				gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
				gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
				context.fillStyle = gradient;
				context.fillRect(0, 0, _reflectionItem.width, _reflectionItem.height);
			}
		}

		var imageFlow = new ImageFlow('imageFlow',2.2);
		imageFlow.run(1,3000);
		this.$refs.arrow.style.top = this.$refs.wrapper.clientHeight+'px';
	},
	computed:{
		titles:function(){
			return this.$store.state.moviesInTheaters.titles;
		},
		topTitle:function(){
			return ""
		},
		tops:function(){
			return this.$store.state.moviesInTheaters.tops;
		},
		topsTitle:function(){
			return this.tops[0].title;
		},
	},
	methods:{
		onMouseoutHanlder:function(display){
			display.el.mouseout = true;
			display.el.mouseover = false;
		},
		onMouseoverHanlder:function(display){
			display.el.mouseover = true;
			display.el.mouseout = false;
		},
		toLeft:function(){
			if(this.displays[0].root.currentIndex == 0) return;
			this.move(this.displays[this.displays[0].root.currentIndex-1], true)
		},
		toRight:function(){
			if(this.displays[0].root.currentIndex == this.displays.length-1) return;
			this.move(this.displays[this.displays[0].root.currentIndex+1], true)
		},
		move:function(display, isArrow){
			this.onClickHandler(display.el,display.root.scale,true,isArrow);
		},
		// el 为 display.el，即 <li>
		// scale 放大倍数
		// interrupt 是否打断定时循环。 isArrow 是否点击了左右箭头
		onClickHandler: function(el,scale,interrupt,isArrow){
			this.$refs['arrow-movie-name'].innerHTML = '《 '+this.titles[el.instance.n]+' 》'; // 显示对应大图的电影名
			if(interrupt){ // 打断 setInterval 定时任务，从当前的图片重新开始
				if(el.root.id) {
					clearInterval(el.root.id);
					el.root.run(el.n, el.root.time);
				}
			}
			if(!el.isChecked){
			    var _display = el.parent.getElementsByClassName('display');
			    var _li = el.reflectionEl.getElementsByTagName('li');
			    // 所有人正常
				for(var j=0;j<_display.length;j++){
					_display[j].style.transform = "scale(1)";
					_display[j].isChecked = false;
					_display[j].style.marginRight = "0px";

					_li[j].style.transform = "scale(1)"
					_li[j].style.marginRight = "0px";
				}
				// “我自己”放大
				el.root.currentIndex = el.n;
				el.style.transform =  "scale("+el.root.scale+")"
				el.isChecked = true;
				// transform方法并不会把周围元素挤开，而是覆盖式，所以要自己设置边距。
				el.style.marginRight = el.clientWidth*(scale-1)+"px";

				el.reflection.style.transform =  "scale("+el.root.scale+")"
				el.reflection.style.marginRight = el.clientWidth*(scale-1)+"px";

				var offset = (el.root.el.clientWidth - el.clientWidth*scale)*0.5 - el.n*el.clientWidth;  // 偏移值，让大图处于中间。
				el.instance.wrapper.style.left = offset+'px';
			}else{
				if(!isArrow){  // 说明是点击了大图，而不是点击了箭头
					alert("go")
				}
			}
		}
	},
}
	
</script>

<style scoped>
	#imageFlow{
			position: absolute;
		    width: 100%;
		    height: 80%;
		    left: 0%;
		    top: 20%;
		    background: #000;
		    white-space: nowrap;

		}
		#imageFlow .wrapper{
			position: absolute;
			left: 0;
			top: 20%;
			-webkit-transition: left 0.5s;
		}

		/*####### 展示栏 ######*/
		#imageFlow .view{
			transition: all 0.5s;
			font-size: 0;
		}
		#imageFlow .view .display{
			display: inline-block;
			transform-origin: 0 100%;
			-webkit-transition: transform 0.5s, margin 0.5s;
			padding: 0 2%;
		}
		.view .display-img{
			display: block;
			transform-origin: 0 100%;
			cursor: pointer;
		}


		/*####### 倒影栏 ######*/
		#imageFlow .reflection{
			opacity: 0.5;
		}
		#imageFlow .reflection .reflectionItem{
			display: inline-block;
			vertical-align: top;
			transform-origin: 0 0 ;
			-webkit-transition: transform 0.5s, margin 0.5s;
			padding: 0 2%;
		}

		/* 箭头*/
		.arrow{
			position: absolute;
			width: 74%;
			height: 50px;
			top: 0;
			left: 13%;
			z-index: 5;
			opacity: 0.8;
		}

		.arrow-left{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 24px;
  			height: 18px;
			background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 7px,#fff 7px,#fff 11px,rgba(0, 0, 0, 0) 11px );
			z-index: 6;
			cursor: pointer;
		}
		.arrow-left::after,
		.arrow-left::before{
			display: block;
			position: absolute;
			left: 0;
			width: 12px;
			height: 4px;
			background-color: #fff;
			content: "";
		}
		.arrow-left::after{
			top: 0;
			transform-origin: top left;
			transform: translateY(7px) rotate(-45deg);
		}
		.arrow-left::before{
			bottom: 0;
			transform-origin: bottom left;
			transform: translateY(-7px) rotate(45deg);
		}

		.arrow-right{
			position: absolute;
			right: 0;
			bottom: 0;
			width: 24px;
  			height: 18px;
			background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 7px,#fff 7px,#fff 11px,rgba(0, 0, 0, 0) 11px );
			z-index: 6;
			cursor: pointer;
		}
		.arrow-right::after,
		.arrow-right::before{
			display: block;
			position: absolute;
			right: 0;
			width: 12px;
			height: 4px;
			background-color: #fff;
			content: "";
		}
		.arrow-right::after{
			top: 0;
			transform-origin: top right;
			transform: translateY(7px) rotate(45deg);
		}
		.arrow-right::before{
			bottom: 0;
			transform-origin: bottom right;
			transform: translateY(-7px) rotate(-45deg);
		}
		.arrow-movie-name{
			text-align: center;
			color: #fff;
			font-size: 24px;
			line-height: 50px;
			font-weight: 300;
		}
</style>