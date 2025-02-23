import axios from "axios";
// import Auth from "../components/Auth/Auth";

// export const logOutHandler = (dispatch) => {
//   dispatch(Auth({ token: "" }));

//   localStorage.clear();
// };

export const getTopRatedMovie = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const movieList = data.results;
  return movieList || {};
};

export const getNowPlaying = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const movieList = data.results;
  return movieList || {};
};

export const getPopularMovie = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const movieList = data.results;
  return movieList || {};
};

export const getSingleMovie = async (id) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/" + id + "?api_key=6f106c6fda42414da47a5197031c3633"
  );
  return data;
};
export const getComment = async (id) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/movie/" + id + "/reviews?api_key=6f106c6fda42414da47a5197031c3633"
  );
  const commentData = data.results;
  return commentData;
};

export const filterReviewsById = (reviews, id) => {
  return reviews.filter((review) => review.id === id);
};

export const getMovieList = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const allMovieList = data.results;
  // console.log(allMovieList);
  return allMovieList || {};
};
