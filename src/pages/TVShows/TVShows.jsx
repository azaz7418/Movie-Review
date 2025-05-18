import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPopularTVShows, getTopRatedTVShows } from "../../utils/utilitis";
import { AiFillStar } from "react-icons/ai";
import { Spin } from "antd";
import Swal from "sweetalert2";

const TVShows = () => {
  const {
    data: popularShows,
    isLoading: popularLoading,
    isError: popularError,
    error: popularErrorData,
  } = useQuery({
    queryKey: ["popularTVShows"],
    queryFn: () => getPopularTVShows(),
  });

  const {
    data: topRatedShows,
    isLoading: topRatedLoading,
    isError: topRatedError,
    error: topRatedErrorData,
  } = useQuery({
    queryKey: ["topRatedTVShows"],
    queryFn: () => getTopRatedTVShows(),
  });

  if (popularError || topRatedError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: (popularErrorData || topRatedErrorData)?.response?.data?.message || "Error Happened",
    });
  }

  if (popularLoading || topRatedLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        {/* Popular TV Shows Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-accent">Popular TV Shows</h2>

            <Link to="/tv/popular" className="text-secondary-light hover:text-accent transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularShows?.results?.map((show) => (
              <Link
                key={show.id}
                to={`/tv/${show.id}`}
                className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {/* Show Poster */}
                <div
                  className="aspect-[2/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${show.poster_path})` }}
                >
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Show Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                  <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                    {show?.name}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <AiFillStar className="text-accent text-lg" />
                    <span className="text-neutral-200">{show?.vote_average?.toFixed(1)}</span>
                  </div>

                  {/* Additional Info on Hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <p className="text-sm text-neutral-300 mt-2">{show?.first_air_date?.split("-")[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Rated TV Shows Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-accent">Top Rated TV Shows</h2>
            <Link to="/tv/top-rated" className="text-secondary-light hover:text-accent transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topRatedShows?.results?.map((show) => (
              <Link
                key={show.id}
                to={`/tv/${show.id}`}
                className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {/* Show Poster */}
                <div
                  className="aspect-[2/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${show.poster_path})` }}
                >
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Show Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                  <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                    {show?.name}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <AiFillStar className="text-accent text-lg" />
                    <span className="text-neutral-200">{show?.vote_average?.toFixed(1)}</span>
                  </div>

                  {/* Additional Info on Hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <p className="text-sm text-neutral-300 mt-2">{show?.first_air_date?.split("-")[0]}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TVShows;
