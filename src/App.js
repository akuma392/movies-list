import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Pages/Header";
import Footer from "./components/Pages/Footer";
import Home from "./components/Pages/Home";
import Movies from "./components/Pages/Movies";
import TVSeries from "./components/Pages/TVSeries";
import Profile from "./components/Pages/Profile";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { ThemeContextProvider } from "./components/contextApi/ThemeContext";
import { AuthProvider, useAuth } from "./components/contextApi/AuthContext";
import Layout from "./components/Pages/Layout";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <Router>

          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tvseries" element={<TVSeries />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>

        </Router>
      </AuthProvider>
    </ThemeContextProvider >
  );
};

export default App;
