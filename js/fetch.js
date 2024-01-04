//데이터 fetch로 가져오기
export const getTopRatedMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2YwOWE4NzFkZmY5YjJkNzgwMjIwOGY1YzgxMDkxZiIsInN1YiI6IjY0NzE0YmQ0ODgxM2U0MDEwMzU2YjRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DfdXv7fFFGCxyzVDB3-VdRy1oXg3YTx8ql95PuZnMtE",
    },
  };
  try {
    let res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=ko-kr&page=1",
      options
    );
    let data = await res.json();
    return data["results"];
  } catch (err) {
    console.error({ err });
  }
};
