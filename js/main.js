import { getTopRatedMovies } from "./fetch.js"; //영화데이터 fetch
import { slide } from "./slide.js"; //상단부 슬라이드 동작기능
import { toDetail } from "./home-to-detail.js"; //상세페이지 이동기능

//데이터 화면에 출력하기
const makeMovieList = async () => {
  const data = await getTopRatedMovies();
  let filterdData = data.sort((a, b) => b.vote_average - a.vote_average); // 평점순으로 보여주기
  console.log(filterdData);
  //slide (상단부분)
  filterdData.forEach((movie, index) => {
    if (index <= 2) {
      const slideInner = document.querySelector(".slide-inner");
      slideInner.innerHTML += `<div data-id="${movie.id}" class="slide">
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

  //div card-container (하단부분)
  filterdData.forEach((movie) => {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML += `<div data-id="${movie.id}" class="movie-card">
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

  slide();
  toDetail();
};

makeMovieList();

//검색기능
//정렬기능
