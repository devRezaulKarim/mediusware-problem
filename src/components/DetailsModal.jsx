import React from "react";

const DetailsModal = ({ setDetails, details }) => {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      className="fixed-top vh-100 d-flex justify-content-center align-items-center"
    >
      <div className="bg-light position-relative rounded-3 py-3 px-5">
        <h3 className="mt-5 p-3 text-center">This is details page</h3>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Phone</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{details.phone}</td>
              <td>{details.country?.name}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => setDetails(null)}
          className="btn btn-lg btn-danger position-absolute top-0 end-0 "
        >
          X
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
