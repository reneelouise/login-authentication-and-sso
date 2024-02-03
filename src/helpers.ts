import axios from "axios";

export const Logout = async () => {
  try {
    await axios.get("http://localhost:5000/api/logout");
    localStorage.removeItem("user");
  } catch (error: any) {
    console.error("Error logging out user: ", error);
  }
};

export const validateEmail = (email: string) => {
  const validation = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  return validation.test(email);
};




export const getCurrentUserId = () => {
    const User = localStorage.getItem("user");
    if (User) {
      const idValue = JSON.parse(User)?.id;
      return idValue
    } else {
      console.log("Item not found in localStorage");
    }
  };