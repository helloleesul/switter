import { Outlet } from "react-router-dom";
import Navigation from "components/Navigation";
import style from "styles/Main.module.css";

function MainLayout({ userObj }) {
  return (
    <div className={style.container}>
      <Navigation userObj={userObj} />
      <main className={style.main}>
        <Outlet />
        {/* <footer>&copy; {new Date().getFullYear()} Switter</footer> */}
      </main>
    </div>
  );
}

export default MainLayout;
