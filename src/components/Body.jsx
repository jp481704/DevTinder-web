import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import Navbar from "./Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res, "profile");

      dispatch(addUser());
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
