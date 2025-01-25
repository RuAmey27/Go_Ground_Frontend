import { useIntl } from "react-intl";
import { KTIcon } from "../../../helpers";
import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
import { AsideMenuItem } from "./AsideMenuItem";
 function AsideMenuMainUpdatedWater() {
  const intl = useIntl();
  return (
    <>
      <AsideMenuItem
        to="/Water/Admindashboard"
        icon="element-11"
        title="Dashboard"
      />
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
        </div>
      </div>
      <AsideMenuItem to="Water/Ships" icon="element-11" title="Ships" />
      <AsideMenuItem to="/Water/Shipuser" icon="element-11" title="Users" />
      <div className="menu-item">
        {/* <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
        </div> */}
      </div>
      <AsideMenuItem
        to="/Water/Employees"
        icon="element-11"
        title="Employees"
      />
      <AsideMenuItem to="Water/Revenue" icon="element-11" title="Revenue" />
      <AsideMenuItem to="Water/FAQ" icon="element-11" title="FAQ & Queries" />
    </>
  );
}
 export default AsideMenuMainUpdatedWater;