import { useQuery } from "@tanstack/react-query";
import { getPopularMovie } from "../../utils/utilitis";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PopularMovie = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["popular"],
    queryFn: () => getPopularMovie(),
  });
  // console.log(data);

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Error Happen",
    });
  }
  return (
    <div className="">
      <div>
        <div className="text-xl font-bold text-black">Top Rated Movie</div>
        <div className=" grid grid-cols-2 xl:grid-cols-5 md:grid-cols-5 gap-4 p-4">
          {data?.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/movie/${item.id}`}
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w200${item.poster_path})` }}
                className=" shadow-md relative bg-cover bg-no-repeat h-[370px]"
              >
                <div className=" absolute bottom-0 left-0 p-3 bg-black/50 w-full text-white">
                  <h2 className="text-lg font-semibold  ">{item?.title}</h2>
                  <p className="text-[#d62929]">Rating: {item?.vote_average?.toFixed(1)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularMovie;
