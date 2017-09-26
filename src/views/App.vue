<template>
	<div>
		<!-- 右侧主体内容 -->
		<div id="wrapper" v-bind:class="{ 'menu-open': isMenuOpen }" >
			<p class="title">影讯fgggg</p>
			<router-view></router-view>
		</div>

		<!-- 侧滑栏按钮图标 -->
		<div id="toggle" v-bind:class="{ active: isMenuOpen }" v-on:click="toggleHandler"></div>

		<!-- 侧滑菜单栏 -->
		<nav id="menu" class="menu" v-bind:class="{ active: isMenuOpen }">
			<div class="menu-header"></div>
			<ul class="menu-items">
				<li class="menu-item" v-for="(item,index) in items" v-bind:class="[{inview:isMenuOpen}, itemClass(index)]">
					<a href="#" class="menu-item-link" 
					@click.prevent="itemTouch(index)" 
					@transitionend="itemTouchEnd(index)" 
					ref="itemEls">
						<span ref="touchEls"></span>
						<span>{{ item.itemName }}</span>
					</a>
				</li>
			</ul>
		</nav>
		<div id="mask" class="mask" v-bind:class="{ active: isMenuOpen }"
		v-on:click="maskToggleHandler"></div>
	</div>
</template>

<script>


export default {
	name: 'App',
	data:function(){
		return {
			menuPosition: "off",
			isMenuOpen: false,
			items:[
				{ itemName:"影视讯息" },
				{ itemName:"我喜欢的" },
				{ itemName:"我看过的" }
			]
		}
	},

	beforeMount(){
		this.$store.dispatch('FETCH_MOVIES',{type:'in_theaters'});
		this.$store.dispatch('FETCH_MOVIES',{type:'coming_soon'});
	},
	mounted(){
		var itemEls = this.$refs.itemEl;
	},
	computed: {
	},
	methods: {
		/*侧栏图标点击事件*/
		toggleHandler: function(){
			(this.menuPosition == "off") ? this.toggleMenuOn() : this.toggleMenuOff();
		},
		/*打开侧栏*/
		toggleMenuOn:function(){
			this.menuPosition = "on";
			this.isMenuOpen = true;
			document.body.classList.add("menu-open");
		},
		/*关闭侧栏*/
		toggleMenuOff:function(){
			this.menuPosition = "off";
			this.isMenuOpen = false;
			document.body.classList.remove("menu-open");
		},
		/*mask点击关闭侧栏*/
		maskToggleHandler: function(event){
			event.preventDefault();
			if(this.menuPosition == "on") this.toggleMenuOff();
		},
		/*每个item 根据 index 分别添加不同的 class：item-1、item-2...等*/
		itemClass:function(i){
			return "item-"+(i+1);
		},
		itemTouch:function(index){
			var itemEl = this.$refs.itemEls[index];
			var elWidth = itemEl.offsetWidth,
				elHeight = itemEl.offsetHeight,
				touchSize = Math.max(elWidth, elHeight) * 2;

			var touchElement = this.$refs.touchEls[index];
			touchElement.className = "touch-effect";
			touchElement.style.width = touchSize + 'px';
			touchElement.style.height = touchSize + 'px';
			itemEl.insertBefore(touchElement, itemEl.firstChild);

			var relX = this.getPosition(event).x - this.getOffsetRect(itemEl).x,
	        	relY = this.getPosition(event).y - this.getOffsetRect(itemEl).y;
	        touchElement.style.top = relY-(touchSize/2)+"px";
			touchElement.style.left = relX-(touchSize/2)+"px";
			touchElement.classList.add("animating");
		},
		itemTouchEnd:function(index){
			this.$refs.touchEls[index].classList.remove("animating");
		},
		getPosition:function(e){
			var posx = 0;
			var posy = 0;
			if (!e) var e = window.event;
			if (e.pageX || e.pageY) {
			  posx = e.pageX;
			  posy = e.pageY;
			}
			return {
			  x: posx,
			  y: posy
			}
		},
		getOffsetRect: function(elem) {
		    var box = elem.getBoundingClientRect()
		    var top  = box.top;
		    var left = box.left;
		    return {
		      x: Math.round(left),
		      y: Math.round(top)
		    }
	  	}

	}
}
	
</script>


<style>
html,body,div,p,span,img,ul,li,header,nav,h1,h2,h3,h4,h5,h6,textarea{
	margin: 0;
	padding: 0;
}
body{
	overflow-x: hidden;
	
}
body.menu-open{
	overflow-x: hidden;
}
a{
	text-decoration: none;
}
/*===============================================
	左侧内容主体
=================================================*/
#wrapper{
	position: absolute;
	background: #000;
	width: 100%;
	height: 100%;
	 -webkit-transition: -webkit-transform 0.5s;
     transition: transform 0.5s;
}
#wrapper.menu-open {
  -webkit-transform: translateX(300px);
      -ms-transform: translateX(300px);
          transform: translateX(300px);
}
#wrapper .title{
	position: fixed;
  top: 5px;
  left: 50px;
  color: #fff;
  font-size: 24px;
}

