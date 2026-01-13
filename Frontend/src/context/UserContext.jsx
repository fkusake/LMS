import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [valid,setValid] = useState(false);
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const response = await axios.post(
        "https://lms-w4dk.onrender.com/api/users/signin",
        { email, password }
      );
      setUserData(response.data);
      setValid(true);
      localStorage.setItem("userToken", JSON.stringify(response.data.signCode));
      toast.success("Login successful");
      return true
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Server error");
      return false;
    }
  }
  async function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    setValid(false);
    navigate("/login");
  }

  return (
    <UserContext.Provider value={{ userData, login, logout, valid}}>
      {children}
    </UserContext.Provider>
  );
}

export const getUserContext = () => useContext(UserContext);
