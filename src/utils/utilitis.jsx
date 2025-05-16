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

export const getPopularTVShows = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/popular?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const tvShowList = data.results;
  return tvShowList || {};
};

export const getTopRatedTVShows = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const tvShowList = data.results;
  return tvShowList || {};
};

export const getSingleTVShow = async (id) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/" + id + "?api_key=6f106c6fda42414da47a5197031c3633"
  );
  return data;
};

export const getTVShowReviews = async (id) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/" + id + "/reviews?api_key=6f106c6fda42414da47a5197031c3633"
  );
  const reviewData = data.results;
  return reviewData;
};

// TV Series API Endpoints
export const getAiringTodayTVShows = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/airing_today?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const tvShowList = data.results;
  return tvShowList || {};
};

export const getOnTheAirTVShows = async (params) => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/tv/on_the_air?api_key=6f106c6fda42414da47a5197031c3633",
    { params }
  );
  const tvShowList = data.results;
  return tvShowList || {};
};

export const getTVShowSeasonDetails = async (tvId, seasonNumber) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=6f106c6fda42414da47a5197031c3633`
  );
  return data;
};

export const getTVShowEpisodeDetails = async (tvId, seasonNumber, episodeNumber) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=6f106c6fda42414da47a5197031c3633`
  );
  return data;
};

export const searchTVShows = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/tv?api_key=6f106c6fda42414da47a5197031c3633&query=${encodeURIComponent(query)}`
  );
  return data.results || [];
};

export const getTVShowCredits = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=6f106c6fda42414da47a5197031c3633`
  );
  return data;
};

export const getSimilarTVShows = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/similar?api_key=6f106c6fda42414da47a5197031c3633`
  );
  return data.results || [];
};

export const getTVShowVideos = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=6f106c6fda42414da47a5197031c3633`
  );
  return data.results || [];
};
