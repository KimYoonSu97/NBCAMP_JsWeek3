export const toDetail = () => {
  //상단부 슬라이드 영화카드 클릭시
  const slideMovieCards = document.querySelectorAll(".slide-img");
  slideMovieCards.forEach((v) => {
    v.addEventListener("click", () => {
      const id = v.getAttribute("data-id");
      location.href = "detail.html?id=" + id;
    });
  });

  //하단부 영화카드 클릭시
  const bottomMovieCards = document.querySelectorAll(".card-poster");
  bottomMovieCards.forEach((v) => {
    v.addEventListener("click", () => {
      const id = v.getAttribute("data-id");
      location.href = "detail.html?id=" + id;
    });
  });
};
