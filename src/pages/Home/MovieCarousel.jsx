import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar, AiFillPlayCircle } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { getNowPlaying } from "../../utils/utilitis";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const MovieCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // Custom dots container
    appendDots: (dots) => (
      <div className="absolute bottom-4 w-full">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    // Custom dot styling
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-neutral-400/50 hover:bg-accent transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
        <span className="sr-only">Slide</span>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data, isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getNowPlaying(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px] bg-primary-dark/50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary-dark/50">
      <Slider {...settings}>
        {data?.map((movie, index) => (
          <div key={index} className="relative">
            {/* Backdrop Image */}
            <div className="relative h-[600px] w-full">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-8 flex gap-8">
                {/* Poster */}
                <div className="hidden md:block w-64 flex-shrink-0">
                  <div className="relative group rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-primary-dark/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <AiFillPlayCircle className="text-6xl text-accent" />
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-1 text-white max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
                    {movie.title}
                  </h2>
                  <div className="flex items-center gap-4 mb-4 text-neutral-300">
                    <div className="flex items-center">
                      <AiFillStar className="text-accent text-xl mr-1" />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <BsCalendarEvent className="text-accent text-lg mr-1" />
                      <span>{movie.release_date?.split('-')[0]}</span>
                    </div>
                  </div>
                  <p className="text-neutral-200 text-lg mb-6 line-clamp-3">
                    {movie.overview}
                  </p>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-hover text-primary-dark font-semibold rounded-lg transition-colors duration-300"
                  >
                    <AiFillPlayCircle className="mr-2 text-xl" />
                    Watch Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
