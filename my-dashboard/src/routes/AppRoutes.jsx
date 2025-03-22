import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Dashboard from "@pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UsersList from "@/pages/users/UsersList";

const ProtedtedRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtedtedRoutes>
            <DashboardLayout />
          </ProtedtedRoutes>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersList />} />
      </Route>
    </Routes>
  );
}
