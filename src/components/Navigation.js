import { Link } from "react-router-dom";
function Navigation({ userObj }) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">
          {userObj.displayName
            ? userObj.displayName
            : userObj.email.split("@")[0]}
          's Profile
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
