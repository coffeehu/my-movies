<template>
	<div>
		<!-- 右侧主体内容 -->
		<div id="wrapper" v-bind:class="{ 'menu-open': isMenuOpen }" >
			<p class="title" >{{currentTitle}}</p>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>

		<!-- 侧滑栏按钮图标 -->
		<div id="toggle" v-bind:class="{ active: isMenuOpen }" v-on:click="toggleHandler"></div>

		<!-- 侧滑菜单栏 -->
		<nav id="menu" class="menu" v-bind:class="{ active: isMenuOpen }">
			<div class="menu-header">
				<div class="logo">
					<img src="../assets/logo.png">
				</div>
			</div>
			<ul class="menu-items">
				<li class="menu-item" v-for="(item,index) in items" v-bind:class="[{inview:isMenuOpen}, itemClass(index)]">
					<a href="#" class="menu-item-link" 
					@click.prevent="itemTouch($event,index)" 
					@transitionend="itemTouchEnd(index)" 
					ref="itemEls">
						<span ref="touchEls"></span>
						<span :class="item.iconName" >{{ item.itemName }}</span>
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
				{ itemName:"影视讯息", path:"/",title:"影讯",iconName:"icon-home" },
				{ itemName:"我喜欢的", path:"/like",title:"我喜欢",iconName:"icon-heart"},
				{ itemName:"我看过的", path:"/record",title:"看过的",iconName:"icon-folder" },
				{ itemName:"关于", path:"/about",title:"About",iconName:"icon-eye" }
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
		currentTitle:function(){
			for(var i=0,len=this.items.length;i<len;i++){
				if(this.items[i].path === this.$route.path){
					 return this.items[i].title;
				}
			}
			return '';
		}
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
		itemTouch:function(event,index){
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

			this.$router.push( { path:this.items[index].path } ) // 路由跳转
		},
		itemTouchEnd:function(index){
			this.$refs.touchEls[index].classList.remove("animating");
			if(this.menuPosition == "on") this.toggleMenuOff();
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


<style src="./style/app.css"></style>
<style src="./style/font.css"></style>