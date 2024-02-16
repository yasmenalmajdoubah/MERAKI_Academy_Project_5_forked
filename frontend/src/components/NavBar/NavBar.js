import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setPostURL } from "../../service/redux/reducers/posts/postsSlice";
const NavBar = () => {
  const dispatch=useDispatch()
  
  const state=useSelector((state)=>{
    return {
      userId:state.log.userId
    }
  })
  const userPosts=(userId)=>{
    dispatch(setPostURL(`http://localhost:5000/posts/search_1?user=${userId}`))
  }
  const fieldPosts=()=>{
    dispatch(setPostURL(`http://localhost:5000/posts/search_2`))
  }
  return (
    <div>
      <div className="flex space-x-10 md:flex-auto font-mono Menlo bg-black text-white shadow-lg h-12 items-center">
        <h1 className="flex-1">WorkedIn</h1>
        <div className="flex-1">
          <input type="text" placeholder="Search" />
          <button>search</button>
        </div>
        <div className="flex-1 w-64 space-x-6 ">
          <NavLink to="/" onClick={fieldPosts()}>Home</NavLink>
          <NavLink to="/profile" onClick={userPosts(state.userId)}>Profile</NavLink>
          <NavLink to="/global">Global</NavLink>
          <NavLink to="/discover">Discover</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
