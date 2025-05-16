import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getTVShowSeasonDetails, getSingleTVShow } from '../../utils/utilitis';
import { Spin } from 'antd';
import { AiFillStar } from 'react-icons/ai';

const TVSeasonPage = () => {
  const { id, seasonNumber } = useParams();

  const { data: seasonDetails, isLoading: seasonLoading } = useQuery(
    ['tvSeason', id, seasonNumber],
    () => getTVShowSeasonDetails(id, seasonNumber)
  );

  const { data: showDetails, isLoading: showLoading } = useQuery(
    ['tvShow', id],
    () => getSingleTVShow(id)
  );

  if (seasonLoading || showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        <div className="mb-8">
          <Link to={`/tv/${id}`} className="text-accent hover:text-accent/80 transition-colors">
            ← Back to {showDetails?.name}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            {seasonDetails?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`}
                alt={seasonDetails?.name}
                className="w-full rounded-lg shadow-xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-neutral-500">No poster available</span>
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              {seasonDetails?.name}
            </h1>

            <div className="text-neutral-300 mb-6">
              <p>{seasonDetails?.overview || 'No overview available.'}</p>
            </div>

            <div className="mb-8">
              <p className="text-neutral-400">
                Air Date: <span className="text-neutral-200">{seasonDetails?.air_date}</span>
              </p>
              <p className="text-neutral-400">
                Episodes: <span className="text-neutral-200">{seasonDetails?.episodes?.length}</span>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-accent mb-4">Episodes</h2>
            <div className="space-y-4">
              {seasonDetails?.episodes?.map((episode) => (
                <Link
                  key={episode.id}
                  to={`/tv/${id}/season/${seasonNumber}/episode/${episode.episode_number}`}
                  className="block bg-primary-dark/50 rounded-lg p-4 hover:bg-primary-dark transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50 group-hover:text-accent transition-colors">
                        {episode.episode_number}. {episode.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        Air Date: {episode.air_date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <AiFillStar className="text-accent" />
                      <span className="text-neutral-300">{episode.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeasonPage;