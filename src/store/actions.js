import {fetchMovies,record,like,showRecord} from '../api'

export default {
	FETCH_MOVIES: function(context, {type}){
		fetchMovies(type)
		.then(function(response){
			console.log(response.subjects);
			if(type == "in_theaters"){
				context.state.moviesInTheaters.tops = response.subjects.slice(0,6);
				context.state.moviesInTheaters.subjects = response.subjects.slice(6);
				context.state.moviesInTheaters.total = response.total;
				for(var i=0,len=context.state.moviesInTheaters.tops.length;i<len;i++){
					context.state.moviesInTheaters.titles[i] = context.state.moviesInTheaters.tops[i].title;
				}
			}else if(type == "coming_soon"){
				context.state.moviesComingSoon.subjects = response.subjects;
				context.state.moviesComingSoon.total = response.total;
			}
		})
		.catch(function(error){
			console.log(error);
		});
	},
	RECORD:function(context,{type,id}){
		record(type,id);
	},
	LIKE:function(context,{type,id}){
		like(type,id);
	},
	SHOWRECORD:function(context){
		showRecord()
		.then(function(response){
			console.log(response);
			var arr = [];
			for(var i=0,len=response.length;i<len;i++){
				var obj = JSON.parse(response[i].json);
				arr.push(obj);
			}
			context.state.record = arr;
		})
		.catch(function(error){
			console.log(error);
		});
	}
}