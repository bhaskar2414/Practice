import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Dashboard from "@pages/Dashboard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UsersList from "@/pages/users/UsersList";
import CreateUser from "@/pages/users/CreateUser";
import ProductsList from "@/pages/products/ProductList";
import ProductDetails from "@/pages/products/[id]/page";
import CategoriesList from "@/pages/categories/CategoriesList";
import CategoryForm from "@/pages/categories/CategoryForm";
import ProfileSettings from "@/pages/profile/ProfileSettings";
import ProductForm from "@/components/products/ProductForm";
//import UserDetails from "@/pages/users/UserDetails";

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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtedtedRoutes>
            <DashboardLayout />
          </ProtedtedRoutes>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Categories Routes */}
        <Route path="categories">
          <Route index element={<CategoriesList />} />
          <Route path="new" element={<CategoryForm />} />
          <Route path=":id/edit" element={<CategoryForm />} />
        </Route>

        {/* Products Routes */}
        <Route path="products">
          <Route index element={<ProductsList />} />
          <Route path="new" element={<ProductForm />} />
          <Route path=":id/edit" element={<ProductForm />} />
        </Route>

        {/* Users Routes */}
        <Route path="users">
          <Route index element={<UsersList />} />
          {/* <Route path=":id" element={<UserDetails />} /> */}
        </Route>

        {/* Profile Settings */}
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Not Found */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
