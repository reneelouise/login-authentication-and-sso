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
import {ToastContainer} from "react-toastify"



axios.defaults.withCredentials = true // enable axios to get user credentials

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout children={<Home />} />} />
          <Route path="/login" element={<Layout children={<Login />} />} />
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
            path="/change-password"
            element={<Layout children={<ChangePassword />} />}
          />
          <Route
            path="/login-with-code/:email"
            element={<Layout children={<LoginWithAccessCode />} />}
          />
          <Route path="/profile" element={<Layout children={<Profile />} />} />
          <Route
            path="/dashboard"
            element={<Layout children={<Dashboard />} />}
          />
          <Route path="/users" element={<Layout children={<UserList />} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
