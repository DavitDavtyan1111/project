//@ts-nocheck

import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuth = Boolean(token);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe());
    if (!isAuth) {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
