import React, { useContext, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Context } from "./Context";
function Login() {
  const { navigate, backendUrl, setUser, user } = useContext(Context);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const res = await axios.get(`${backendUrl}/auth/google/`, {
          params: { code: authResult.code },
        });

        const { email, name, image } = res.data.user;
        const token = res.data.token;

        const userInfo = { email, name, image, token };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(true);
        navigate("/dashbord");
      }
    } catch (error) {
      console.log(error);
      console.error("Error while google code generation", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
    ux_mode: "popup",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashbord");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r via-black/80 from-slate-700 to-slate-600">
      <div className="flex flex-col gap-4 justify-center items-center w-96 h-50 rounded-xl p-px bg-white/10 border border-white/20 backdrop-blur-md text-gray-800  shadow-lg">
        <h1 className="text-2xl text-white font-light">Login</h1>
        <button
          onClick={googleLogin}
          type="button"
          className="w-4/5  bg-white flex items-center justify-center h-12 rounded-full cursor-pointer"
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="googleLogo"
          />
        </button>
      </div>
    </div>
  );
}

export default Login;
