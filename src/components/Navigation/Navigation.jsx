import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';  // Розкоментуйте цей рядок

const Navigation = () => {
  return (
    <div className={css.wrapper}>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/movies" 
              className={({ isActive }) => 
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;