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
let viewLikeNum;

//좋아요기능 //웹에 바로반영됨
const likeFunction = () => {
  let likeFunc = document.querySelectorAll(".like-btn");

  likeFunc.forEach((btn) => {
    let likeNum = btn.querySelector(".like-num");
    // console.log(movieId);
    btn.addEventListener("click", function () {
      let movieId = "like" + btn.getAttribute("data-id");
      let likeCount = JSON.parse(localStorage.getItem(movieId));
      console.log(likeCount);
      likeCount++;
      likeNum.innerText = likeCount;
      console.log(btn.parentElement.getAttribute("class"));
      let slideMovie = document.querySelectorAll(".slide");
      let cardMovie = document.querySelectorAll(".movie-card");

      //하단 영화카드 좋아요 시 상단 슬라이드에 있다면 똑같이 적용해라.
      if (btn.parentElement.getAttribute("class") === "slide-img") {
        console.log("슬라이드를 눌렀습니다.");
        for (let i = 0; i < cardMovie.length; i++) {
          if (
            cardMovie[i].getAttribute("data-id") === btn.getAttribute("data-id")
          ) {
            console.log("카드에도 적용했습니다.");
            cardMovie[i].querySelector(".like-num").innerText = likeCount;
          }
        }
      } else {
        console.log("카드를 눌렀습니다.");
        for (let i = 0; i < slideMovie.length; i++) {
          if (
            likeFunc[i].getAttribute("data-id") === btn.getAttribute("data-id")
          ) {
            console.log("슬라이드에도 적용했습니다.");
            likeFunc[i].querySelector(".like-num").innerText = likeCount;
          }
        }
      }

      let NewLikecount = likeCount;
      window.localStorage.setItem(movieId, JSON.stringify(NewLikecount));

      likeCount = JSON.parse(localStorage.getItem(movieId));
    });
  });
};

// 하단 카드 이미지 호버기능 함수
const MovieCardimgBtn = function (hoverArea) {
  // 마우스 오버 이벤트
  hoverArea.forEach((imgTag) => {
    const goToDetail = imgTag.querySelector(".go-detail");
    const viewBtn = imgTag.querySelector(".view-btn");
    const likeBtn = imgTag.querySelector(".like-btn");
    imgTag.addEventListener("mouseover", (event) => {
      likeBtn.style.display = "flex";
      goToDetail.style.display = "flex";
      viewBtn.style.display = "block";
    });
  });

  // 마우스 아웃 이벤트
  hoverArea.forEach((imgTag) => {
    const goToDetail = imgTag.querySelector(".go-detail");
    const viewBtn = imgTag.querySelector(".view-btn");
    const likeBtn = imgTag.querySelector(".like-btn");
    imgTag.addEventListener("mouseout", (event) => {
      likeBtn.style.display = "none";
      goToDetail.style.display = "none";
      viewBtn.style.display = "none";
    });
  });
};

//데이터 화면에 출력하기
//slide (상단부분)
const makeSlideMovieList = () => {
  const sortedData = [...data].sort((a, b) => b.vote_average - a.vote_average); // 평점순으로 보여주기

  for (let i = 0; i < 3; i++) {
    let movie = sortedData[i];
    let movieId = "like" + movie.id;
    let loadLike = JSON.parse(localStorage.getItem(movieId));

    viewLikeNum = loadLike;
    if (!viewLikeNum) {
      viewLikeNum = 0;
    }
    //평점 하트로 보여주기

    let starImage = '평점: 🤍🤍🤍🤍🤍';
    const showStarImage = () => {
      if (2 <= movie.vote_average && movie.vote_average < 4) {

        starImage = '평점: 💛🤍🤍🤍🤍';
      } else if (4 <= movie.vote_average && movie.vote_average < 6) {
        starImage = '평점: 💛💛🤍🤍🤍';
      } else if (6 <= movie.vote_average && movie.vote_average < 8) {
        starImage = '평점: 💛💛💛🤍🤍';
      } else if (8 <= movie.vote_average && movie.vote_average <= 10) {
        starImage = '평점: 💛💛💛💛🤍';
      }
    };
    showStarImage();

    const slideInner = document.querySelector(".slide-inner");
    slideInner.innerHTML += `<div data-id="${movie.id}" class="slide">
        <div class="slide-num">
          <div class="slide-img">
          <div class="view-btn"></div>
          <div class="like-btn" data-id="${movie.id}" ><p>좋아요</p> <p class="like-num">${viewLikeNum}</p></div>
          <div class="go-detail" data-id="${movie.id}"><p> 상세정보보기</p> </div>
            <img
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              alt="name poster"
            />
          </div>
          <div class="slide-info">
            <div class="title">${movie.title}</div>
            <div class="rating">${starImage}</div>
          </div>
        </div>
      </div>`;
  }

  const slideImgHover = document.querySelectorAll(".slide-img");

  MovieCardimgBtn(slideImgHover);
  slide();
};

