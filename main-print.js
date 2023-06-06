import {getTopRatedMovies} from "./fetch.js"
import {slide} from "./slide.js"
//데이터 화면에 출력하기
const makeMovieList = async () => {
  const data = await getTopRatedMovies();
  //div card-container (하단부분)
  data.forEach((movie) => {
    document.querySelector('.card-container').innerHTML += `<div class="movie-card">
    <div class="card-poster">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="name poster"
      />
    </div>
    <div class="card-title">${movie.title}</div>
    <div class="card-rating">${movie.vote_average}</div>
  </div>`
  });
  //slide (상단부분)
  data.forEach((movie, index)=>{
    if (index <= 2) {
        document.querySelector('.slide-inner').innerHTML += `<div class="slide">
        <div class="slide-num">
          <div class="slide-img">
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              alt="name poster"
            />
          </div>
          <div class="slide-info">
            <div class="title">${movie.title}</div>
            <div class="rating">${movie.vote_average}</div>
          </div>
        </div>
      </div>`
    }
  })
  slide()
}

makeMovieList();
//검색기능
//상세페이지로 이동기능
//정렬기능