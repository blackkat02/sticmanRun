import { Link, NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <header className="site-header">
    <div className={css.wrapper}>
      <nav className={css.mainNav}>
        <Link 
          to="/" 
          className={css.navLink}
        >
          <p className={css.logo}>Travel<span className={css.logoSpan}>Trucks</span></p>
        </Link>
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
              to="/campers" 
              className={({ isActive }) => 
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
    </header>
  );
};

export default Navigation;