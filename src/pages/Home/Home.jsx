import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { 
  getTopRatedMovie, 
  getPopularTVShows, 
  getNowPlaying, 
  getTopRatedTVShows,
  getOnTheAirTVShows,
  getAiringTodayTVShows,
  getPopularMovie
} from "../../utils/utilitis";
import MovieCarousel from "./MovieCarousel";
import { AiFillStar } from 'react-icons/ai';

const Home = () => {
  // Movie Queries
  const { data: topRatedMovies, isError: topRatedError, error: topRatedErrorData } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => getTopRatedMovie(),
  });

  const { data: popularMovies, isError: popularMoviesError, error: popularMoviesErrorData } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => getPopularMovie(),
  });

  const { data: nowPlaying, isError: nowPlayingError, error: nowPlayingErrorData } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => getNowPlaying(),
  });

  // TV Show Queries
  const { data: popularTVShows, isError: popularTVError, error: popularTVErrorData } = useQuery({
    queryKey: ["popularTVShows"],
    queryFn: () => getPopularTVShows(),
  });

  const { data: topRatedTVShows, isError: topRatedTVError, error: topRatedTVErrorData } = useQuery({
    queryKey: ["topRatedTVShows"],
    queryFn: () => getTopRatedTVShows(),
  });

  const { data: onTheAirTVShows, isError: onTheAirError, error: onTheAirErrorData } = useQuery({
    queryKey: ["onTheAirTVShows"],
    queryFn: () => getOnTheAirTVShows(),
  });

  const { data: airingTodayShows, isError: airingTodayError, error: airingTodayErrorData } = useQuery({
    queryKey: ["airingTodayShows"],
    queryFn: () => getAiringTodayTVShows(),
  });

  if (topRatedError || popularMoviesError || nowPlayingError || popularTVError || 
      topRatedTVError || onTheAirError || airingTodayError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: (topRatedErrorData || popularMoviesErrorData || nowPlayingErrorData || popularTVErrorData || 
            topRatedTVErrorData || onTheAirErrorData || airingTodayErrorData)?.response?.data?.message || "Error Happened",
    });
  }

  const renderContentSection = (title, data, type, viewAllLink) => {
    if (!data?.results || data.results.length === 0) {
      return null; // Don't render section if no data
    }

    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-accent">
            {title}
          </h2>
          <Link 
            to={viewAllLink}
            className="text-secondary-light hover:text-accent transition-colors flex items-center gap-2"
          >
            View All
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.results.map((item) => (
            <Link
              key={item.id}
              to={`/${type}/${item.id}`}
              className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div 
                className="aspect-[2/3] bg-cover bg-center" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                  {item?.title || item?.name}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <AiFillStar className="text-accent text-lg" />
                  <span className="text-neutral-200">
                    {item?.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-neutral-300 mt-2">
                    {(item?.release_date || item?.first_air_date)?.split('-')[0]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        {/* Hero Section with Carousel */}
        <section className="mb-16 rounded-xl overflow-hidden shadow-2xl">
          <MovieCarousel />
        </section>

        {/* Movies Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-8">Movies</h2>
          <div className="space-y-16">
            {renderContentSection("Now Playing", nowPlaying, "movie", "/movies/now-playing")}
            {renderContentSection("Popular Movies", popularMovies, "movie", "/movies/popular")}
            {renderContentSection("Top Rated Movies", topRatedMovies, "movie", "/movies/top-rated")}
          </div>
        </div>

        {/* TV Shows Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-8">TV Shows</h2>
          <div className="space-y-16">
            {popularTVShows && renderContentSection("Popular TV Shows", popularTVShows, "tv", "/tv/popular")}
            {topRatedTVShows && renderContentSection("Top Rated TV Shows", topRatedTVShows, "tv", "/tv/top-rated")}
            {airingTodayShows && renderContentSection("Airing Today", airingTodayShows, "tv", "/tv/airing-today")}
            {onTheAirTVShows && renderContentSection("On The Air", onTheAirTVShows, "tv", "/tv/on-the-air")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
