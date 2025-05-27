export const MovieDetails = ({ movie }) => (
  <div className="movie-details">
    <img
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/500x750'
      }
      alt={movie.title}
      width="250"
    />
    <div className="movie-info">
      <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
      <p>Рейтинг: {movie.vote_average.toFixed(1)}/10</p>
      <h3>Огляд</h3>
      <p>{movie.overview || 'Опис відсутній'}</p>
      <h3>Жанри</h3>
      <ul className="genre-list">
        {movie.genres?.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  </div>
);