const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDgwZWRlZTA1ZDUxZWQ3OWQ1NGYzNmYxYzc5ZjdlZCIsInN1YiI6IjY0NzE0YmQ0ODgxM2U0MDEwMzU2YjRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J4EaZaROzOT41aMCipYrRWayXCxv1JIWJ182czkrun8",
  },
};

let movieTitle = document.querySelector(".movie-title");
let moviePoster = document.querySelector(".movie-poster");
let movieInfo = document.querySelector(".movie-info");
let movieValue = movieInfo.querySelectorAll(".value");
let overView = document.querySelector(".overview");
let detailGenre = document.querySelector(".genre");

let tagLine = document.querySelector(".tag-line");
let tagLineP = tagLine.querySelector("p");
let tagLineDiv = tagLine.querySelector("div");

let moneyTable = document.querySelector(".money-table");
// console.log(moneyTable);
let moneyTableInfo = moneyTable.querySelectorAll(".info");
// console.log(moneyTableInfo);
let imageFlex1 = document.querySelector(".imageFlex1");
let imageFlex2 = document.querySelector(".imageFlex2");
let imageFlex3 = document.querySelector(".imageFlex3");

let id;

function movieDetail() {
  const params = new URLSearchParams(window.location.search);
  id = params.get("id");

  fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options)
    .then((response) => response.json())
    .then((response) => {
      let {
        title,
        vote_average: rating,
        vote_count: vote,
        overview,
        poster_path: imgSrc,
        revenue,
        release_date,
        popularity,
        genres,
        budget,
        production_companies: production,
        tagline,
      } = response;
      let productionName = production[0].name;

      budget = budget.toLocaleString("ko-KR");
      revenue = revenue.toLocaleString("ko-KR");

      let movieInfoVal = [popularity + " 점", release_date, productionName];
      let moneyInfoVal = [
        budget + " 원",
        rating + " 점",
        revenue + " 원",
        vote + " 개",
      ];

      let genre = [];
      for (let i = 0; i < genres.length; i++) {
        genre.push(genres[i].name);
      }

      movieTitle.innerHTML = `${title}`;
      moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${imgSrc}
    " alt="포스터" />`;
      movieInfoVal.forEach((a, b) => {
        movieValue[b].innerHTML = a;
      });
      overView.innerHTML = `${overview}`;

      genre.forEach((a) => {
        let temp_html_genre = `<div>${a}</div>`;
        detailGenre.insertAdjacentHTML("beforeend", temp_html_genre);
      });

      tagLineP.innerHTML = `${tagline}`;
      tagLineDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${imgSrc})`;

      moneyInfoVal.forEach((a, b) => {
        moneyTableInfo[b].innerHTML = a;
      });
    })
    .catch((err) => console.error(err));

  fetch(`https://api.themoviedb.org/3/movie/${id}/images?language=ko`, options)
    .then((item) => item.json())
    .then((item) => {
      console.log(item);
      let imgAll = [...item.backdrops, ...item.logos, ...item.posters];
      console.log(imgAll);
      if (item.posters.length === 0) {
        let gallerySection = document.querySelector(".gallery");
        gallerySection.remove();
      } else {
        imgAll.forEach((img, index) => {
          let { file_path: imgUrl } = img;
          console.log(imgUrl);
          if (index === 0 || index % 3 === 0) {
            let temp_html_img = `<img src="https://image.tmdb.org/t/p/w500/${imgUrl}
          " alt="포스터" />`;
            imageFlex1.insertAdjacentHTML("beforeend", temp_html_img);
          } else if (index === 1 || index % 3 === 1) {
            let temp_html_img = `<img src="https://image.tmdb.org/t/p/w500/${imgUrl}
          " alt="포스터" />`;
            imageFlex2.insertAdjacentHTML("beforeend", temp_html_img);
          } else if (index === 2 || index % 3 === 2) {
            let temp_html_img = `<img src="https://image.tmdb.org/t/p/w500/${imgUrl}
          " alt="포스터" />`;
            imageFlex3.insertAdjacentHTML("beforeend", temp_html_img);
          }
        });
      }
    })
    .catch((err) => console.error(err));
}

movieDetail();

