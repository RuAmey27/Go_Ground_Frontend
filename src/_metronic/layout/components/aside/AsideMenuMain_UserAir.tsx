//import { useIntl } from "react-intl";
// import { KTIcon } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
export function AsideMenuMainUpdatedAirUser() {
  //const intl = useIntl();
  return (
    <>
      <AsideMenuItem
        to="/AirUserDashBoard"
        icon="element-11"
        title="User Dashboard"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
        </div>
      </div>
      <AsideMenuItem to="Air/Homepage" icon="element-11" title="BookNow" />
      {/* <AsideMenuItem to="/Air/Users" icon="element-11" title="Users" /> */}
      <div className="menu-item">
        {/* <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
        </div> */}
      </div>
      {/* <AsideMenuItem
        to="/Air/Employee"
        icon="element-11"
        title="Employees"
      />
      <AsideMenuItem to="Air/Revenue" icon="element-11" title="Revenue" />
      <AsideMenuItem to="Air/FAQ" icon="element-11" title="FAQ & Queries" /> */}
    </>
  );
}
