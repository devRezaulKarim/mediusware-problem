import React from "react";
import { Link } from "react-router-dom";

const ModalButtons = ({ dataFor }) => {
  return (
    <div className="py-2">
      <Link
        to={"/problem-2/all-contacts"}
        className={`btn  btn-outline-primary mx-2 ${
          dataFor === "all-contacts" && "active"
        }`}
        type="button"
      >
        All Contacts
      </Link>
      <Link
        to={"/problem-2/us-contacts"}
        className={`btn btn-outline-primary mx-2 ${
          dataFor === "us-contacts" && "active"
        }`}
        type="button"
      >
        US Contacts
      </Link>
      <Link to={"/problem-2"} className={`btn  btn-danger mx-2 `} type="button">
        Close
      </Link>
    </div>
  );
};

export default ModalButtons;
