import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [allData, setAllData] = useState([]);
  const [showingData, setShowingData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const [show, setShow] = useState("all");

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSetData = (e) => {
    e.preventDefault();
    setAllData((previous) => [...previous, { name, status }]);
    setName("");
    setStatus("");
  };

  useEffect(() => {
    if (show === "active") {
      const data = allData.filter((d) => d.status.toLowerCase() === "active");
      setShowingData(data);
    } else if (show === "completed") {
      const data = allData.filter(
        (d) => d.status.toLowerCase() === "completed"
      );
      setShowingData(data);
    } else {
      const data = [...allData].sort((a, b) => {
        const status_a = a.status.toLowerCase();
        const status_b = b.status.toLowerCase();

        if (status_a === status_b) {
          return 0;
        }
        if (status_a === "active") {
          return -1;
        }
        if (status_a === "completed") {
          return status_b === "active" ? 1 : -1;
        }
        return 1;
      });
      setShowingData(data);
    }
  }, [allData, show]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSetData}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {showingData.map((d, i) => (
                  <tr key={i}>
                    <td scope="col">{d.name}</td>
                    <td scope="col">{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
