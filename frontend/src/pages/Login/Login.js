import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId } from "../../service/redux/reducers/log/logSlice";
import { setPostURL } from "../../service/redux/reducers/posts/postsSlice";
import axios from "axios";

const Login = () => {
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
        console.log("result.data.user.profileimage", result.data);
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.user_id));
        dispatch(setPostURL("http://localhost:5000/posts/search_2"));
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);

        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  // ==========================================
  return (
    <>
      <div className="bg-zinc-100 h-screen flex items-center justify-evenly">
        <div className="flex-none">
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
                }}
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex-col mt-4">
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
          </div>
        </div>
        <p></p>
        <div className="flex-none">
          <div className="">
            <h1 className="">Welcome WorkedIn Space</h1>
          </div>
          <div className="">
            <img
              height={350}
              width={350}
              src="https://cdni.iconscout.com/illustration/premium/thumb/woman-searching-for-job-4584379-3962168.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
