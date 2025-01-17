// import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
// import { WithChildren } from "../../_metronic/helpers";
import HomeMain from "../pages/WaterTransport/Userinterface/HomeMain";
import SidebarPage from "../pages/WaterTransport/Admin_Water/AdminDashboard";
import { ShipsPage } from "../pages/WaterTransport/Admin_Water/Ships";
// import { EmployeePage } from "../pages/WaterTransport/Admin_Water/Employees";
// import { RevenuePage } from "../pages/WaterTransport/Admin_Water/Revenue";
import { BusesPage } from "../pages/GroundTransport/Admin_Ground/Bus";
import { BusEmployeePage } from "../pages/GroundTransport/Admin_Ground/Busemployee";
import { BusRevenuePage } from "../pages/GroundTransport/Admin_Ground/BusRevenu";
// import { PlansPage } from "../pages/AirTransport/Admin_Air/Aircraft";
import { FAQPage } from "../pages/WaterTransport/Admin_Water/FAQ";
import AdminDashboard_G from "../pages/GroundTransport/Admin_Ground/AdminDashboard_G";
import { FAQGroudPage } from "../pages/GroundTransport/Admin_Ground/FAQGround";
// import { AircraftRevenuePage } from "../pages/AirTransport/Admin_Air/AirRevenue";
import { AircraftFAQPage } from "../pages/AirTransport/Admin_Air/AirFAQ";
import { BusUserPage } from "../pages/GroundTransport/Admin_Ground/busUser";
// import { AirEmployeePage } from "../pages/AirTransport/Admin_Air/AirEmployee";
//import { AirUserPage } from "../pages/AirTransport/Admin_Air/Airuser";

import { BusBookingPage } from "../pages/GroundTransport/Admin_Ground/busbookig";
// import { ShipBookingPage } from "../pages/WaterTransport/Admin_Water/Shipbooking";
import BusBooking from "../pages/GroundTransport/UserUI_G/Homepage";
import BusSearch from "../pages/GroundTransport/UserUI_G/BusSearch";

// import { ShipUserPage } from "../pages/WaterTransport/Admin_Water/ShipUsers";
import AirHomePage from "../pages/AirTransport/UserUI_A/homepageair";

import Search from "../pages/WaterTransport/Userinterface/Search";

import ShipDetailsPage from "../pages/WaterTransport/Userinterface/ShipDetails";

import SummaryPage from "../pages/WaterTransport/Userinterface/Summary";
import SearchAir from "../pages/AirTransport/UserUI_A/SearchAir";
import AirDetailsPage from "../pages/AirTransport/UserUI_A/AirDetails";
import SummaryAir from "../pages/AirTransport/UserUI_A/SummaryAir";
import BusDetails from "../pages/GroundTransport/UserUI_G/BusDetails";
import SummaryGround from "../pages/GroundTransport/UserUI_G/SummaryGround";
import { RouteDetail } from "../pages/GroundTransport/Admin_Ground/RouteDetail";
import UserDashboard from "../pages/GroundTransport/UserUI_G/SummaryGround";
import PassengerDetails from "../pages/GroundTransport/Admin_Ground/PassengerDetails";
import PaymentDetails from "../pages/GroundTransport/UserUI_G/PaymentDetails";
import ConfirmBooking from "../pages/GroundTransport/UserUI_G/ConfirmBooking";
import EditCredentialsPage from "../pages/GroundTransport/UserUI_G/EditCredentialsPage.tsx";
import {UserHistory} from "../pages/GroundTransport/UserUI_G/UserHistory.tsx";

