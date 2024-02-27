import React from "react";

const ModalSearchInput = ({search, handleOnSubmitSearch, handleOnchange }) => {
  return (
    <div className="mb-2">
      <form action="" onSubmit={handleOnSubmitSearch}>
        <div className="input-group">
          <input
            name="search"
            type="text"
            className="form-control"
            placeholder="Search"
            aria-describedby="button-addon2"
            onChange={handleOnchange}
            value={search}
          />
          <div className="input-group-append">
            <input
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
              value={"Search"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalSearchInput;
