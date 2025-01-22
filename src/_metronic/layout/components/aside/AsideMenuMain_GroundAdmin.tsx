//import { useIntl } from "react-intl";
//import { KTIcon } from "../../../helpers";
//import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
export function AsideMenuMainUpdatedGround() {
  //const intl = useIntl();
  return (
    <>
      <AsideMenuItem
        to="/Ground/AdminDashboard"
        icon="element-11"
        title="Dashboard"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
        </div>
      </div>
      <AsideMenuItem to="Ground/Bus" icon="element-11" title="Vehicle" />
        <AsideMenuItem to="Ground/Routes" icon="element-11" title="Routes" />
      <AsideMenuItem to="/Ground/bususer" icon="element-11" title="Users" />
      <div className="menu-item">
        {/* <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
        </div> */}
      </div>
      <AsideMenuItem
        to="/Ground/BusEmployee"
        icon="element-11"
        title="Drivers "
      />
      <AsideMenuItem
        to="/Ground/payments"
        icon="element-11"
        title="Payments "
      />
      {/*<AsideMenuItem to="Ground/BusRevenue" icon="element-11" title="Revenue" />*/}
      <AsideMenuItem to="Ground/busbooking" icon="element-11" title="Booking History" />
    </>
  );
}
