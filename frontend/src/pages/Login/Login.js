import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId } from "../../service/redux/reducers/log/logSlice";
import { setPostURL } from "../../service/redux/reducers/posts/postsSlice";
import axios from "axios";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = () => {
  const [loginLoader, setLoginLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      userId: state.log.userId,
    };
  });

  // ===================================
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  // ===================================
  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        {
          setLoginLoader(false);
          dispatch(setLogin(result.data.token));
          dispatch(setUserId(result.data.user_id));
          dispatch(setPostURL("http://localhost:5000/posts/search_2"));
        }
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        setLoginLoader(false);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  // ==========================================
  return (
    <>
      <div className="bg-zinc-200 h-screen flex-col overflow-hidden">
        <div className="flex items-center pt-2 pb-1 ps-5">
          <div>
            <img
              width={50}
              height={50}
              className="rounded mt-1 ms-2 me-2"
              src="https://logopond.com/logos/e5621829d529b5af38ac12f9447e8388.png"
            />
          </div>
          <h1 className="flex font-bold text-4xl">WorkedIn</h1>
        </div>

        <div className="bg-zinc-200 h-screen flex items-center justify-around">
          {/* ============= inputs ==== left side ============== */}
          <div className="flex-none ms-20 mb-8">
            <h1 className="font-bold text-3xl text-center">Sign In</h1>
            <div>
              <form onSubmit={login}>
                <br />

                <input
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  style={{ outline: "none" }}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  style={{ outline: "none" }}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <p className="text-red-600 text-sm font-bold">{message}</p>
                <button
                  className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
                  onClick={(e) => {
                    login(e);
                    setLoginLoader(true);
                  }}
                >
                  Login
                </button>
              </form>
            </div>

            <div className="flex-col mt-2">
              <p className="text-sm ms-2 mb-2">Don't have account?</p>
              <button
                className="bg-blue-950 text-white w-64 h-12 border-2 rounded-md shadow-lg"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {" "}
                Register Here
              </button>

              <div className="flex justify-center items-center mt-4 w-full h-8">
                {
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const credentialResponsedecode = jwtDecode(
                        credentialResponse.credential
                      );
                      console.log("dataaa", credentialResponsedecode);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                }
              </div>
            </div>
          </div>

          <p></p>
          {/* ========== Image Right side ========= */}
          <div className="flex mb-4 me-20">
            <div className=""></div>
            <div className="">
              <img
                height={450}
                width={450}
                src="https://cdni.iconscout.com/illustration/premium/thumb/woman-searching-for-job-4584379-3962168.png"
              />
            </div>
          </div>
        </div>

        {/* ============= loader login ================= */}
        {loginLoader && (
          <>
            {" "}
            <div
              id="myModal"
              className="modalLogin flex justify-center items-center pb-28"
            >
              <div className="loaderLogin"></div>
            </div>
          </>
        )}
        {/* ========================================================= */}
      </div>
    </>
  );
};

export default Login;
