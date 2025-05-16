import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getTopRatedMovie } from "../../utils/utilitis";
import PopularMovie from "./PopularMovie";
import MovieCarousel from "./MovieCarousel";
import { AiFillStar } from 'react-icons/ai';

const Home = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["topic"],
    queryFn: () => getTopRatedMovie(),
  });

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Error Happen",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        {/* Hero Section with Carousel */}
        <section className="mb-16 rounded-xl overflow-hidden shadow-2xl">
          <MovieCarousel />
        </section>

        {/* Top Rated Movies Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-accent">
              Top Rated Movies
            </h2>
            <Link 
              to="/movies/top-rated" 
              className="text-secondary-light hover:text-accent transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data?.map((item, index) => (
              <Link
                key={index}
                to={`/movie/${item.id}`}
                className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                {/* Movie Poster */}
                <div 
                  className="aspect-[2/3] bg-cover bg-center" 
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}
                >
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Movie Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
                  <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                    {item?.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <AiFillStar className="text-accent text-lg" />
                    <span className="text-neutral-200">
                      {item?.vote_average?.toFixed(1)}
                    </span>
                  </div>

                  {/* Additional Info on Hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <p className="text-sm text-neutral-300 mt-2">
                      {item?.release_date?.split('-')[0]}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Movies Section */}
        <section className="mb-16">
          <PopularMovie />
        </section>
      </div>
    </div>
  );
};

export default Home;
