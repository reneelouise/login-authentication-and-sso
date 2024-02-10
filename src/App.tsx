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
import { ProfileMenu } from "./components/profile-menu/profile-menu.component";
import { ResetPasswordProtect } from "./pages/auth/reset-password-protect/reset-password-protect.component";

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
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [user, setUser] = useState<IUser>(initialState);
  const [role, setRole]= useState<string>("")

  const isLoggedIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/login-status`
      );
      setIsUserLoggedIn(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role")
  console.log("storedRole:", storedRole)

  

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);


  useEffect(() => {
    if (isUserLoggedIn && storedUser) {
      const userObject = JSON.parse(storedUser)
      setId(userObject.id);
      setName(userObject.name);
      console.log("set id to the: ", userObject.id);

    }
  }, [isUserLoggedIn, storedUser]);
  
  useEffect(() => {
    if (isUserLoggedIn && storedRole) {
      setRole(storedRole);
      console.log("set role to the: ", storedRole);

    }
  }, [isUserLoggedIn, storedRole]);

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
        <Navbar
          isLoggedIn={isUserLoggedIn}
          setIsLoggedIn={setIsUserLoggedIn}
          name={name}
          id={id}
        />
        {isUserLoggedIn && !isLoading && (
          <ProfileMenu isLoggedIn={isUserLoggedIn} id={id} role={role} />
        )}
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
                      id={id}
                      email={email}
                      setEmail={setEmail}
                      setIsLoggedIn={setIsUserLoggedIn}
                      setUser={setUser}
                    />
                  }
                />
              }
            />
            <Route
              path="/register"
              element={<Layout children={<Register />} />}
            />
            {!isUserLoggedIn && (
              <Route
                path="/forgot"
                element={<Layout children={<ForgotPassword />} />}
              />
            )}
            <Route
              path="/resetPassword/:resetToken"
              element={<Layout children={<ResetPassword />} />}
            />
            <Route
              path="/reset-password-protect/:resetToken"
              element={<Layout children={<ResetPasswordProtect />} />}
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
                path={`/login-with-code/${email}`}
                element={
                  <Layout
                    children={
                      <LoginWithAccessCode
                        isLoggedIn={isUserLoggedIn}
                        setIsUserLoggedIn={setIsUserLoggedIn}
                        setUser={setUser}
                        email={email}
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
                  children={<Profile isLoggedIn={isUserLoggedIn} id={id} setName={setName}/>}
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
                  children={
                    <UserList isLoggedIn={isUserLoggedIn} role={role} />
                  }
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
