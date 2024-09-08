import { useEffect, useState } from "react";
import "./App.css";

import SignUp from "./SignUp";
import LoginForm from "./LoginForm";
import Profile, { Abc } from "./Profile.tsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./exportLeftMenu.tsx";
import Tasks from "./Tasks.tsx";
function App() {
  interface showWindow {
    loginShow: boolean;
  }

  interface setLogined {
    logined: boolean;
  }

  const [whatForm, setWhatForm] = useState<showWindow>({ loginShow: true });
  const [isLogin, setIsLogin] = useState<setLogined>({ logined: false });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"*"}
            element={
              <LoginForm
                whatForm={whatForm}
                setWhatForm={setWhatForm}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            }
          />
          <Route
            path={"/login"}
            element={
              <LoginForm
                whatForm={whatForm}
                setWhatForm={setWhatForm}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            }
          />
          <Route
            path={"/signup"}
            element={
              <SignUp
                whatForm={whatForm}
                setWhatForm={setWhatForm}
                isLogin={isLogin}
              />
            }
          />

          <Route path={"/profile"} element={<Profile isLogin={isLogin} />} />

          <Route path={"/tasks"} element={<Tasks isLogin={isLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
