import { getTopRatedMovies } from "./fetch.js"; //영화데이터 fetch
import { slide } from "./slide.js"; //상단부 슬라이드 동작기능
import { toDetail } from "./home-to-detail.js"; //상세페이지 이동기능

//데이터 화면에 출력하기
const makeMovieList = async () => {
  const data = await getTopRatedMovies();

  //div card-container (하단부분)
  data.forEach((movie) => {
    document.querySelector(
      ".card-container"
    ).innerHTML += `<div data-id="${movie.id}" class="movie-card" onclick="movieDetail(${movie.id})">
    <div class="card-poster">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="name poster"
      />
    </div>
    <div class="card-title">${movie.title}</div>
    <div class="card-rating">${movie.vote_average}</div>
  </div>`;
  });

  //slide (상단부분)
  data.forEach((movie, index) => {
    if (index <= 2) {
      document.querySelector(
        ".slide-inner"
      ).innerHTML += `<div data-id="${movie.id}" class="slide" onclick="movieDetail(${movie.id})">
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
      </div>`;
    }
  });

  slide();
  toDetail();
};

makeMovieList();
//검색기능
//정렬기능
