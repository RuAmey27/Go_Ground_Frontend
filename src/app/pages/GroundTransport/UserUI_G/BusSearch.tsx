import React from "react";
import BusDetails from "./BusDetails";
import NavBarground from "./NavBarground";
import FilterPanelGround from "./FilterPanelGround";
import GroundCard from "./GroundCard";

function BusSearch() {
  return (
    <div>
      <NavBarground />
      {/* Main container with Flexbox layout */}
      <div className="d-flex mt-4">
        {/* Filter Panel on the left */}
        <div style={{ width: "30%" }}>
          <FilterPanelGround />
        </div>

        {/* Cruise Page content on the right */}
        <div style={{ width: "70%" }}>
          <GroundCard />
        </div>
      </div>
    </div>
  );
}

export default BusSearch;
