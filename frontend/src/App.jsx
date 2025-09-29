import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashbord from "./Dashbord";
import PageNotFound from "./PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Context } from "./Context";

const App = () => {
  const { clientId } = useContext(Context);
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
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
