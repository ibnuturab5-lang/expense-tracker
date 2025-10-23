import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

import { ToastContainer } from "react-toastify";
import EditIncomeModal from "./components/Income/EditIncomeModal";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />
            <Route
              path="/income"
              element={
                <PrivateRoutes>
                  <Income />
                </PrivateRoutes>
              }
            />
            <Route
              path="/income/:id"
              element={
                <PrivateRoutes>
                  <EditIncomeModal />
                </PrivateRoutes>
              }
            />
            <Route
              path="/expense"
              element={
                <PrivateRoutes>
                  <Expense />
                </PrivateRoutes>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          
          />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
