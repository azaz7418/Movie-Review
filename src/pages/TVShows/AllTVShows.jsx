import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPopularTVShows, getTopRatedTVShows } from "../../utils/utilitis";
import { AiFillStar } from 'react-icons/ai';
import { Spin } from 'antd';
import Swal from "sweetalert2";

const AllTVShows = ({ type }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tvshows", type],
    queryFn: () => type === "top-rated" ? getTopRatedTVShows() : getPopularTVShows(),
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
          {type === "top-rated" ? "Top Rated TV Shows" : "Popular TV Shows"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.map((show) => (
            <Link
              key={show.id}
              to={`/tv/${show.id}`}
              className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div 
                className="aspect-[2/3] bg-cover bg-center" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${show.poster_path})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                  {show?.name}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <AiFillStar className="text-accent text-lg" />
                  <span className="text-neutral-200">
                    {show?.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                  <p className="text-sm text-neutral-300 mt-2">
                    {show?.first_air_date?.split('-')[0]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTVShows;