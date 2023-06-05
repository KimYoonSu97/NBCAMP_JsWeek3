//데이터 fetch로 가져오기
const getTopRatedMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGFmODc2MmE0MzI2MjMxOGQyMDI0MjM3ZjY3NjU5NiIsInN1YiI6IjY0NzQ4MjUwZGQ3MzFiMmQ3Y2Q3YTQzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jYVhzGxBgqcGZbhWKQZFfY2XNHHsuW0whPKDt_b22Pc",
    },
  };
  try {
    let res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    let data = await res.json();
    return data["results"];
  } catch (err) {
    console.error({ err });
  }
};
