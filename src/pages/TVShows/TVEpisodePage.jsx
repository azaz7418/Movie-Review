import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getTVShowEpisodeDetails, getSingleTVShow } from '../../utils/utilitis';
import { Spin } from 'antd';
import { AiFillStar } from 'react-icons/ai';

const TVEpisodePage = () => {
  const { id, seasonNumber, episodeNumber } = useParams();

  const { data: episodeDetails, isLoading: episodeLoading } = useQuery(
    ['tvEpisode', id, seasonNumber, episodeNumber],
    () => getTVShowEpisodeDetails(id, seasonNumber, episodeNumber)
  );

  const { data: showDetails, isLoading: showLoading } = useQuery(
    ['tvShow', id],
    () => getSingleTVShow(id)
  );

  if (episodeLoading || showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        <div className="mb-8 space-y-2">
          <Link to={`/tv/${id}`} className="text-accent hover:text-accent/80 transition-colors block">
            ← Back to {showDetails?.name}
          </Link>
          <Link 
            to={`/tv/${id}/season/${seasonNumber}`} 
            className="text-accent hover:text-accent/80 transition-colors block"
          >
            ← Back to Season {seasonNumber}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            {episodeDetails?.still_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${episodeDetails.still_path}`}
                alt={episodeDetails?.name}
                className="w-full rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-full aspect-video bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-neutral-500">No image available</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              {episodeDetails?.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <AiFillStar className="text-accent text-xl" />
                <span className="text-neutral-200 text-lg">
                  {episodeDetails?.vote_average?.toFixed(1)}
                </span>
              </div>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-300">
                Season {seasonNumber}, Episode {episodeNumber}
              </span>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-300">
                {episodeDetails?.air_date}
              </span>
            </div>

            <div className="text-neutral-300 mb-8">
              <p>{episodeDetails?.overview || 'No overview available.'}</p>
            </div>

            {episodeDetails?.guest_stars?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-accent mb-4">Guest Stars</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {episodeDetails.guest_stars.map((star) => (
                    <div key={star.id} className="text-neutral-300">
                      <img
                        src={star.profile_path
                          ? `https://image.tmdb.org/t/p/w200${star.profile_path}`
                          : '/placeholder-person.jpg'
                        }
                        alt={star.name}
                        className="w-full rounded-lg mb-2"
                      />
                      <p className="font-medium text-neutral-200">{star.name}</p>
                      <p className="text-sm text-neutral-400">{star.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {episodeDetails?.crew?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-accent mb-4">Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {episodeDetails.crew.map((member, index) => (
                    <div key={`${member.id}-${index}`} className="text-neutral-300">
                      <p className="font-medium text-neutral-200">{member.name}</p>
                      <p className="text-sm text-neutral-400">{member.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVEpisodePage;