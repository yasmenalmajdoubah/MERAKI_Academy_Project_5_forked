import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./Jobs.css";
const Jobs = () => {
  const form = useRef();

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [showJob, setShowJob] = useState(false);
  const [aPPLY, setAPPLY] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.log.token,
      postURL: state.posts.postURL,
      posts: state.posts.posts,
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
      .get("http://localhost:5000/jobs/", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setJobs(result.data.jobs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex ">
      <div className="w-2/5">
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
                <div class=" bg-gray-100">
                  <div className="">
                    <div
                      className="container mx-auto p-3 "
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
                              {job.firstname} {job.lastname}
                            </p>

                            <h6>Amman,Jordan(Onsite)</h6>
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
                  <div class=" bg-gray-100">
                    <div className="container mx-auto p-3 relative">
                      <div class="bg-white  shadow-md rounded-md p-6 mb-6 max-w-2xl">
                        <div class="container mx-auto p-9">
                          <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center">
                              <img
                                src={job.profileimage}
                                alt="Profile Picture"
                                class="w-12 h-12 rounded-full"
                              />
                              <div class="ml-2">
                                <p class="font-semibold">
                                  {job.firstname} {job.lastname}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold mb-4"> JOB TITLE</h2>
                        <div className="bg-white shadow-md rounded-md p-6 mb-6 max-w-2xl">
                          <p className="text-gray-600 text-lg mb-4">
                            {" "}
                            {job.title}
                          </p>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">
                          {" "}
                          JOB DESCRIPITON{" "}
                        </h2>
                        <div className="bg-white shadow-md rounded-md p-6 mb-6 max-w-2xl">
                          <p className="text-gray-600 text-lg mb-4">
                            {" "}
                            {job.discription}
                          </p>
                        </div>
                        {console.log(job)}
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => setAPPLY(true)}
                        >
                          APPLY
                        </button>
                        {aPPLY && (
                          <div id="myModal" class="modal2">
                            <div
                              className="modal-content2 "
                              style={{ width: "500px" }}
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
                                  value={state.userInfo.firstname}
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
                                  value={state.userInfo.email}
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
          <img
            src="https://www.promoshin.com/wp-content/uploads/2022/10/Job-offers.gif"
            className="ml-20  mt-5 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default Jobs;
