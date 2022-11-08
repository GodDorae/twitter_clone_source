import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <>
              <Route element={<Home userObj={userObj} />} path="/" />
              <Route
                element={
                  <Profile
                    userObj={userObj}
                    refreshUser={refreshUser}
                  />
                }
                path="/profile"
              />
            </>
          ) : (
            <>
              <Route element={<Auth />} path="/" />
              <Route element={<Navigate replace to="/" />} path="*" />
            </>
          )}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default AppRouter;