/*===============================================
	侧栏图标按钮样式
=================================================*/
#toggle{
	 position: fixed;
  top: 12px;
  left: 12px;
  z-index: 99;
  width: 24px;
  height: 18px;
/*  background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 7px,#000 7px,#000 11px,rgba(0, 0, 0, 0) 11px );
  background: linear-gradient(rgba(0, 0, 0, 0) 7px,#000 7px,#000 11px,rgba(0, 0, 0, 0) 11px );*/
  background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 7px,#fff 7px,#fff 11px,rgba(0, 0, 0, 0) 11px );
  background: linear-gradient(rgba(0, 0, 0, 0) 7px,#fff 7px,#fff 11px,rgba(0, 0, 0, 0) 11px );
  cursor: pointer;
}

#toggle::after,
#toggle::before{
	 display: block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #fff;
  content: "";
}

#toggle::before{
	top: 0;
	  -webkit-transform-origin: bottom left;
      -ms-transform-origin: bottom left;
          transform-origin: bottom left;
}
#toggle::after{
	bottom: 0;
	  -webkit-transform-origin: top left;
      -ms-transform-origin: top left;
          transform-origin: top left;
}

#toggle,
#toggle::before,
#toggle::after {
  -webkit-transition: all 0.5s;
          transition: all 0.5s;
}

/* 点击触发的样式 */
#toggle.active {
  -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
          transform: rotate(360deg);
}

#toggle.active::before {
  width: 75%;
  -webkit-transform: translateY(7px) rotate(-45deg);
      -ms-transform: translateY(7px) rotate(-45deg);
          transform: translateY(7px) rotate(-45deg);
}

#toggle.active::after {
  width: 75%;
  -webkit-transform: translateY(-7px) rotate(45deg);
      -ms-transform: translateY(-7px) rotate(45deg);
          transform: translateY(-7px) rotate(45deg);
}

/*===============================================
	侧栏样式
=================================================*/
nav.menu{
	position: fixed;
	top: 0;
	left: 0;
	width: 300px;
	height: 100%;
	background-color: #fff;
	box-shadow: 0;
	transform: translateX(-300px);
	transition: transform 0.5s, box-shadow 0.5s;
	z-index: 10;
}

nav.menu.active{
	transform: translateX(0);
	box-shadow: 0px 2px 8px  rgba(0, 0, 0, 0.2);
}

/*头部样式*/
.menu-header{
	position: relative;
	width: 100%;
	height: 20%;
	min-height: 188px;
	background-color: #474747;
}
/*item 样式*/
.menu-items{
	list-style: none;
	margin: 0;
	padding: 0;
}
.menu-item{
	transform: translateX(-50%);
	opacity: 0;
	display: block;
	width: 100%;
	overflow: hidden;
}
.item-1{
	transition: transform 0.5s 0.1s, opacity 0.5s 0.1s;
}
.item-2{
	transition: transform  0.5s 0.2s, opacity 0.5s 0.2s;
}
.item-3{
	transition: transform  0.5s 0.3s, opacity 0.5s 0.3s;
}
.item-4{
	transition: transform  0.5s 0.4s, opacity 0.5s 0.4s;
}
.item-5{
	transition: transform  0.5s 0.5s, opacity 0.5s 0.5s;
}
.item-6{
	transition: transform  0.5s 0.6s, opacity 0.5s 0.6s;
}
.item-7{
	transition: transform  0.5s 0.7s, opacity 0.5s 0.7s;
}
.item-8{
	transition: transform  0.5s 0.8s, opacity 0.5s 0.8s;
}

.menu-item.inview{
	transform: translateX(0);
	opacity: 1;
}
.menu-item-link{
	position: relative;
	display: block;
	padding: 12px;
	color: #000;
}
.touch-effect{
	display: block;
	position: absolute;
	z-index: -1;
	border-radius: 50%;
	background-color: gray;
	opacity: 0.3;
	  -webkit-transform: scale(0);
      -ms-transform: scale(0);
          transform: scale(0);
  -webkit-transform-origin: 50% 50%;
      -ms-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
}
.touch-effect.animating{
	  -webkit-transform: scale(1);
      -ms-transform: scale(1);
          transform: scale(1);
  -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;
          transition: transform 0.5s, opacity 0.5s;
}

/*===============================================
	mask
=================================================*/
.mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.8);
	opacity: 0;
	visibility: hidden;
	transition: visibility 0.5s, opacity 0.5s;
}

.mask.active{
	visibility: visible;
	opacity: 1;
}
</style>