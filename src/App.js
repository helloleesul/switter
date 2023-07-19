import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService, onAuthStateChanged, updateCurrentUser } from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      user ? setUserObj(user) : setUserObj(null);
      setInit(true);
    });
  }, []);
  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        // Initializing...
        <div className="initTwitter">
          <FontAwesomeIcon icon={faTwitter} color={"#1D9BF0"} size="5x" />
        </div>
      )}
    </>
  );
}

export default App;
