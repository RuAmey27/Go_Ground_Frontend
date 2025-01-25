import React from "react";
import NavBar from "./NavBar";
import FilterPanel from "./FilterPanel";
import CruisePage from "./CruiseCard"; // Import the CruisePage component

function Search() {
  return (
    <div>
      <NavBar />
      {/* Main container with Flexbox layout */}
      <div className="d-flex mt-4">
        {/* Filter Panel on the left */}
        <div style={{ width: "30%" }}>
          <FilterPanel />
        </div>

        {/* Cruise Page content on the right */}
        <div style={{ width: "70%" }}>
          <CruisePage />
        </div>
      </div>
    </div>
  );
}

export default Search;
