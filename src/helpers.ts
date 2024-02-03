import axios from "axios";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  role: string;
  isVerified: false;
  token: string;
}

export const Logout = async () => {
  try {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`);
  } catch (error: any) {
    console.error("Error logging out user: ", error);
  }
};

export const validateEmail = (email: string) => {
  const validation = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  return validation.test(email);
};
