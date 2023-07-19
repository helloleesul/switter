import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Routes
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
// Layouts
import MainLayout from "layouts/MainLayout";
import DefaultLayout from "layouts/DefaultLayout";

function AppRouter({ refreshUser, isLoggedIn, userObj }) {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Router> */}
      <Routes>
        {isLoggedIn ? (
          <Route element={<MainLayout userObj={userObj} />}>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </Route>
        ) : (
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Auth />}></Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