const makeMovieList = (data, query) => {
  if (data.length == 0) {
    cardContainer.innerHTML += `죄송합니다. '${query}'(으)로 검색되는 영화가 존재하지 않습니다.`;
  }

  //div card-container (하단부분)
  data.forEach((movie) => {
    let movieId = "like" + movie.id;
    let loadLike = JSON.parse(localStorage.getItem(movieId));

    viewLikeNum = loadLike;
    if (!viewLikeNum) {
      viewLikeNum = 0;
    }
    //평점 하트로 보여주기



    let starImage = '평점: 🤍🤍🤍🤍🤍';
    const showStarImage = () => {
      if (2 <= movie.vote_average && movie.vote_average < 4) {


        starImage = '평점: 💛🤍🤍🤍🤍';
      } else if (4 <= movie.vote_average && movie.vote_average < 6) {
        starImage = '평점: 💛💛🤍🤍🤍';
      } else if (6 <= movie.vote_average && movie.vote_average < 8) {
        starImage = '평점: 💛💛💛🤍🤍';
      } else if (8 <= movie.vote_average && movie.vote_average <= 10) {
        starImage = '평점: 💛💛💛💛🤍';
      }
    };
    showStarImage();

    const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML += `<div data-id="${movie.id}" class="movie-card">
      <div class="card-poster" >
      <div class="view-btn"></div>
      <div class="like-btn" data-id="${movie.id}" ><p>좋아요</p> <p class="like-num">${viewLikeNum}</p></div>
      <div class="go-detail" data-id="${movie.id}"><p> 상세정보보기</p> </div>
      <img
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      alt="name poster"
      />
      </div>
      <div class="card-title">${movie.title}</div>
      <div class="card-rating">${starImage}</div>
    </div>`;
  });

  const BottomimgHover = document.querySelectorAll(".card-poster");

  MovieCardimgBtn(BottomimgHover);
  toDetail();
};

const showData = (query) => {
  const inputData = query.toLowerCase().trim();
  const filteredData = data.filter((d) =>
    d.title.toLowerCase().split(" ").join("").includes(inputData)
  );

  cardContainer.innerHTML = "";
  makeMovieList(filteredData, query);
};

// entrypoint
makeSlideMovieList(data);
makeMovieList(data);
likeFunction();

// event listener
//검색기능
let query;
searchButton.addEventListener("click", () => {
  query = searchInput.value;
  showData(query);
  addSearchItem(query);
});

// 최근 검색어 저장하기
let searchedItems;
const addSearchItem = (keyword) => {
  const searchedItemFromDb = JSON.parse(localStorage.getItem("searchKeyword"));
  const searchItemId =
    searchedItemFromDb?.[searchedItemFromDb.length - 1]?.searchId + 1 || 1;
  const newsearchedItems = { searchItem: keyword, searchId: searchItemId };

  searchedItems = searchedItemFromDb
    ? [...searchedItemFromDb, newsearchedItems]
    : [newsearchedItems];
  window.localStorage.setItem("searchKeyword", JSON.stringify(searchedItems));
  renderSearchItem(searchedItems);
};

// 최근 검색어 그리기
const renderSearchItem = (array) => {
  const searchItemContainer = document.querySelector(
    ".recent-search-item-container"
  );
  searchItemContainer.innerHTML = "";
  array.forEach((item) => {
    // console.log(item.searchId);
    let tempHtml = `<div class="search-item-box" >
                    <span class="search-item">${item.searchItem}</span>
                    <button class="search-delete-btn" id=${item.searchId}>🅧</button>
                  </div>`;
    searchItemContainer.insertAdjacentHTML("beforeend", tempHtml);
  });

  // 최근 검색어 삭제
  const searchDeleteBtn = document.querySelectorAll(".search-delete-btn");
  searchButton.style.background = "transparent";
  const currentSearchItems = JSON.parse(localStorage.getItem("searchKeyword"));

  searchDeleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnId = e.target.getAttribute("id");
      console.log("btnId", btnId);
      console.log("currentSearchItems", currentSearchItems);

      const deletedsearchItem = currentSearchItems.filter(
        (item) => item.searchId !== Number(btnId)
      );

      localStorage.setItem(
        "searchKeyword",
        JSON.stringify([...deletedsearchItem])
      );
      renderSearchItem(JSON.parse(localStorage.getItem("searchKeyword")));
    });
  });
};

renderSearchItem(JSON.parse(localStorage.getItem("searchKeyword")));

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

//인기순 정렬기능
popularityBtn.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => b.popularity - a.popularity);
  cardContainer.innerHTML = "";
  makeMovieList(sortedData);
});
// 평점순 정렬기능
voteBtn.addEventListener("click", () => {
  const sortedData = [...data].sort((a, b) => b.vote_average - a.vote_average);
  cardContainer.innerHTML = "";
  makeMovieList(sortedData);
});
//정렬 되돌리기
originalBtn.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  makeMovieList(data);
});
