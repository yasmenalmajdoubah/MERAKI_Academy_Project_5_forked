import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExperience,setWorkNow } from "../../service/redux/reducers/profile/profileSlice";
export const ProfileBody = () => {
  const dispatch=useDispatch()
  const {userInfo,userId,experience,token} = useSelector((state) => {
    return {
      userInfo: state.profile.userInfo,
      userId:state.log.userId,
      experience:state.profile.experience,
      token:state.log.token
    };
  });
  const getexperience=()=>{
    axios.get(`http://localhost:5000/users/experience/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
      dispatch(setExperience(result.data.result))
      dispatch(setWorkNow(result.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(() => {
    getexperience()
  
    
  }, [])
  
  return (
    <div className="">
      <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black" id="Education">Education</div>
          <p className="text-slate-500">{userInfo.education}</p>
        </div>
      </div>
      <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black" id="Skills" >Skills</div>
          <p className="text-slate-500">{userInfo.skills}</p>
        </div>
      </div>
      <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black" id="interests">interests</div>
          <p class="text-slate-500">

          </p>
        </div>
      </div>
      <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div className="text-xl font-medium text-black" id="Experience">Experience</div>
          {experience&&experience.map((elem)=>{
            return(
              <div>
                <p>{elem.workdiscription} in {elem.institutionname} from {elem.startdate} to {elem.enddate}</p>
             </div>
            )
          })}
          
          <p className="text-slate-500">
           
          </p>
        </div>
      </div>
    </div>
  );
};
