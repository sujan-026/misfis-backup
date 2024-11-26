"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DynamicDashboard = () => {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [facultyDetails, setFacultyDetails] = useState("");
  const [hodDetails, setHodDetails] = useState(null);
  const [branch, setBranch] = useState<any[]>([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyId, setFacultyId] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      setFacultyId(JSON.parse(user).facultyId);
      setTeacherName(JSON.parse(user).username);
      setRole(JSON.parse(user).role);
    } else {
      throw new Error("Teacher name not found in local storage");
    }
  }, []);

  useEffect(() => {
    async function fetchHODDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/hodprincipalDetails?facultyId=${facultyId}`
        );
        const result = await response.json();
        if (response.ok) {
          setHodDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (facultyId) {
      fetchHODDetails();
    }
  }, [facultyId]);

  useEffect(() => {
    async function fetchFacultyInSameDepartment(department: string | null) {
      if (!department) return;

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/facultyDetails?department=${department}`
        );
        const result = await response.json();
        if (response.ok) {
          setFacultyDetails(result.data);
        } else {
          setError(result.error || "Failed to fetch faculty details");
        }
      } catch (err) {
        console.error("Error fetching faculty details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (hodDetails?.department) {
      fetchFacultyInSameDepartment(hodDetails.department);
    }
  }, [hodDetails]);

  // useEffect(() => {
  //   async function fetchBranches() {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `http://localhost:3000/api/faculty/branch`
  //       );
  //       const result = await response.json();
  //       if (response.ok) {
  //         setBranch(result.data);
  //       } else {
  //         setError(result.error || "Failed to fetch branch details");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching branch details:", err);
  //       setError("An unexpected error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchBranches();
  // }, [selectedBranch]);

  useEffect(() => {
    async function fetchBranches() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/faculty/branch`
        );
        const result = await response.json();
        if (response.ok) {
          // Transform object into an array of entries or values
          setBranch(result.data.branches);
        } else {
          setError(result.error || "Failed to fetch branch details");
        }
      } catch (err) {
        console.error("Error fetching branch details:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchFacultyInBranch(selectedBranch);
    }
  }, [selectedBranch]);

  async function fetchFacultyInBranch(department: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/faculty/facultyDetails?department=${department}`
      );
      const result = await response.json();
      if (response.ok) {
        setFacultyDetails(result.data);
      } else {
        setError(
          result.error || "Failed to fetch faculty details for branch"
        );
      }
    } catch (err) {
      console.error("Error fetching faculty details for branch:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleConsolidation() {
    router.push(`/consolidation`);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800">
            {(() => {
              const currentHour = currentDate.getHours();
              if (currentHour < 12) return `Good Morning, ${teacherName}`;
              if (currentHour < 18) return `Good Afternoon, ${teacherName}`;
              return `Good Evening, ${teacherName}`;
            })()}
          </h2>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">{formattedDate}</div>
          <div className="text-gray-600">{formattedTime}</div>
        </div>

        {role === "hod" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyDetails.length > 0 ? (
              facultyDetails.map((faculty: any) => (
                <div
                  key={faculty.facultyId}
                  className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/faculty/facultypersonaldetails?facultyId=${faculty.facultyId}`
                    )
                  }
                >
                  <h3 className="text-lg font-bold mb-2">
                    {faculty.firstName} {faculty.middleName} {faculty.lastName}
                  </h3>
                  <p>
                    <strong>Faculty Id:</strong> {faculty.facultyId}
                  </p>
                  <p>
                    <strong>Qualification:</strong> {faculty.qualification}
                  </p>
                  <p>
                    <strong>Department:</strong> {faculty.department}
                  </p>
                  <p>
                    <strong>Designation:</strong> {faculty.designation}
                  </p>
                </div>
              ))
            ) : (
              <p>No faculty details available.</p>
            )}
          </div>
        ) : role === "principal" ? (
          !selectedBranch ? (
            <div>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleConsolidation}
              >
                Consolidation
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branch.map((branchItem: any) => (
                  <div
                    key={branchItem.branchName}
                    className={`border rounded-lg shadow-md p-4 cursor-pointer ${
                      selectedBranch === branchItem.branchCode
                        ? "bg-blue-200"
                        : "bg-white"
                    } hover:shadow-lg`}
                    onClick={() => setSelectedBranch(branchItem.branchCode)}
                  >
                    <h3 className="text-lg font-bold">
                      {branchItem.branchName}
                    </h3>
                    <p>{branchItem.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button
                className="bg-gray-200 px-4 py-2 rounded-md mb-4 hover:bg-gray-300"
                onClick={() => setSelectedBranch(null)}
              >
                Back to Branches
              </button>
              {facultyDetails.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facultyDetails.map((faculty: any) => (
                    <div
                      key={faculty.facultyId}
                      className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/faculty/facultypersonaldetails?facultyId=${faculty.facultyId}`
                        )
                      }
                    >
                      <h3 className="text-lg font-bold mb-2">
                        {faculty.firstName} {faculty.middleName}{" "}
                        {faculty.lastName}
                      </h3>
                      <p>
                        <strong>Faculty Id:</strong> {faculty.facultyId}
                      </p>
                      <p>
                        <strong>Qualification:</strong> {faculty.qualification}
                      </p>
                      <p>
                        <strong>Department:</strong> {faculty.department}
                      </p>
                      <p>
                        <strong>Designation:</strong> {faculty.designation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="mt-8 text-gray-600">
                    No faculty details available for this department.
                  </p>
                  <button
                    className="bg-gray-200 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
                    onClick={() => setSelectedBranch(null)}
                  >
                    Back to Branches
                  </button>
                </div>
              )}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default DynamicDashboard;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const DynamicDashboard = () => {
//   const router = useRouter();
//   const [teacherName, setTeacherName] = useState("");
//   const [facultyDetails, setFacultyDetails] = useState<any[]>([]);
//   const [branch, setBranch] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

//   const currentDate = new Date();

//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const formattedTime = currentDate.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   useEffect(() => {
//     const user = localStorage.getItem("token");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setTeacherName(parsedUser.username);
//       setRole(parsedUser.role);
//     } else {
//       throw new Error("Teacher name not found in local storage");
//     }
//   }, []);

//   useEffect(() => {
//     async function fetchBranches() {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://localhost:3000/api/faculty/branch"
//         );
//         const result = await response.json();
//         if (response.ok) {
//           setBranch(result.data.branches);
//         } else {
//           setError(result.error || "Failed to fetch branch details");
//         }
//       } catch (err) {
//         console.error("Error fetching branch details:", err);
//         setError("An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBranches();
//   }, []);

//   useEffect(() => {
//     if (selectedBranch) {
//       fetchFacultyInBranch(selectedBranch);
//     }
//   }, [selectedBranch]);

//   async function fetchFacultyInBranch(department: string) {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost:3000/api/faculty/facultyDetails?department=${department}`
//       );
//       const result = await response.json();
//       if (response.ok) {
//         setFacultyDetails(result.data || []);
//         if (!result.data || result.data.length === 0) {
//           setError("No faculty found in this department");
//         } else {
//           setError(null);
//         }
//       } else {
//         setError(result.error || "Failed to fetch faculty details for branch");
//       }
//     } catch (err) {
//       console.error("Error fetching faculty details for branch:", err);
//       setError("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   }

  // function handleConsolidation() {
  //   router.push(`/consolidation`);
  // }

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-blue-800">
//             {(() => {
//               const currentHour = currentDate.getHours();
//               if (currentHour < 12) return `Good Morning, ${teacherName}`;
//               if (currentHour < 18) return `Good Afternoon, ${teacherName}`;
//               return `Good Evening, ${teacherName}`;
//             })()}
//           </h2>
//         </div>

//         <div className="flex justify-between items-center mb-8">
//           <div className="text-gray-600">{formattedDate}</div>
//           <div className="text-gray-600">{formattedTime}</div>
//         </div>

//         {role === "hod" ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {facultyDetails && facultyDetails.length > 0 ? (
//               facultyDetails.map((faculty: any) => (
//                 <div
//                   key={faculty.facultyId}
//                   className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
//                   onClick={() =>
//                     router.push(
//                       `/faculty/facultypersonaldetails?facultyId=${faculty.facultyId}`
//                     )
//                   }
//                 >
//                   <h3 className="text-lg font-bold mb-2">
//                     {faculty.firstName} {faculty.middleName} {faculty.lastName}
//                   </h3>
//                   <p>
//                     <strong>Faculty Id:</strong> {faculty.facultyId}
//                   </p>
//                   <p>
//                     <strong>Qualification:</strong> {faculty.qualification}
//                   </p>
//                   <p>
//                     <strong>Department:</strong> {faculty.department}
//                   </p>
//                   <p>
//                     <strong>Designation:</strong> {faculty.designation}
//                   </p>
//                 </div>
//               ))
//             ) : null}
//               <p>No faculty details available.</p>
            
//           </div>
//         ) : role === "principal" ? (
//           !selectedBranch ? (
//           <div>
//             <button
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               onClick={() => handleConsolidation()}
//             >
//               Consolidation
//             </button>

//             {/* Branch Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {branch.map((branchItem: any) => (
//                 <div
//                   key={branchItem.branchName}
//                   className={`border rounded-lg shadow-md p-4 cursor-pointer ${
//                     selectedBranch === branchItem.branchCode
//                       ? "bg-blue-200"
//                       : "bg-white"
//                   } hover:shadow-lg`}
//                   onClick={() => setSelectedBranch(branchItem.branchCode)}
//                 >
//                   <h3 className="text-lg font-bold">{branchItem.branchName}</h3>
//                   <p>{branchItem.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           // Faculty Details Section
//           <div>
//             <button
//               className="bg-gray-200 px-4 py-2 rounded-md mb-4 hover:bg-gray-300"
//               onClick={() => setSelectedBranch(null)}
//             >
//               Back to Branches
//             </button>

//             {facultyDetails.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {facultyDetails.map((faculty: any) => (
//                   <div
//                     key={faculty.facultyId}
//                     className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
//                   >
//                     <h3 className="text-lg font-bold mb-2">
//                       {faculty.firstName} {faculty.middleName}{" "}
//                       {faculty.lastName}
//                     </h3>
//                     <p>
//                       <strong>Faculty Id:</strong> {faculty.facultyId}
//                     </p>
//                     <p>
//                       <strong>Qualification:</strong> {faculty.qualification}
//                     </p>
//                     <p>
//                       <strong>Department:</strong> {faculty.department}
//                     </p>
//                     <p>
//                       <strong>Designation:</strong> {faculty.designation}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//                 <div>
//                 <p className="mt-8 text-gray-600">
//                   No faculty details available for this department.
//                 </p>
//                 <button
//                   className="bg-gray-200 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
//                   onClick={() => setSelectedBranch(null)}
//                 >
//                   Back to Branches
//                 </button>
//                 </div>
//             )}
//           </div>
//         )}
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default DynamicDashboard;



// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const DynamicDashboard = () => {
//   const router = useRouter();
//   const [teacherName, setTeacherName] = useState("");
//   const [facultyDetails, setFacultyDetails] = useState<any[]>([]);
//   const [branch, setBranch] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

//   const currentDate = new Date();

//   const formattedDate = currentDate.toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   const formattedTime = currentDate.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   useEffect(() => {
//     try {
//       const user = localStorage.getItem("token");
//       if (user) {
//         const parsedUser = JSON.parse(user);
//         setTeacherName(parsedUser.username);
//         setRole(parsedUser.role);
//       } else {
//         setError("User data not found in local storage");
//       }
//     } catch (err) {
//       console.error("Error parsing user data:", err);
//       setError("An error occurred while retrieving user data.");
//     }
//   }, []);

//   useEffect(() => {
//     async function fetchBranches() {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "http://localhost:3000/api/faculty/branch"
//         );
//         const result = await response.json();
//         if (response.ok) {
//           setBranch(result.data.branches);
//         } else {
//           setError(result.error || "Failed to fetch branch details");
//         }
//       } catch (err) {
//         console.error("Error fetching branch details:", err);
//         setError("An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBranches();
//   }, []);

//   useEffect(() => {
//     if (selectedBranch) {
//       fetchFacultyInBranch(selectedBranch);
//     }
//   }, [selectedBranch]);

//   async function fetchFacultyInBranch(department: string) {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://localhost:3000/api/faculty/facultyDetails?department=${department}`
//       );
//       const result = await response.json();
//       console.log("faculty", result.data);
//       if (response.ok) {
//         setFacultyDetails(result.data || []);
//         if (!result.data || result.data.length === 0) {
//           setError("No faculty found in this department");
//         } else {
//           setError(null);
//         }
//       } else {
//         setError(result.error || "Failed to fetch faculty details for branch");
//       }
//     } catch (err) {
//       console.error("Error fetching faculty details for branch:", err);
//       setError("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }

//     if(facultyDetails) {
//       fetchFacultyInBranch(selectedBranch);
//     }
//   }

//   function handleConsolidation() {
//     router.push(`/consolidation`);
//   }

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-blue-800">
//             {(() => {
//               const currentHour = currentDate.getHours();
//               if (currentHour < 12) return `Good Morning, ${teacherName}`;
//               if (currentHour < 18) return `Good Afternoon, ${teacherName}`;
//               return `Good Evening, ${teacherName}`;
//             })()}
//           </h2>
//         </div>

//         <div className="flex justify-between items-center mb-8">
//           <div className="text-gray-600">{formattedDate}</div>
//           <div className="text-gray-600">{formattedTime}</div>
//         </div>

        // {role === "hod" ? (
        //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //     {facultyDetails.length > 0 ? (
        //       facultyDetails.map((faculty: any) => (
        //         <div
        //           key={faculty.facultyId}
        //           className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
        //           onClick={() =>
        //             router.push(
        //               `/faculty/facultypersonaldetails?facultyId=${faculty.facultyId}`
        //             )
        //           }
        //         >
        //           <h3 className="text-lg font-bold mb-2">
        //             {faculty.firstName} {faculty.middleName} {faculty.lastName}
        //           </h3>
        //           <p>
        //             <strong>Faculty Id:</strong> {faculty.facultyId}
        //           </p>
        //           <p>
        //             <strong>Qualification:</strong> {faculty.qualification}
        //           </p>
        //           <p>
        //             <strong>Department:</strong> {faculty.department}
        //           </p>
        //           <p>
        //             <strong>Designation:</strong> {faculty.designation}
        //           </p>
        //         </div>
        //       ))
        //     ) : (
        //       <p>No faculty details available.</p>
        //     )}
        //   </div>
        // ) : role === "principal" ? (
        //   !selectedBranch ? (
        //     <div>
        //       <button
        //         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        //         onClick={handleConsolidation}
        //       >
        //         Consolidation
        //       </button>
        //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //         {branch.map((branchItem: any) => (
        //           <div
        //             key={branchItem.branchName}
        //             className={`border rounded-lg shadow-md p-4 cursor-pointer ${
        //               selectedBranch === branchItem.branchCode
        //                 ? "bg-blue-200"
        //                 : "bg-white"
        //             } hover:shadow-lg`}
        //             onClick={() => setSelectedBranch(branchItem.branchCode)}
        //           >
        //             <h3 className="text-lg font-bold">
        //               {branchItem.branchName}
        //             </h3>
        //             <p>{branchItem.description}</p>
        //           </div>
        //         ))}
        //       </div>
        //     </div>
        //   ) : (
        //     <div>
        //       <button
        //         className="bg-gray-200 px-4 py-2 rounded-md mb-4 hover:bg-gray-300"
        //         onClick={() => setSelectedBranch(null)}
        //       >
        //         Back to Branches
        //       </button>
        //       {facultyDetails.length > 0 ? (
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //           {facultyDetails.map((faculty: any) => (
        //             <div
        //               key={faculty.facultyId}
        //               className="border rounded-lg shadow-md bg-white p-4 hover:shadow-lg cursor-pointer"
        //             >
        //               <h3 className="text-lg font-bold mb-2">
        //                 {faculty.firstName} {faculty.middleName}{" "}
        //                 {faculty.lastName}
        //               </h3>
        //               <p>
        //                 <strong>Faculty Id:</strong> {faculty.facultyId}
        //               </p>
        //               <p>
        //                 <strong>Qualification:</strong> {faculty.qualification}
        //               </p>
        //               <p>
        //                 <strong>Department:</strong> {faculty.department}
        //               </p>
        //               <p>
        //                 <strong>Designation:</strong> {faculty.designation}
        //               </p>
        //             </div>
        //           ))}
        //         </div>
        //       ) : (
        //         <div>
        //           <p className="mt-8 text-gray-600">
        //             No faculty details available for this department.
        //           </p>
        //           <button
        //             className="bg-gray-200 px-4 py-2 rounded-md mt-4 hover:bg-gray-300"
        //             onClick={() => setSelectedBranch(null)}
        //           >
        //             Back to Branches
        //           </button>
        //         </div>
        //       )}
        //     </div>
        //   )
        // ) : null}
//       </div>
//     </div>
//   );
// };

// export default DynamicDashboard;
