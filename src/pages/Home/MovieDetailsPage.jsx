import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getSingleMovie } from "../../utils/utilitis";
import CommentSection from "./CommentSection";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ["topicDetails", id],
    queryFn: () => getSingleMovie(id),
  });

  isError &&
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message || "Error Happen",
    });

  return (
    <div
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w200${data?.backdrop_path})` }}
      className=" mt-[72px] xl:mt-[94px] md:mt-[94px] h-screen bg-cover bg-no-repeat "
    >
      <div className=" mx-auto p-12 w-full h-full  backdrop-blur-md overflow-y-scroll">
        <div className=" container bg-black/75 xl:h-full md:h-full md:flex xl:flex  gap-8">
          <img
            className="m-auto pt-4 md:pt-0 xl:pt-0 md:m-0 xl:m-0"
            src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
            alt={data?.title}
          />
          <div className="p-4">
            <h2 className="text-2xl xl:text-6xl md:text-6xl font-semibold text-[#d62929]">{data?.title}</h2>
            <h3 className=" text- xl:text-3xl md:text-3xl py-3 px-1 text-white">{data?.tagline}</h3>
            <p className="text-white/40 grid md:grid-cols-3 xl:grid-cols-3 w-full md:gap-14 xl:gap-14 gap-2 mt-3">
              <div className="flex  gap-1">
                {data?.genres?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p>
                        {item?.name}
                        <span>,</span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <p>{data?.release_date}</p>
              <p>
                {data?.runtime} <span>min</span>
              </p>
            </p>
            <div className=" text-white/75 mt-5 pb-3 text-justify pr-3">{data?.overview}</div>
            <div className="text-white/40 font-semibold mt-5">
              Ratings: <samp className="text-[#f8eb38] text-xl font-semibold">{data?.vote_average?.toFixed(1)}</samp>{" "}
            </div>
            <div className="flex justify-end items-center gap-7 mt-20 pr-3 ">
              <Link
                to={data?.homepage}
                className=" py-2 px-5 bg-[#d62929] rounded-md font-semibold text-red-200 hover:text-red-50 active:bg-[#c22f2f]"
              >
                More Details..
              </Link>
              <Link className=" py-2 px-5 bg-[#d62929] rounded-md font-semibold text-red-200 hover:text-red-50 active:bg-[#c22f2f]">
                Review
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end container bg-black/75  gap-8">
            
          <CommentSection id={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
