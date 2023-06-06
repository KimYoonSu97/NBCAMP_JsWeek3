import { getTopRatedMovies } from "./fetch.js"; //영화데이터 fetch
import { slide } from "./slide.js"; //상단부 슬라이드 동작기능
import { toDetail } from "./home-to-detail.js"; //상세페이지 이동기능
const data = await getTopRatedMovies();
//데이터 화면에 출력하기
const makeMovieList = (data) => {
  //div card-container (하단부분)
  data.forEach((movie) => {
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

  toDetail();
};
makeMovieList(data);

//slide (상단부분)
const makeSlideMovieList = (data) => {
  let filterdData = data.sort((a, b) => b.vote_average - a.vote_average); // 평점순으로 보여주기
  for (let i = 0; i < 3; i++) {
    let movie = filterdData[i];
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

  slide();
};
makeSlideMovieList(data);
//검색기능
const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", function () {
  const query = searchInput.value;
  showData(query);
});
const showData = async (query) => {
  const data = await getTopRatedMovies();
  const inputData = query.toLowerCase();
  const filteredData = data.filter((d) =>
    d.title.toLowerCase().includes(inputData)
  );
  cardContainer.innerHTML = "";
  makeMovieList(filteredData);
};
//정렬기능
const popularity = document.querySelector(".popularity");
popularity.addEventListener("click", () => {
  const dataSortedByPopularity = data.sort(
    (a, b) => b.popularity - a.popularity
  );
  cardContainer.innerHTML = "";
  makeMovieList(dataSortedByPopularity);
});
// const vote = document.querySelector('.vote')
// const comment = document.querySelector('.comment')
