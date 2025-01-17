// import { useIntl } from "react-intl";
// import { KTIcon } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
export function AsideMenuMainUpdatedAir() {
  //const intl = useIntl();
  return (
    <>
      <AsideMenuItem
        to="Air/Admindashboard"
        icon="element-11"
        title="Dashboard"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
        </div>
      </div>
      <AsideMenuItem to="Air/Aircrafts" icon="element-11" title="Aircrafts" />
      <AsideMenuItem to="/Air/Users" icon="element-11" title="Users" />
      <div className="menu-item">
        {/* <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
        </div> */}
      </div>
      <AsideMenuItem
        to="/Air/Employee"
        icon="element-11"
        title="Employees"
      />
      <AsideMenuItem to="Air/Revenue" icon="element-11" title="Revenue" />
      <AsideMenuItem to="Air/FAQ" icon="element-11" title="FAQ & Queries" />
    </>
  );
}
