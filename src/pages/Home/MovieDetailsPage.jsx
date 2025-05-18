import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getSingleMovie } from "../../utils/utilitis";
import CommentSection from "./CommentSection";
import { AiFillStar, AiFillClockCircle } from 'react-icons/ai';
import { BiCameraMovie } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';

const MovieDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movieDetails", id], // Fixed query key
    queryFn: () => getSingleMovie(id),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Failed to load movie details",
    });
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center text-accent">
        Failed to load movie details
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Hero Section with Backdrop */}
      <div
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 -mt-32">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Poster */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt={data?.title}
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-primary/50 backdrop-blur-md rounded-lg p-8 shadow-xl">
              {/* Title and Tagline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">
                {data?.title}
              </h1>
              <p className="text-xl md:text-2xl text-neutral-400 mb-6">{data?.tagline}</p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mb-8 text-neutral-300">
                <div className="flex items-center">
                  <BsCalendarDate className="text-accent mr-2" />
                  {data?.release_date?.split('-')[0]}
                </div>
                <div className="flex items-center">
                  <AiFillClockCircle className="text-accent mr-2" />
                  {data?.runtime} min
                </div>
                <div className="flex items-center">
                  <AiFillStar className="text-accent mr-2" />
                  {data?.vote_average?.toFixed(1)}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {data?.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-secondary/30 text-secondary-light text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-accent mb-3">Overview</h2>
                <p className="text-neutral-300 leading-relaxed">{data?.overview}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {data?.homepage && (
                  <a
                    href={data.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-accent hover:bg-accent-hover text-primary-dark font-semibold rounded-lg transition-colors"
                  >
                    <BiCameraMovie className="mr-2" />
                    Official Site
                  </a>
                )}
                <a
                  href="#review"
                  className="flex items-center px-6 py-3 bg-secondary hover:bg-secondary-light text-white font-semibold rounded-lg transition-colors"
                >
                  <AiFillStar className="mr-2" />
                  Write Review
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div id="review" className="mt-16">
          <CommentSection id={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
