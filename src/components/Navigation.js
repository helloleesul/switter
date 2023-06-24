import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import style from "styles/Nav.module.css";

function Navigation({ userObj }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={style.nav}>
      <div className={style.wrap}>
        <ul>
          <li className={style.logo}>
            <FontAwesomeIcon icon={faTwitter} color={"#1D9BF0"} size="2x" />
          </li>
          <li
            className={location.pathname === "/" ? style.active : null}
            onClick={(e) => {
              navigate("/", {
                state: {
                  title: e.target.innerText,
                },
              });
            }}
          >
            <Link to="/">
              <span>홈</span>
            </Link>
          </li>
          <li
            className={location.pathname === "/profile" ? style.active : null}
            onClick={(e) => {
              navigate("/profile", {
                state: {
                  title: e.target.innerText,
                },
              });
            }}
          >
            <Link to="/profile">
              {/* {userObj.displayName
            ? userObj.displayName
            : userObj.email.split("@")[0]} */}
              <span>프로필</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