const PrivateRoutes = () => {
  // const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  // const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  // const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  // const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  // const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  // const UsersPage = lazy(
  //   () => import("../modules/apps/user-management/UsersPage")
  // );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route
          path="auth/*"
          element={<Navigate to="/Water/Admindashboard" />}
        />
        {/* <Route path="auth/*" element={<Navigate to="Water/Admindashboard" />} /> */}

        {/* Pages */}
        {/* <Route path="dashboard" element={<DashboardWrapper />} /> */}

        <Route path="dashboard" element={<ShipDetailsPage />} />
        {/* <Route
          path="builder"
          element={
            <SuspensedView>
              <BuilderPageWrapper />
            </SuspensedView>
          }
        /> */}
        {/* <Route path="menu-test" element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        {/* <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        /> */}
        <Route path="/home" element={<HomeMain />} />
        {/* Water Admin routes */}
        <Route path="/Water/Admindashboard" element={<SidebarPage />}></Route>
        <Route path="/BusSearch" element={<BusSearch />}></Route>
        <Route path="Water/Ships" element={<ShipsPage />}></Route>
        {/*<Route path="Water/Employees" element={<EmployeePage />}></Route>*/}
        {/*<Route path="Water/Revenue" element={<RevenuePage />}></Route>*/}
        {/*<Route path="Water/Shipuser" element={<ShipUserPage />}></Route>*/}
        {/*<Route path="Water/booking" element={<ShipBookingPage />}></Route>*/}
        <Route path="Water/FAQ" element={<FAQPage />}></Route>

        {/* Ground Admin Routes */}
        <Route path="Ground/homepage" element={<BusBooking />}></Route>
        <Route
          path="Ground/AdminDashboard"
          element={<AdminDashboard_G />}
        ></Route>
        <Route path="Ground/Bus" element={<BusesPage />}></Route>
        <Route path="Ground/BusEmployee" element={<BusEmployeePage />}></Route>
        <Route path="Ground/BusRevenue" element={<BusRevenuePage />}></Route>
        <Route path="Ground/bususer" element={<BusUserPage />}></Route>
        <Route path="Ground/busbooking" element={<BusBookingPage />}></Route>
        <Route path="Ground/routes" element={<RouteDetail />}></Route>
        <Route path="Ground/FAQ" element={<FAQGroudPage />}></Route>

        {/* 
        Air Admin Routes */}
        {/*<Route path="Air/Aircrafts" element={<PlansPage />}></Route>*/}
        {/*<Route path="Air/Revenue" element={<AircraftRevenuePage />}></Route>*/}
        <Route path="Air/FAQ" element={<AircraftFAQPage />}></Route>
        {/*<Route path="Air/Employee" element={<AirEmployeePage />}></Route>*/}
        {/*<Route path="Air/Users" element={<AirUserPage />}></Route>*/}
        <Route path="Air/Homepage" element={<AirHomePage />} />

        {/* user section water  page */}

        <Route path="water/search" element={<Search />} />

        <Route path="/ship-details" element={<ShipDetailsPage />} />

        <Route path="/summary" element={<SummaryPage />} />

        {/* AirTransport user  */}

        <Route path="/Air/Search" element={<SearchAir />} />
        <Route path="/AirDetails" element={<AirDetailsPage />} />
        <Route path="/summaryAir" element={<SummaryAir />} />

        {/* GroundTransport user */}
        <Route path="/Ground/Search" element={<BusSearch />} />
        <Route path="/BusDetails" element={<BusDetails />} />
        <Route path="/SummaryGround" element={<SummaryGround />} />
        <Route path="/UserDashBoardGround" element={<UserDashboard />} />
        <Route path="/Profile" element={<EditCredentialsPage/>} />
        <Route path="/BookingHistory" element={<UserHistory/>} />

        {/* Ground User Passenger Booking */}
        <Route path={"/passenger-details/:routeId"} element={<PassengerDetails/>}/>
        {/* COnfirm booking for ground user */}
        <Route path="/confirm-booking" element={<ConfirmBooking/>}/>
        {/* Payment details for ground user */}
        <Route path="/payment-details" element={<PaymentDetails/>}/>

        {/* <Route path=" Air/Booking" element={<AirBookingPage/>}></Route> */}

        {/* <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        /> */}

        {/* <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        /> */}
        {/* <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        /> */}
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

// const SuspensedView: FC<WithChildren> = ({ children }) => {
//   const baseColor = getCSSVariableValue("--bs-primary");
//   TopBarProgress.config({
//     barColors: {
//       "0": baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   });
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
// };

export { PrivateRoutes };
