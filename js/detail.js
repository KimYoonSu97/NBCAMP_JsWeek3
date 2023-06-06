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

let id;

function movieDetail() {
  const params = new URLSearchParams(window.location.search);
  id = params.get("id");

  fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
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

      let movieInfoVal = [popularity, release_date, productionName];
      let moneyInfoVal = [budget, rating, revenue, vote];

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
}

movieDetail();

// event listener
document.addEventListener("DOMContentLoaded", () => {
  const reviewRegisterBtn = document.querySelector("#review-register-btn");

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
      } else if (newReview.password.length.trim() > 8) {
        alert("Please enter the password within 8 characters. It's too long");
      } else if (newReview.comment.trim() === "") {
        alert("Please write comment");
      } else {
      let reviewsFromDB = JSON.parse(localStorage.getItem("id"));
    let reviews = reviewsFromDB ? [...reviewsFromDB, newReview] : [newReview];

    window.localStorage.setItem(id, JSON.stringify(reviews));
    showReviews();
      }
  });

  const renderReview = (reviewData) => {
    const { writer, comment, gender } = reviewData;
    const reviewContainer = document.querySelector(".comment-print");

    let tempHtml = `<div class="comment-card">
                      <div class="info">
                        <div class="name">${writer}</div>
                        <div class="gender">${gender}</div>
                      </div>
                      <div class="print">
                        ${comment}
                      </div>
                    </div>`;
    reviewContainer.innerHTML = "";
    reviewContainer.insertAdjacentHTML("beforeend", tempHtml);
  };

  const showReviews = () => {
    const reviews = JSON.parse(window.localStorage.getItem(id));
    if (!reviews) return;

    reviews.forEach((review) => {
      renderReview(review);
    });
  };

  showReviews();
});
