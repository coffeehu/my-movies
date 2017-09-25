import {fetchMovies} from '../api'

export default {
	FETCH_MOVIES: function(context, {type}){
		fetchMovies(type)
		.then(function(response){
			console.log(response.subjects);
			if(type == "in_theaters"){
				context.state.moviesInTheaters.tops = response.subjects.slice(0,6);
				context.state.moviesInTheaters.subjects = response.subjects.slice(6);
				context.state.moviesInTheaters.total = response.total;
			}else if(type == "coming_soon"){
				context.state.moviesComingSoon.subjects = response.subjects;
				context.state.moviesComingSoon.total = response.total;
			}
		})
		.catch(function(error){
			console.log(error);
		});
	}
}