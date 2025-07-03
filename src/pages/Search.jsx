import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchMovies, searchTVShows } from '../utils/utilitis';
import { AiFillStar } from 'react-icons/ai';
import { Spin } from 'antd';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  const { data: movieResults, isLoading: moviesLoading } = useQuery({
    queryKey: ['searchMovies', searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: searchQuery !== '' && (searchType === 'all' || searchType === 'movies'),
    select: (data) => data.results 
  });

  const { data: tvResults, isLoading: tvLoading } = useQuery({
    queryKey: ['searchTVShows', searchQuery],
    queryFn: () => searchTVShows(searchQuery),
    enabled: searchQuery !== '' && (searchType === 'all' || searchType === 'tv'),
    select: (data) => data.results 
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return; 
  };

  const renderResults = (items, type) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/${type}/${item.id}`}
            className="group relative rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            {item.poster_path ? (
              <div 
                className="aspect-[2/3] bg-cover bg-center" 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="aspect-[2/3] bg-primary-dark/50 flex items-center justify-center">
                <span className="text-neutral-400">No Image</span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-transparent">
              <h3 className="text-lg font-semibold text-neutral-50 mb-2 group-hover:text-accent transition-colors">
                {item?.title || item?.name}
              </h3>
              
              <div className="flex items-center space-x-2">
                <AiFillStar className="text-accent text-lg" />
                <span className="text-neutral-200">
                  {item?.vote_average?.toFixed(1)}
                </span>
              </div>

              <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                <p className="text-sm text-neutral-300 mt-2">
                  {(item?.release_date || item?.first_air_date)?.split('-')[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark/95 to-primary">
      <div className="container mx-auto pt-24 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies or TV shows..."
                className="flex-1 px-4 py-2 rounded-lg bg-primary-dark/50 border border-accent/20 focus:border-accent text-neutral-50 placeholder-neutral-400 outline-none transition-all"
              />
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-4 py-2 rounded-lg bg-primary-dark/50 border border-accent/20 text-neutral-50 outline-none transition-all"
              >
                <option value="all">All</option>
                <option value="movies">Movies</option>
                <option value="tv">TV Shows</option>
              </select>
            </div>
          </form>
        </div>

        {(moviesLoading || tvLoading) && (
          <div className="flex justify-center my-8">
            <Spin size="large" />
          </div>
        )}

        {searchQuery && !moviesLoading && !tvLoading && (
          <div className="space-y-12">
            {(searchType === 'all' || searchType === 'movies') && movieResults?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-accent mb-6">Movies</h2>
                {renderResults(movieResults, 'movie')}
              </div>
            )}

            {(searchType === 'all' || searchType === 'tv') && tvResults?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-accent mb-6">TV Shows</h2>
                {renderResults(tvResults, 'tv')}
              </div>
            )}

            {searchQuery.trim() !== '' && 
              ((searchType === 'all' && (!movieResults?.length && !tvResults?.length)) ||
              (searchType === 'movies' && !movieResults?.length) ||
              (searchType === 'tv' && !tvResults?.length)) && (
              <p className="text-center text-neutral-400 my-12">
                No results found for "{searchQuery}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;