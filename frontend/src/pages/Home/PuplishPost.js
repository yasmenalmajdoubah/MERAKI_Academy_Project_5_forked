import React, { useState } from "react";
import "./Home.css";

const PuplishPost = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      {" "}
      <div
        onClick={() => {
          setModal(true);
        }}
      >
        PuplishPost
      </div>
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
