import { Outlet } from "react-router-dom";
import Navigation from '../components/Navigation/Navigation';
import style from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={style.container}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;