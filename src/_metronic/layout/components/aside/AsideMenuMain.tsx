// import { useIntl } from "react-intl";
// import { KTIcon } from "../../../helpers";
// import { AsideMenuItemWithSub } from "./AsideMenuItemWithSub";
// import { AsideMenuItem } from "../aside/AsideMenuItem";
// import { useAuth } from '../../../../app/modules/auth'
// import {AsideMenuMainUpdatedAir} from '../aside/AsideMenuMean_AirAdmin'
// import {AsideMenuMainUpdatedGround} from "../aside/AsideMenuMain_GroundAdmin"
// import {AsideMenuMainUpdatedWater} from "../aside/AsideMenuMain_WaterAdmin"
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export function AsideMenuMainUpdated() {
//   const intl = useIntl();
//   return (
//     <>
//       <AsideMenuItem
//         to="/Water/Admindashboard"
//         icon="element-11"
//         title="Dashboard"
//       />
//       <div className="menu-item">
//         <div className="menu-content pt-8 pb-2">
//           {/* <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Jobs and Applicants</span> */}
//         </div>
//       </div>
//       <AsideMenuItem to="Water/Ships" icon="element-11" title="Ships" />
//       <AsideMenuItem to="/Water/Shipuser" icon="element-11" title="Users" />
//       <div className="menu-item">
//         {/* <div className='menu-content pt-8 pb-2'>
//           <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Quiz</span>
//         </div> */}
//       </div>
//       <AsideMenuItem
//         to="/Water/Employees"
//         icon="element-11"
//         title="Employees"
//       />
//       <AsideMenuItem to="Water/Revenue" icon="element-11" title="Revenue" />
//       <AsideMenuItem to="Water/FAQ" icon="element-11" title="FAQ & Queries" />
//     </>
//   );

//   // const renderMenu = () => {
//   //   switch (auth?.type) {
//   //     case "water":
//   //       return <AsideMenuMainUpdatedWater />;
//   //     case "ground":
//   //       return <AsideMenuMainUpdatedGround />;
//   //     case "air":
//   //       return <AsideMenuMainUpdatedAir />;
//   //     default:
//   //       return null; // Optionally render a default menu or a "Not Authorized" message
//   //   }
//   // };

//   // return <>{renderMenu()}</>;

// }


import  { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AsideMenuMainUpdatedAir } from "./AsideMenuMean_AirAdmin.tsx";
import { AsideMenuMainUpdatedAirUser } from "./AsideMenuMain_UserAir.tsx";
import { AsideMenuMainUpdatedGround } from "./AsideMenuMain_GroundAdmin.tsx";
import { AsideMenuMainUpdatedGroundUser } from "./AsideMenuMain_UserGround.tsx";
import AsideMenuMainUpdatedWater from "./AsideMenuMain_WaterAdmin";
import { AsideMenuMainUpdatedWaterUser } from "./AsideMenuMain_UserWater.tsx";
import axios from "axios";

export function AsideMenuMainUpdated() {
  useIntl();

  const [type, setType] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/session", {
          withCredentials: true,
        });

        console.log("Session response:", response.data); // Log the response data

        if (response.status === 200) {
          const { roles } = response.data;

          // Check if roles exist and extract the first role
          if (roles && roles.length > 0) {
            setRole(roles[0]);
          } else {
            setError("No roles found in the session.");
          }

          // Check if type is present in local storage or session
          const sessionType = localStorage.getItem("type");
          if (sessionType) {
            setType(sessionType);
          } else {
            setError("Session type is missing.");
          }
        } else {
          setError("Unable to fetch session data.");
        }
      } catch (err) {
        console.error("Error fetching session data:", err);
        setError("Session error or unauthorized access.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchSessionData();
  }, []);

  const renderMenu = () => {
    if (loading) {
      return <div>Loading...</div>; // Show loading while fetching session data
    }

    if (error) {
      return (
        <div>
          <h5 className="text-danger">{error}</h5>
        </div>
      );
    }

    if (!type || !role) {
      return (
        <div>
          <h5 className="text-muted">Invalid Type or Role</h5>
        </div>
      );
    }

    const menus = {
      water: {
        ROLE_ADMIN: <AsideMenuMainUpdatedWater />,
        ROLE_USER: <AsideMenuMainUpdatedWaterUser />,
      },
      ground: {
        ROLE_ADMIN: <AsideMenuMainUpdatedGround />,
        ROLE_USER: <AsideMenuMainUpdatedGroundUser />,
      },
      air: {
        ROLE_ADMIN: <AsideMenuMainUpdatedAir />,
        ROLE_USER: <AsideMenuMainUpdatedAirUser />,
      },
    };

    // @ts-ignore
    return menus[type]?.[role] ?? (
      <div>
        <h5 className="text-muted">Invalid Type or Role</h5>
      </div>
    );
  };

  return <>{renderMenu()}</>;
}
