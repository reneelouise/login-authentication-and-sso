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
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { getCurrentUserId } from "./helpers";

axios.defaults.withCredentials = true; // enable axios to get user credentials

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");

  console.log("is logged in: ", isUserLoggedIn);
  console.log("id is: ", id);

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/login-status"
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
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    if (isUserLoggedIn) {
      const userId = getCurrentUserId();
      console.log("id: ", userId);
      return setId(userId);
    }
    setId("")
  }, [isUserLoggedIn]);

  useEffect(() => {
    const handleRouteChange = () => {
      isLoggedIn();
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isUserLoggedIn} setIsLoggedIn={setIsUserLoggedIn} />
        {isLoading && !id && !isLoggedIn ? (
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
                      setIsLoggedIn={setIsUserLoggedIn}
                      id={id}
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
              path={`/change-password/${id}`}
              element={
                <Layout
                  children={
                    <ChangePassword
                      isLoggedIn={isUserLoggedIn}
                      setIsLoggedIn={setIsUserLoggedIn}
                      id={id}
                    />
                  }
                />
              }
            />
            {!isUserLoggedIn && (
              <Route
                path={`/login-with-code/${id}`}
                element={
                  <Layout
                    children={
                      <LoginWithAccessCode
                        isLoggedIn={isUserLoggedIn}
                        setIsUserLoggedIn={setIsUserLoggedIn}
                        id={id}
                      />
                    }
                  />
                }
              />
            )}
            <Route
              path={`/profile/${id}`}
              element={
                <Layout
                  children={<Profile isLoggedIn={isUserLoggedIn} id={id} />}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<Layout children={<Dashboard />} />}
            />
            <Route
              path={`/users/${id}`}
              element={
                <Layout
                  children={<UserList isLoggedIn={isUserLoggedIn} id={id} />}
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
