// MovieCarousel.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from "react-icons/ai";
import { getNowPlaying } from "../../utils/utilitis";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

const MovieCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
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
  const { data } = useQuery({
    queryKey: ["popular"],
    queryFn: () =>getNowPlaying(),
  });

  return (
    <div className="">
      <Slider {...settings}>
        {data && data?.length > 0 ? (
          data?.map((movie, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  alt={movie.title || "Movie Poster"}
                  className="w-full h-[500px] object-cover"
                />
                <div className="p-4 text-white">
                  <h2 className="text-2xl font-semibold mb-2">{movie.title || "Untitled"}</h2>
                  <div className="flex items-center">
                    <AiFillStar className="text-yellow-500 mr-1" />
                    <span className="text-lg">{movie.vote_average || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            <Spin/>
          </p>
        )}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
