import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashbord from "./Dashbord";
import PageNotFound from "./PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="363157526387-09o9r6hgkcot6uum0lcgsbngt8dgleh0.apps.googleusercontent.com">
        <Login />
      </GoogleOAuthProvider>
    );
  };
  return (
    <div>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
