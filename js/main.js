import { getTopRatedMovies } from "./fetch.js"; //영화데이터 fetch
import { slide } from "./slide.js"; //상단부 슬라이드 동작기능
import { toDetail } from "./home-to-detail.js"; //상세페이지 이동기능

const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");
const popularityBtn = document.querySelector(".popularity");
const voteBtn = document.querySelector(".vote");
const originalBtn = document.querySelector(".filter-name");

const data = await getTopRatedMovies();

//데이터 화면에 출력하기
//slide (상단부분)
const makeSlideMovieList = () => {
  const sortedData = [...data].sort((a, b) => b.vote_average - a.vote_average)// 평점순으로 보여주기

  for (let i = 0; i < 3; i++) {
    let movie = sortedData[i];
    const slideInner = document.querySelector(".slide-inner");
    slideInner.innerHTML += `<div data-id="${movie.id}" class="slide">
        <div class="slide-num">
          <div class="slide-img">
            <img class="movie-img" data-id="${movie.id}"
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

const makeMovieList = (data) => {
  //div card-container (하단부분)
  data.forEach((movie) => {
    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML += `<div data-id="${movie.id}" class="movie-card">
      <div class="card-poster">
        <img class="movie-img" data-id="${movie.id}"
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

const showData = async (query) => {
  const data = await getTopRatedMovies();
  const inputData = query.toLowerCase().trim();
  const filteredData = data.filter((d) =>
    d.title.toLowerCase().split(" ").join("").includes(inputData)
  )

  cardContainer.innerHTML = "";
  makeMovieList(filteredData);
};

// entrypoint
makeSlideMovieList(data);
makeMovieList(data);



// event listener
//검색기능
searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  showData(query);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

//인기순 정렬기능
popularityBtn.addEventListener("click", () => {
  const sortedData = [...data].sort(
    (a, b) => b.popularity - a.popularity
  );
  cardContainer.innerHTML = "";
  makeMovieList(dataSortedByPopularity);
});
// 평점순 정렬기능
voteBtn.addEventListener("click", () => {
  const sortedData = [...data].sort(
    (a, b) => b.vote_average - a.vote_average
  );
  cardContainer.innerHTML = "";
  makeMovieList(dataSortedByvote_average);
});
//정렬 되돌리기
originalBtn.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  makeMovieList(data);
});
