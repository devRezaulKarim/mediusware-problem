import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContactsModal from "./ContactsModal";

const Problem2 = () => {
  const location = useLocation();
  const [showContact, setShowContact] = useState("");
  useEffect(() => {
    setShowContact(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Link
            to={"/problem-2/all-contacts"}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </Link>
          <Link
            to={"/problem-2/us-contacts"}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </Link>
        </div>
      </div>

      {showContact && <ContactsModal dataFor={showContact} />}
    </div>
  );
};

export default Problem2;
