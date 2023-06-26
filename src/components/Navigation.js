import { Link, useLocation } from "react-router-dom";
import style from "styles/Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faUser as faUserSolid,
  faPaperPlane as faPaperPlaneSolid,
} from "@fortawesome/free-solid-svg-icons";

function Navigation({ userObj }) {
  const { pathname } = useLocation();

  return (
    <nav className={style.nav}>
      <div className={style.wrap}>
        <ul>
          <li className={style.logo}>
            <FontAwesomeIcon icon={faTwitter} color={"#1D9BF0"} size="2x" />
            <span
              title={
                userObj.displayName
                  ? userObj.displayName
                  : userObj.email.split("@")[0]
              }
            >
              {userObj.displayName
                ? userObj.displayName
                : userObj.email.split("@")[0]}
            </span>
          </li>
          <li className={pathname === "/" ? style.active : null}>
            <Link to="/">
              <span>
                <FontAwesomeIcon
                  icon={pathname === "/" ? faPaperPlaneSolid : faPaperPlane}
                />
                홈
              </span>
            </Link>
          </li>
          <li className={pathname === "/profile" ? style.active : null}>
            <Link to="/profile">
              <span>
                <FontAwesomeIcon
                  icon={pathname === "/profile" ? faUserSolid : faUser}
                />
                프로필
              </span>
            </Link>
          </li>
          <li>
            <footer className={style.footer}>
              &copy; {new Date().getFullYear()} Switter
            </footer>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
