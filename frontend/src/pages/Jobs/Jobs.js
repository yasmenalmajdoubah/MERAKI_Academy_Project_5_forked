import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const state = useSelector((state) => {
        return {
          token: state.log.token,
          postURL: state.posts.postURL,
          posts: state.posts.posts,
        };})

    useEffect(() => {
        axios
          .get("http://localhost:5000/jobs/", {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          })
          .then((result) => {
           setJobs(result.data.jobs)
            console.log("a",result.data.jobs
            );
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    


  return (
   <div>
     { jobs?.map((job, index) => {
 return (
  <div key={index} className="">

<div class="flex h-screen">
<div class="w-2/5 bg-gray-100">
<div className="">
<div
              className="container mx-auto p-3 relative"
              style={{ width: "400px" }}
            >
              <div
                className="bg-white rounded-lg shadow p-4"
                style={{ width: "400px" }}
              >
                <div className="flex items-center">
        <img
          src={job.profileimage}
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-2">
          <p className="font-semibold">
          {job.firstname}  {job.lastname}

          </p>
          
          <h6 >Amman,Jordan(Onsite)</h6>
          <p className="text-gray-500 text-xs">
                      {" "}
                      Published{" "}
                      {job.created_at
                        .split("T")
                        .shift()
                        .split("-")
                        .reverse()
                        .join("-")}
                    </p>
          <p className="font-semibold text-3xl">
            {job.title}
          </p>
          
        </div>
      </div>
</div>
</div>
</div>
</div>
<div class="w-3/5 bg-gray-100">
      
        < div className="container mx-auto p-3 relative">
       <div class="bg-white  shadow-md rounded-md p-6 mb-6 max-w-2xl">
       <div class="container mx-auto p-9">
              <div class="bg-white rounded-lg shadow p-4">
                  <div class="flex items-center">
                      <img src={job.profileimage}
          alt="Profile Picture" class="w-12 h-12 rounded-full"/>
                      <div class="ml-2">
                          <p class="font-semibold">{job.firstname}  {job.lastname}
</p>
                          
                      </div>
                      </div>
                      </div>
                      </div>
        <h2 class="text-2xl font-bold mb-4"> JOB TITLE</h2>
        <div class="bg-white shadow-md rounded-md p-6 mb-6 max-w-2xl"><p class="text-gray-600 text-lg mb-4"> {job.title}</p></div>
        <h2 class="text-2xl font-bold mb-4">  JOB DESCRIPITON </h2>
        <div class="bg-white shadow-md rounded-md p-6 mb-6 max-w-2xl"><p class="text-gray-600 text-lg mb-4"> {job.discription
}</p></div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          APPLY
        </button>
      </div>
    </div>
        </div>



</div>
    
    </div>
 )



     })}
   </div>
   
  )
}

export default Jobs