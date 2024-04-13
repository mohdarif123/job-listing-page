import React, { useEffect, useState } from "react";
import "../Jobs/JobsStyle.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { jobAllData, AllLocation } from "../Jobs/JobsData";
const Jobs = () => {
  const [jobAllDetails, setJobAllDetails] = useState(jobAllData);
  const [locationValue, setLocation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(jobAllDetails.length / ITEMS_PER_PAGE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const allJobsDetailsData = jobAllDetails.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let filteredData = jobAllData;

    if (locationValue) {
      filteredData = jobAllData.filter(
        (item) => item.location === locationValue
      );
    }
    setJobAllDetails(filteredData);
  }, [locationValue]);

  const handleLocationChange = (event) => {
    const { value } = event.target;
    setLocation(value);
  };

  const getPagination = () => {
    return (
      <>
        {/* pagination div  */}
        <div className="paginationTopWrapper">
          {totalPages > 1 && (
            <div className="pagination" style={{ gap: "4px" }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  background: currentPage === 1 ? "gray" : "blue",
                  color: "white",
                  padding: "8px 9px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                  width: "80px",
                  cursor: currentPage === 1 ? "" : "pointer",
                }}
              >
                Previous
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={currentPage === pageNumber ? "active" : ""}
                  style={{
                    background: currentPage === pageNumber ? "blue" : "gray",
                    color: "white",
                    padding: "8px 9px",
                    border: "1px solid black",
                    borderRadius: "6px",
                    width: "40px",
                    cursor: "pointer",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  background: currentPage === totalPages ? "gray" : "blue",
                  color: "white",
                  padding: "8px 9px",
                  border: "1px solid gray",
                  borderRadius: "6px",
                  width: "80px",
                  cursor: currentPage === totalPages ? "" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  const getFilterMethod = () => {
    return (
      <>
        <div>
          <h1>Filter jobs as per your requirements</h1>
          <Select
            labelId="Location"
            id="Location"
            value={locationValue}
            label="Location"
            onChange={handleLocationChange}
            className="dropdownStyle"
            style={{ width: "200px" }}
            renderValue={(selected) => (selected ? selected : "Select region")}
          >
            {AllLocation.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="main_wrapper">
        {getFilterMethod()}
        <div className="inner_wrapper">
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h1 style={{ color: "black", paddingLeft: "15px" }}>
              Top job picks for you
            </h1>
            <h3>Total jobs : {jobAllDetails?.length}</h3>
          </div>

          {allJobsDetailsData?.map((items, index) => {
            return (
              <>
                <div className="job_card_style">
                  <img
                    src={items?.companyLogo}
                    alt={items?.companyLogo}
                    height={"60px"}
                    width={"60px"}
                  />
                  <div className="job_title_location_style">
                    <h3>
                      {items?.title} , ( {items?.location} ){" "}
                    </h3>
                    <p>{items?.location}</p>
                  </div>
                </div>
              </>
            );
          })}

          {getPagination()}
        </div>
      </div>
    </>
  );
};

export default React.memo(Jobs);
