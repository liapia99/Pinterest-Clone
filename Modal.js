import React, { useState } from "react";

import "./Modal.css";

import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function upload_img(
  event,
  pinDetails,
  setPinDetails,
  setShowLabel,
  setShowModalPin
) {
  if (event.target.files && event.target.files[0]) {
    if (/image\/*/.test(event.target.files[0].type)) {
      const reader = new FileReader();

      reader.onload = function () {
        setPinDetails({
          ...pinDetails,
          img_blob: reader.result
        });
        setShowLabel(false);
        setShowModalPin(true);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

function check_size(event) {
  const image = event.target;

  image.classList.add("pin_max_width");

  if (
    image.getBoundingClientRect().width <
      image.parentElement.getBoundingClientRect().width ||
    image.getBoundingClientRect().height <
      image.parentElement.getBoundingClientRect().height
  ) {
    image.classList.remove("pin_max_width");
    image.classList.add("pin_max_height");
  }

  image.style.opacity = 1;
}

function save_pin(pinDetails, add_pin) {
  const users_data = {
    ...pinDetails,
    author: "Jules",
    board: "default",
    title: document.querySelector("#pin_title").value,
    description: document.querySelector("#pin_description").value,
    destination: document.querySelector("#pin_destination").value,
    pin_size: document.querySelector("#pin_size").value
  };

  add_pin(users_data);
}

function Modal(props) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLink, setNewLink] = useState("");

  const pinsCollectionRef = collection(db, "pins");

  const createPin = async () => {
    await addDoc(pinsCollectionRef, {
      title: newTitle,
      description: newDescription,
      link: newLink
    });
  };

  const [pinDetails, setPinDetails] = useState({
    author: "",
    board: "",
    title: "",
    description: "",
    destination: "",
    img_blob: "",
    pin_size: ""
  });
  const [showLabel, setShowLabel] = useState(true);
  const [showModalPin, setShowModalPin] = useState(false);

  return (
    <div className="add_pin_modal">
      <div className="add_pin_container">
        <div className="side" id="left_side">
          <div className="section1">
            <div className="pint_mock_icon_container">
              <img
                src="https://img.icons8.com/ios-glyphs/30/undefined/ellipsis.png"
                alt="edit"
                className="pint_mock_icon"
              />
            </div>
          </div>

          <div className="section2">
            <label
              htmlFor="upload_img"
              id="upload_img_label"
              style={{
                display: showLabel ? "block" : "none"
              }}
            >
              <div className="upload_img_container">
                <div id="dotted_border">
                  <div className="pint_mock_icon_container">
                    <img
                      src="https://img.icons8.com/material-rounded/24/undefined/upload--v1.png"
                      alt="upload_img"
                      className="pint_mock_icon"
                    />
                  </div>
                  <div>click to upload</div>
                  <div>
                    recommendation: use high-quality .jpg less than 20MB
                  </div>
                </div>
              </div>

              <input
                onChange={(event) =>
                  upload_img(
                    event,
                    pinDetails,
                    setPinDetails,
                    setShowLabel,
                    setShowModalPin
                  )
                }
                type="file"
                name="upload_img"
                id="upload_img"
                value=""
              />
            </label>

            <div
              className="modals_pin"
              style={{
                display: showModalPin ? "block" : "none"
              }}
            >
              <div className="pin_image">
                <img
                  onLoad={check_size}
                  src={pinDetails.img_blob}
                  alt="pin_image"
                />
              </div>
            </div>
          </div>

          <div className="section3">
            <div className="save_from_site">save from site</div>
          </div>
        </div>

        <div className="side" id="right_side">
          <div className="section1">
            <div className="select_size">
              <select defaultValue="Select" name="pin_size" id="pin_size">
                <option value="">select</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
              <div
                onClick={() => {
                  save_pin(pinDetails, props.add_pin);
                  createPin();
                }}
                // onClick={ () => { f1(); f2();} }

                className="save_pin"
              >
                save
              </div>
            </div>
          </div>

          <div className="section2">
            <input
              placeholder="Add your title"
              type="text"
              className="new_pin_input"
              id="pin_title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              placeholder="Tell everyone what your Pin is about"
              type="text"
              className="new_pin_input"
              id="pin_description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              placeholder="Add a destination link"
              type="text"
              className="new_pin_input"
              id="pin_destination"
              onChange={(e) => setNewLink(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