// event listener
document.addEventListener("DOMContentLoaded", () => {
  const reviews = JSON.parse(window.localStorage.getItem(id));

  const reviewRegisterBtn = document.querySelector("#review-register-btn");
  const filtersBtn = document.querySelector(".filters");

  reviewRegisterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newReview = {
      writer: document.querySelector("#review-writer").value,
      comment: document.querySelector("#review-comment").value,
      password: document.querySelector("#review-password").value,
      gender: document.querySelector("input[name='gender']:checked").value,
    };

    if (newReview.writer.trim() === "") {
      alert("Please write your name");
    } else if (newReview.password.trim() === "") {
      alert("Please enter the password within 8 characters.");
    } else if (newReview.password.length > 8) {
      alert("Please enter the password within 8 characters. It's too long");
    } else if (newReview.comment.trim() === "") {
      alert("Please write comment");
    } else {
      let reviewsFromDB = JSON.parse(localStorage.getItem(id));

      // ?.
      // undefied || 1 => 1
      // reviewFromDB[마지막 객체 인덱스].id + 1
      newReview["id"] = reviewsFromDB?.[reviewsFromDB.length - 1]?.id + 1 || 1;
      let reviews = reviewsFromDB ? [...reviewsFromDB, newReview] : [newReview];

      window.localStorage.setItem(id, JSON.stringify(reviews));
      showReviews(reviews);
      location.reload();
    }
  });

  filtersBtn.addEventListener("click", (e) => {
    const reviews = JSON.parse(window.localStorage.getItem(id));
    const target = e.target;
    if (target.tagName !== "P") return;

    const selectedGender = target.getAttribute("data-gender");
    const filteredReviews = reviews.filter((r) => {
      if (selectedGender === "남성" || selectedGender === "여성") {
        return r.gender === selectedGender;
      } else {
        return true;
      }
    });
    renderReview(filteredReviews);
  });

  const renderReview = (reviewData) => {
    if (!reviewData) return;

    const reviewContainer = document.querySelector(".comment-print");
    reviewContainer.innerHTML = "";

    reviewData.forEach((review) => {
      const { writer, comment, gender, id } = review;
      let tempHtml = `<div class="comment-card" >
                        <div class="info">
                          <div class="name">${writer}</div>
                          <div class="gender">${gender}</div>
                        </div>
                        <div class="print">
                          ${comment}
                        </div>
                        <div class="delete-btn" data-id=${id}>삭제</div>
                        <div class="modify-btn" data-id=${id}>수정</div>
                      </div>`;
      reviewContainer.insertAdjacentHTML("beforeend", tempHtml);
    });
  };

  const showReviews = (reviews) => {
    if (!reviews) return;
    //showRebiews 한번만 실행되게끔
    renderReview(reviews);
  };

  showReviews(reviews);

  let deleteBtn = document.querySelectorAll(".delete-btn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dataId = e.target.getAttribute("data-id");
      const pw = prompt("password please");

      // local storage에서 id에 해당하는 리뷰를 가져와야 함
      const parsedReviews = JSON.parse(localStorage.getItem(id));
      const review = parsedReviews.find((r) => r.id === +dataId);
      // parsedReviews = [{comment: '처음에 적혀있던 리뷰'}, {}]
      console.log("parsedReviews", parsedReviews);
      if (review.password === pw) {
        const deletedReviews = parsedReviews.filter(
          (item) => item.id !== review.id
        );

        console.log("deletedReviews", deletedReviews);
        localStorage.setItem(id, JSON.stringify([...deletedReviews]));

        // dom 핸들링
        showReviews(JSON.parse(localStorage.getItem(id)));
      } else {
        alert("패스워드 틀림 ㅎㅋ");
      }
      location.reload();
    });
  });

  let modifyBtn = document.querySelectorAll(".modify-btn");

  modifyBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const dataId = e.target.getAttribute("data-id");
      const pw = prompt("password please");

      // local storage에서 id에 해당하는 리뷰를 가져와야 함
      const parsedReviews = JSON.parse(localStorage.getItem(id));
      const review = parsedReviews.find((r) => r.id === +dataId);
      // parsedReviews = [{comment: '처음에 적혀있던 리뷰'}, {}]
      console.log(review);
      if (review.password === pw) {
        const modifyReview = prompt("바꿀거 입력해라.");

        // 스토리지 리뷰 객체의 comment 필드 변경
        review.comment = modifyReview;
        // parsedReviews = [{comment: 'zzzz'}, {}]
        localStorage.setItem(id, JSON.stringify([...parsedReviews]));

        // dom 핸들링
        showReviews(JSON.parse(localStorage.getItem(id)));
      } else {
        alert("패스워드 틀림 ㅎㅋ");
      }
      location.reload();
    });
  });
});
