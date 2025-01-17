// import React, { useState } from "react";
// import Pagination from "../../Pagination";
// // import AddPlan from "../Admin_Ground/AddPlan";
//
// // Example static data for plans
// const mockPlans = [
//   { id: 1, name: "Plane A", type: "Airplane", price: 20, status: "Active", duration: "1 Month" },
//   { id: 2, name: "Plane B", type: "Helicopter", price: 50, status: "Inactive", duration: "3 Months" },
//   { id: 3, name: "Plane C", type: "transport aircraft", price: 25, status: "Active", duration: "1 Month" },
// ];
//
// export const PlansPage: React.FC = () => {
//   // const [plans, setPlans] = useState(mockPlans);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(5);
//   const [search, setSearch] = useState("");
//   // const [showAddPlanModal, setShowAddPlanModal] = useState(false);
//   const [status, setStatus] = useState("");
//
//   const filteredPlans = plans.filter((plan) =>
//     plan.name.toLowerCase().includes(search.toLowerCase())
//   );
//
//   const handlePageChange = (page: number) => setCurrentPage(page);
//
//   const handleEntriesPerPageChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const value = parseInt(event.target.value, 10);
//     setEntriesPerPage(value);
//     setCurrentPage(1);
//   };
//
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setSearch(e.target.value);
//
//   // const toggleStatus = (id: number) => {
//   //   setPlans(
//   //     plans.map((plan) =>
//   //       plan.id === id ? { ...plan, status: plan.status === "Active" ? "Inactive" : "Active" } : plan
//   //     )
//   //   );
//   // };
//   //
//   // // Define handleAddPlan to handle adding a new plan
//   // const handleAddPlan = (newPlan: { name: string; type: string; price: number; status: string; duration: string }) => {
//   //   const newPlanWithId = { ...newPlan, id: plans.length + 1 };
//   //   setPlans([...plans, newPlanWithId]);
//   // };
//
//   return (
//     <div className="card">
//       {/* Header */}
//       <div className="card-header border-0 pt-5">
//         <h3 className="card-title align-items-start flex-column">
//           <span className="card-label fw-bold fs-3 mb-1">Aircrafts</span>
//           <span className="text-muted mt-1 fw-semibold fs-7">
//             Total Aircrafts: {filteredPlans.length}
//           </span>
//         </h3>
//         <div className="card-toolbar d-flex flex-end">
//           <input
//             type="text"
//             className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
//             style={{ width: "12rem" }}
//             placeholder="Search Plans"
//             value={search}
//             onChange={handleSearchChange}
//           />
//
//           <div className='d-flex align-items-center'>
//             {/* begin::Label */}
//             <span className='fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block'>
//               Sort By:
//             </span>
//             {/* end::Label */}
//
//             {/* begin::Select */}
//             <select
//               className='form-select form-select-sm form-select-solid w-100px w-xxl-125px'
//               data-control='select2'
//               data-placeholder='All'
//               data-hide-search='true'
//               defaultValue={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value=''></option>
//               <option value='1'>All</option>
//               <option value='2'>Active</option>
//               <option value='3'>Inactive</option>
//               <option value='4'>Airplane</option>
//               <option value='5'>Helicoptor</option>
//             </select>
//             {/* end::Select  */}
//           </div>
//
//           {/*<button*/}
//           {/*  type="button"*/}
//           {/*  className="btn btn-light-primary border-0 rounded mx-2"*/}
//           {/*  onClick={() => setShowAddPlanModal(true)} */}
//           {/*>*/}
//           {/*  <i className="fs-2 bi bi-plus" />*/}
//           {/*  Add New Plan*/}
//           {/*</button>*/}
//         </div>
//       </div>
//
//       {/* Body */}
//       <div className="card-body py-3">
//         <div className="table-responsive">
//           <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
//             <thead>
//               <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Duration</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPlans
//                 .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
//                 .map((plan) => (
//                   <tr key={plan.id}>
//                     <td>{plan.name}</td>
//                     <td>{plan.type}</td>
//                     <td>{plan.price}</td>
//                     <td>{plan.status}</td>
//                     <td>{plan.duration}</td>
//                     <td className="text-center">
//                       <div className="d-flex flex-row align-items-center">
//                          <button
//                           className="btn btn-icon btn-bg-light btn-sm me-1"
//                           //View button functionality
//                         >
//                           <i className="ki-duotone ki-eye fs-3 text-primary">
//                             <span className="path1"></span>
//                             <span className="path2"></span>
//                             <span className="path3"></span>
//                           </i>
//                         </button>
//
//                         <button
//                           type="button"
//                           className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                           // Edit button functionality
//                         >
//                           <i className="ki-duotone ki-pencil fs-3 text-primary">
//                             <span className="path1"></span>
//                             <span className="path2"></span>
//                           </i>
//                         </button>
//
//                         <button
//                           type="button"
//                           className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                           // Delete button functionality
//                         >
//                           <i className="ki-duotone ki-trash fs-3 text-danger">
//                             <span className="path1"></span>
//                             <span className="path2"></span>
//                             <span className="path3"></span>
//                             <span className="path4"></span>
//                             <span className="path5"></span>
//                           </i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//
//       {/* Pagination */}
//       <div className="card-footer">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={Math.ceil(filteredPlans.length / entriesPerPage)}
//           onPageChange={handlePageChange}
//           entriesPerPage={entriesPerPage}
//           onEntriesPerPageChange={handleEntriesPerPageChange}
//         />
//       </div>
//
//       {/* Add Plan Modal */}
//       {/* {showAddPlanModal && (
//         <AddPlan
//           onClose={() => setShowAddPlanModal(false)}
//           onAdd={handleAddPlan}
//         />
//       )} */}
//     </div>
//   );
// };
