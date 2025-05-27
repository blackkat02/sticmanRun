import { Link, useLocation } from 'react-router-dom';

export const BackButton = () => {
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';

  return (
    <Link to={backLink} className="back-button">
      ← Назад до фільмів
    </Link>
  );
};