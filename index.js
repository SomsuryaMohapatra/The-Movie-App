const api_key = "21fa8e8be5fd8a23cd4054dc2e5b1b38";
const image_url = "https://image.tmdb.org/t/p/w1280";

//searched movies
const search_api =
  "https://api.themoviedb.org/3/search/movie?&api_key=21fa8e8be5fd8a23cd4054dc2e5b1b38&query=";

//most popular movies to show when the page loads for the 1st time
const api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=21fa8e8be5fd8a23cd4054dc2e5b1b38&page=1";

const movieDiv = document.querySelector("#movie-box");

const getMovies = async (apiUrl) => {
  const movies = await fetch(apiUrl);
  const moviesData = await movies.json();

  return showMovies(moviesData.results);
};

const showMovies = (apiFetchedData) => {
    movieDiv.innerHTML="";
    apiFetchedData.forEach(element => {
        const movieBox=document.createElement("div");
        movieBox.classList.add("box"),
        movieBox.innerHTML=`
        <img src="${image_url + element.poster_path}" alt="photo" />
        <div class="overlay">
          <div class="title">
            <h2>${element.title}</h2>
            <span>${element.vote_average}</span>
          </div>
          <h3>Overview :</h3>
          <p>
            ${element.overview}
          </p>
        </div>
        `;

        movieDiv.appendChild(movieBox);
    });
};

document.querySelector("#search").addEventListener("keyup",(e)=>{
    if(e.target.value != ""){
        getMovies(search_api + e.target.value);
    }
});

//init call
getMovies(api_url);
