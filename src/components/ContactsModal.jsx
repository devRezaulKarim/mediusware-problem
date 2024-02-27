import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DetailsModal from "./DetailsModal";
import ModalButtons from "./ModalButtons";
import Contact from "./Contact";
import ModalSearchInput from "./ModalSearchInput";

const ContactsModal = ({ dataFor }) => {
  const [url, setUrl] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const url =
      dataFor === "all-contacts"
        ? "https://contact.mediusware.com/api/contacts/"
        : "https://contact.mediusware.com/api/country-contacts/united%20states/";
    setUrl(() => url);
  }, [dataFor]);

  // plain reusable functions
  const getData = async (url, search) => {
    const preContacts = search ? [] : [...allContacts];

    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllContacts([...preContacts, ...data.results]);
      setNextPageUrl(data.next);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const debounce = (fn) => {
    let timerID;
    return function (...args) {
      if (timerID) {
        clearTimeout(timerID);
      }
      timerID = setTimeout(() => {
        fn(...args);
      }, 1000);
    };
  };

  //
  //fetching data on initial mounting

  useEffect(() => {
    getData(url);
  }, [url]);

  //resetting previous data on modal change
  //
  useEffect(() => {
    setAllContacts([]);
    setNextPageUrl(null);
    setError("");
    setSearch("");
  }, [dataFor, url]);
  //

  // search implementation
  const handleOnChangeSearch = (e) => {
    const search = e.target.value;
    const searchUrl = `${url}?search=${search}`;
    getData(searchUrl, true);
  };

  const handleOnChangeSearchDebounced = debounce(handleOnChangeSearch);

  const handleOnchange = (e) => {
    handleOnChangeSearchDebounced(e);
    setSearch(e.target.value);
  };
  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    const search = e.target.search.value;
    const searchUrl = `${url}?search=${search}`;
    getData(searchUrl, true);
  };

  //infinity scrolling
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      nextPageUrl && getData(nextPageUrl);
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      className="fixed-top vh-100 d-flex justify-content-center align-items-center"
    >
      <div className="tab-content mx-auto bg-light p-3 d-flex flex-column justify-content-center align-items-center rounded">
        <h4>{dataFor.toUpperCase()}</h4>

        <ModalSearchInput
          search={search}
          handleOnchange={handleOnchange}
          handleOnSubmitSearch={handleOnSubmitSearch}
        />

        {/* *****************************
                    modal body
         ***************************** */}
        <div
          style={{ height: "65vh", width: "800px" }}
          className="overflow-auto "
          onScroll={handleScroll}
        >
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {allContacts.map((contact, i) => (
                <Contact key={i} contact={contact} setDetails={setDetails} />
              ))}
            </tbody>
          </table>
        </div>

        {/* *******************************
                    modal buttons 
      ******************************* */}

        <ModalButtons dataFor={dataFor} />

        {/* *****************************
                    details modal
         ***************************** */}
        {details && <DetailsModal details={details} setDetails={setDetails} />}
      </div>
    </div>
  );
};

export default ContactsModal;
