import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  LoginWithAccessCode,
  Profile,
  Register,
  ResetPassword,
  VerifyAccount,
  ChangePassword,
  UserList,
} from "./pages";
import { Layout } from "./components/layout";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { IUser } from "./helpers";
import {ProfileMenu} from './components/profile-menu/profile-menu.component'

axios.defaults.withCredentials = true; // enable axios to get user credentials

const initialState: IUser = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  bio: "",
  photo: "",
  role: "",
  isVerified: false,
  token: "",
};

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [user, setUser] = useState<IUser>(initialState);

  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/login-status`
      );
      console.log("is user logged in baby?", response);
      setIsUserLoggedIn(response.data);
    } catch (error) {
      toast.error("Not authorised, please login", {
        position: "bottom-center",
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  }, [])

  const { _id, role, name } = user;

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleRouteChange = () => {
      isLoggedIn();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isLoggedIn]);

  console.log("user: ", user);

  return (
    <>
      <BrowserRouter>
        <Navbar
          isLoggedIn={isUserLoggedIn}
          setIsLoggedIn={setIsUserLoggedIn}
          name={name}
          id={_id}
        />
        {isUserLoggedIn && !isLoading && <ProfileMenu isLoggedIn={isUserLoggedIn} id={_id} role={role} />}
        {isLoading && !_id && !isLoggedIn ? (
          <h1>Loading baby!</h1>
        ) : (
          <Routes>
            <Route path="/" element={<Layout children={<Home />} />} />
            <Route
              path="/login"
              element={
                <Layout
                  children={
                    <Login
                      isLoggedIn={isUserLoggedIn}
                      email={email}
                      setEmail={setEmail}
                      setIsLoggedIn={setIsUserLoggedIn}
                      setUser={setUser}
                      id={_id}
                    />
                  }
                />
              }
            />
            <Route
              path="/register"
              element={<Layout children={<Register />} />}
            />
            <Route
              path="/forgot"
              element={<Layout children={<ForgotPassword />} />}
            />
            <Route
              path="/resetPassword/:resetToken"
              element={<Layout children={<ResetPassword />} />}
            />
            <Route
              path="/verify/:verificationToken"
              element={<Layout children={<VerifyAccount />} />}
            />
            <Route
              path={`/change-password/${_id}`}
              element={
                <Layout
                  children={
                    <ChangePassword
                      isLoggedIn={isUserLoggedIn}
                      setIsLoggedIn={setIsUserLoggedIn}
                      id={_id}
                    />
                  }
                />
              }
            />
            {!isUserLoggedIn && (
              <Route
                path={`/login-with-code/${email}`}
                element={
                  <Layout
                    children={
                      <LoginWithAccessCode
                        isLoggedIn={isUserLoggedIn}
                        setIsUserLoggedIn={setIsUserLoggedIn}
                        user={user}
                        setUser={setUser}
                        email={email}
                        id={_id}
                      />
                    }
                  />
                }
              />
            )}
            <Route
              path={`/profile/${_id}`}
              element={
                <Layout
                  children={
                    <Profile isLoggedIn={isUserLoggedIn} id={_id} user={user}/>
                  }
                />
              }
            />
            <Route
              path="/dashboard"
              element={<Layout children={<Dashboard />} />}
            />
            <Route
              path={`/users/${_id}`}
              element={
                <Layout
                  children={<UserList isLoggedIn={isUserLoggedIn} id={_id} role={role} />}
                />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
