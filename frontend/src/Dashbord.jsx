import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";

const Dashbord = () => {
  const { user, setUser, navigate } = useContext(Context);
  const [imageError, setImageError] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
    setUser(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("userInfo");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  if (!user || Object.keys(user).length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r via-black/85 from-slate-700 to-slate-600">
      <div className="bg-white/10 border border-white/20 backdrop-blur-md text-gray-800 shadow-lg rounded-xl p-8 w-80 text-center">
        {user.image && !imageError ? (
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
            onError={handleImageError}
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
        )}
        <h2 className="text-2xl text-white font-semibold mb-2">{user.name}</h2>
        <p className="text-white mb-4">{user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashbord;
