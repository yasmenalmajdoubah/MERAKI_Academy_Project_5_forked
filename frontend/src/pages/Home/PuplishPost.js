import React, { useEffect, useState } from "react";
import "./Home.css";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";

const PuplishPost = () => {
  const [modal, setModal] = useState(false);
  const [allFields, setAllFields] = useState([]);
  const [field_id, setField_id] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/roles/fields")
      .then((result) => {
        setAllFields(result.data.Fields);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container relative" style={{ width: "650px" }}>
      {" "}
      <div
        className="bg-white rounded h-28 flex-col "
        style={{ width: "650px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        <div className="flex-none">
          <textarea
            rows="1"
            className="p-2 mt-1 w-full cursor-pointer"
            style={{ outline: "none", resize: "none" }}
            placeholder="Puplish Here"
          ></textarea>
        </div>

        <div className="flex mt-3">
          <div className="bg-gray-50 h-8 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer">
            <IoVideocamOutline size="20" className="text-slate-600 me-1" />{" "}
            <div className="text-slate-500">Video</div>
          </div>

          <div className="bg-gray-50 h-8 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer">
            <MdOutlinePhotoCamera size="20" className="text-rose-800 me-1" />
            <div className="text-slate-500">Photo</div>
          </div>

          <div className="bg-gray-50 h-8 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer">
            <HiDotsHorizontal />
          </div>
        </div>
      </div>
      {/*==========******========== */}
      {modal && (
        <>
          {" "}
          <div id="myModal" class="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={() => {
                  setModal(false);
                }}
              >
                &times;
              </span>
              <p>Publish Post Here</p>
              <textarea
                placeholder="What do you want to share"
                className="w-full"
                rows={3}
                style={{ outline: "none", resize: "none" }}
              ></textarea>

              <div>
                <label className="me-2" style={{ outline: "none" }}>
                  Type of Post:
                </label>
                <select
                  className="mb-2 w-24 h-8 border-2 border-slate-500 rounded-md pl-2.5 shadow-lg"
                  onChange={(e) => {
                    setField_id(e.target.value);
                  }}
                >
                  <option className=" text-slate-500">Choose</option>
                  {allFields.map((field, i) => {
                    return (
                      <option value={field.field_id} key={field.field_id}>
                        {field.field}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="bg-gray-50 w-28 h-8 rounded-3xl flex items-center p-2 ms-2 mt-2 cursor-pointer">
                <MdOutlinePhotoCamera
                  size="24"
                  className="text-rose-800 me-1 mt-1"
                />
                <div className="text-slate-600">Photo</div>
              </div>

              <button className="bg-black text-white rounded-md shadow-lg w-28 h-10">
                Publish Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PuplishPost;
