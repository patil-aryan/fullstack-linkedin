import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/auth/HomePage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./libraries/axios";
import NotificationsPage from "./pages/auth/NotificationsPage";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        toast.error(
          error.response.data.message || "An error occurred. Please try again"
        );
      }
    },
  });

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/notifications"
            element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </Layout>
    </div>
  );
};

export default App;
