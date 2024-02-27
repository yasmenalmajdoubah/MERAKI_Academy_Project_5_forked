import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setJobInstitution } from '../../service/redux/reducers/posts/postsSlice';
import axios from 'axios';
import { useRef } from 'react';
import emailjs from "@emailjs/browser";
import "../Jobs/Jobs.css";
const VisitedJobs = () => {
    const { id } = useParams()
    const dispatch=useDispatch()
    const form = useRef();
    const [jobId, setJobId] = useState("");
    const [showJob, setShowJob] = useState(false);
    const [aPPLY, setAPPLY] = useState(false);
    const {token,jobs,userInfo} = useSelector((state) => {
        return {
          token: state.log.token,
          jobs:state.posts.jobs,
          userInfo: state.profile.userInfo,

        };
      });
      const sendEmail = (e) => {
        e.preventDefault();
        const serviceId = "service_tclbful";
        const templateId = "template_qhkw6b1";
        const publicKey = "3Z6VLfroPrdEEhWm8";
        emailjs
          .sendForm(serviceId, templateId, form.current, {
            publicKey: publicKey,
          })
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
      };
      useEffect(() => {    
        axios
      .get(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setJobInstitution(result.data.jobs))
      })
      .catch((err) => {
        console.log(err.message);
      });
        
      }, [])
      
  return (
    <div className="p-6 ml-3 w-full mb-8 mt-3 mx-auto bg-slate-400 rounded-xl shadow-lg   " id='jobs'>

    <div className="flex  mb-5 ">
      <div className="w-2/5 border-e-2 border-gray-600">
        {jobs?.map((job, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setShowJob(true);
                setJobId(job.job_id);
              }} 
            >
              <div class="">
                <div class=" ">
                  <div className="">
                    <div
                      className="container mx-auto p-3  "
                      style={{ width: "400px" }}
                    >
                      <div
                        className="bg-white rounded-md shadow p-3"
                        style={{ width: "400px" }}
                      >
                        <div className="flex">
                          <img
                            src={job.profileimage}
                            alt="Profile Picture"
                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                           
                          />
                          <div className="ml-2">
                            <p
                              className="font-semibold cursor-pointer"
                             
                            >
                              {job.firstname} {job.lastname}
                            </p>

                            {/*  <h6>Amman,Jordan(Onsite)</h6> */}
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
                            <p className="font-semibold text-xl mt-3 cursor-pointer">
                              <span className="me-2 font-medium text-blue-600">
                                Hiring:
                              </span>
                              {job.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* =================    Form Job  Add (Email.Js here )  ======================== */}
      <div className="w-3/5">
        {jobs.map((job, index) => {
          return (
            <>
              {showJob && jobId === job.job_id && (
                <>
                  <div class=" ">
                    <div className="container mx-auto p-3 relative">
                      <div class="bg-white  shadow rounded-md p-7 mb-6 max-w-2xl">
                        
                        {/* ********** */}
                        <h2 className="text-2xl font-bold mt-3 mb-2">
                          {" "}
                          JOB TITLE
                        </h2>
                        <div className="bg-white shadow rounded-md p-3 mb-6 max-w-2xl">
                          <p className="text-gray-800 text-lg mb-4">
                            {" "}
                            {job.title}
                          </p>
                        </div>
                        {/* ********** */}
                        <h2 className="text-xl font-bold mt-1 mb-2">
                          {" "}
                          JOB DESCRIPITON{" "}
                        </h2>
                        <div className="bg-white shadow rounded-md p-3 mb-6 max-w-2xl">
                          <p className="text-gray-800 text-lg mb-4">
                            {" "}
                            {job.discription}
                          </p>
                        </div>
                        {/* *********** */}
                        {console.log(job)}

                        <div className="flex justify-between">
                          <div>
                            <button
                              className="bg-blue-600 hover:bg-blue-700 w-40 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setAPPLY(true)}
                            >
                              APPLY Now
                            </button>
                          </div>
                          <button className="bg-gray-500 w-24 h-10 rounded text-center text-white">Save Later</button>

                        </div>
                        {aPPLY && (
                          <div id="myModal" class="modal2">
                            <div
                              className="modal-content2 "
                              id="app"
                            >
                              <span
                                className="close2"
                                onClick={() => {
                                  setAPPLY(false);
                                }}
                              >
                                &times;
                              </span>
                              <p>APPLY for {job.title}</p>
                              <form ref={form} onSubmit={sendEmail}>
                                <label className="inputForm">to</label>
                                <input
                                  type="text"
                                  name="to_name"
                                  className="inputForm w-6"
                                  value={job.firstname}
                                />

                                <label className="inputForm">subject</label>
                                <input
                                  type="text"
                                  name="job_title"
                                  className="inputForm w-6"
                                  value={job.title}
                                />

                                <label className="inputForm">CV</label>
                                <input
                                  type="text"
                                  name="CV"
                                  className="inputForm w-6"
                                  value="file:///C:/Users/Mahmoud/Mid%20Contracting/AZRAQSLF%20-%20Documents/Out%20box/Submittals/ST%20-%20Structural/153.%20ST-C-MS-153-04%20Method%20Statement%20for%20Stone%20Cladding%20Works/ST-C-MS-153-04%20signed.pdf"
                                />

                                <label className="inputForm">from</label>
                                <input
                                  type="text"
                                  name="from_name"
                                  className="inputForm w-6"
                                  value={userInfo.firstname}
                                />

                                <label className="inputForm">email to</label>
                                <input
                                  type="email"
                                  name="to-email"
                                  className="inputForm w-6"
                                  value={job.email}
                                />
                                <label className="inputForm">from email</label>
                                <input
                                  type="text"
                                  name="from_email"
                                  className="inputForm w-6"
                                  value={userInfo.email}
                                />
                                <label className="inputForm">Message</label>

                                <textarea
                                  name="message"
                                  className="w-96 h-12 p-1 bg-gray-200 rounded-2xl"
                                  placeholder="  Write a massege with email"
                                />
                                <input
                                  type="submit"
                                  value="apply"
                                  className="mt-2 ms-2 mb-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                />
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          );
        })}

        {!showJob && (
          <div className="flex justify-center items-center mt-6">
            <img
              src="https://www.promoshin.com/wp-content/uploads/2022/10/Job-offers.gif"
              className="ml-20  mt-5 rounded-md"
            />
          </div>
        )}
      </div>
    </div>    </div>

  )
}

export default VisitedJobs