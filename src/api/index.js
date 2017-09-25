// http://api.douban.com/v2/movie/in_theaters
// http://api.douban.com/v2/movie/coming_soon

var api = {
  url: "/api/movie/",
}

// type: coming_soon 、 in_theaters
export function fetchMovies(type) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", api.url+type);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });

  return promise;
};

