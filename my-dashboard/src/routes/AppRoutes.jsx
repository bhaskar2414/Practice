import { Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Home from "@pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
