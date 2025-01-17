// import { useIntl } from "react-intl";
// import { KTIcon } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
export function AsideMenuMainUpdatedGroundUser() {
  //const intl = useIntl();
  return (
    <>
      <AsideMenuItem
        to="/UserDashBoardGround"
        icon="element-11"
        title="User Dashboard"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
        </div>
      </div>
      <AsideMenuItem to="Ground/homepage" icon="element-11" title="Book Now" />
       <AsideMenuItem to="/Profile" icon="element-11" title="User Profile" />
        <AsideMenuItem to="/BookingHistory" icon="element-11" title="Booking History" />
      {/* <AsideMenuItem to="/Ground/bususer" icon="element-11" title="Users" /> */}
      <div className="menu-item">
        {/* <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
        </div> */}
      </div>
      {/* <AsideMenuItem
        to="/Ground/BusEmployee"
        icon="element-11"
        title="Employees"
      /> */}
      {/* <AsideMenuItem to="Ground/BusRevenue" icon="element-11" title="Revenue" /> */}
      {/* <AsideMenuItem to="Ground/FAQ" icon="element-11" title="FAQ & Queries" /> */}
    </>
  );
}
