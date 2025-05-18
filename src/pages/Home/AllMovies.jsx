/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getTopRatedMovie, getPopularMovie, getNowPlaying } from "../../utils/utilitis";
import { AiFillStar } from 'react-icons/ai';
import { Spin, Pagination } from 'antd';
import Swal from "sweetalert2";
import { useState } from "react";

const AllMovies = ({ type }) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", type, page],
    queryFn: () => {
      const params = { page };
      switch(type) {
        case "top-rated":
          return getTopRatedMovie(params);
        case "now-playing":
          return getNowPlaying(params);
        default:
          return getPopularMovie(params);
      }
    }
  });

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Error Happened",
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-8">
          {type === "top-rated" ? "Top Rated Movies" : 
           type === "now-playing" ? "Now Playing Movies" : 
           "Popular Movies"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {data?.results?.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div 
                className="aspect-[2/3] bg-cover bg-center" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                  {movie?.title}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <AiFillStar className="text-accent text-lg" />
                  <span className="text-neutral-200">
                    {movie?.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-neutral-300 mt-2">
                    {movie?.release_date?.split('-')[0]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <Pagination
            current={page}
            total={data?.total_results}
            pageSize={20} // TMDB API default page size
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
            className="text-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default AllMovies;