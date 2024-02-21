import React, { useState } from "react";
import "./Home.css";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";

const PuplishPost = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      {" "}
      <div
        className="bg-white rounded h-28 flex-col"
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
              <p>Some text in the Modal..</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PuplishPost;
