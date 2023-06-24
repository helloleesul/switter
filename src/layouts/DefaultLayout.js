import { Outlet } from "react-router-dom";
import style from "styles/Default.module.css";

function DefaultLayout() {
  return (
    <div className={style.container}>
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
