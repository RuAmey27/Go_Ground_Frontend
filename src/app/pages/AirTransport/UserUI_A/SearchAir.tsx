import React from "react";
import NavAir from "./NavAir";
import FilterpanelAir from "./FilterpanelAir";
import AirCard from "./AirCard";

function SearchAir() {
  return (
    <div>
      <NavAir />
      {/* Main container with Flexbox layout */}
      <div className="d-flex mt-4">
        {/* Filter Panel on the left */}
        <div style={{ width: "30%" }}>
          <FilterpanelAir />
        </div>

        {/* Cruise Page content on the right */}
        <div style={{ width: "70%" }}>
          <AirCard />
        </div>
      </div>
    </div>
  );
}

export default SearchAir;
