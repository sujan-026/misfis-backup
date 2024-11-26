// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function ConsolidationPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [branch, setBranch] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState({
//     journals: [],
//     conferences: [],
//     consultancies: [],
//     patents: [],
//     publications: [],
//     researchGrants: [],
//   });

//   const [branches, setBranches] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState("all");
//   const [filters, setFilters] = useState({
//     journals: "all",
//     conferences: "all",
//     publications: "all",
//   });

//   const [selected, setSelected] = useState({
//     journals: false,
//     conferences: false,
//     consultancies: false,
//     patents: false,
//     publications: false,
//     researchGrants: false,
//   });

//   useEffect(() => {
//     // Fetch all data
//     fetch("/api/consolidation")
//       .then((res) => res.json())
//       .then((data) => setData(data));

//     // Fetch all branches
//     // fetch("/api/branches")
//     //   .then((res) => res.json())
//     //   .then((data) => setBranches(data.branches || []));
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

//   const handleSelection = (type: keyof typeof selected) => {
//     setSelected((prev) => ({ ...prev, [type]: !prev[type] }));
//   };

//   const handleFilterChange = (type: string, value: string) => {
//     setFilters((prev) => ({ ...prev, [type]: value }));
//   };

//   const handleBranchChange = (branchCode: string) => {
//     setSelectedBranch(branchCode);
//   };

//   const filterDataByBranch = (items: any[]) => {
//     if (selectedBranch === "all") return items;
//     return items.filter((item) => item.facultyId.startsWith(selectedBranch));
//   };

//   const filterData = (type: string, items: any[]) => {
//     const filteredByBranch = filterDataByBranch(items);
//     if (type === "publications") {
//       if (filters.publications === "all") return filteredByBranch;
//       return filteredByBranch.filter(
//         (item) => item.publicationType === filters.publications
//       );
//     }
//     if (type === "journals" || type === "conferences") {
//       if (filters[type] === "all") return filteredByBranch;
//       return filteredByBranch.filter((item) => item.role === filters[type]);
//     }
//     return filteredByBranch;
//   };

//   const renderTable = (type: string, items: any[]) => {
//     if (items.length === 0) {
//       return <p className="text-gray-500">No data available</p>;
//     }

//     const headers = Object.keys(items[0]);

//     return (
//       <table className="w-full border border-gray-300 rounded-lg text-left mt-4">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border px-4 py-2">#</th>
//             {headers.map((header) => (
//               <th key={header} className="border px-4 py-2 capitalize">
//                 {header.replace(/([A-Z])/g, " $1")}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={item.id} className="hover:bg-gray-50">
//               <td className="border px-4 py-2">{index + 1}</td>
//               {headers.map((header) => (
//                 <td key={header} className="border px-4 py-2">
//                   {item[header] !== null && item[header] !== undefined
//                     ? item[header]
//                     : "-"}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Consolidation Page
//       </h1>
//       {/* Home Button */}
//       <button
//         onClick={() => router.push("/faculty")}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
//       >
//         Home
//       </button>

//       {/* Branch Dropdown */}
//       <div className="mb-6">
//         <label htmlFor="branch-select" className="block font-medium mb-2">
//           Filter by Branch:
//         </label>
//         <select
//           id="branch-select"
//           value={selectedBranch}
//           onChange={(e) => handleBranchChange(e.target.value)}
//           className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="all">All Branches</option>
//           {branch.map((branch: any) => (
//             <option key={branch.branchCode} value={branch.branchCode}>
//               {branch.branchName}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Toggle Buttons */}
//       <div className="flex flex-wrap gap-4 justify-center mb-6">
//         {Object.keys(data).map((type) => (
//           <button
//             key={type}
//             onClick={() => handleSelection(type as keyof typeof selected)}
//             className={`px-4 py-2 rounded-full text-sm font-medium ${
//               selected[type as keyof typeof selected]
//                 ? "bg-purple-600 text-white"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             {type.replace(/([A-Z])/g, " $1")}
//           </button>
//         ))}
//       </div>
//       {/* Data Tables */}
//       <div className="space-y-8">
//         {selected.journals && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Journals</h2>
//             <select
//               onChange={(e) => handleFilterChange("journals", e.target.value)}
//               className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All</option>
//               <option value="international">International</option>
//               <option value="national">National</option>
//             </select>
//             {renderTable("journals", filterData("journals", data.journals))}
//           </section>
//         )}

//         {selected.conferences && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Conferences</h2>
//             <select
//               onChange={(e) =>
//                 handleFilterChange("conferences", e.target.value)
//               }
//               className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All</option>
//               <option value="international">International</option>
//               <option value="national">National</option>
//             </select>
//             {renderTable(
//               "conferences",
//               filterData("conferences", data.conferences)
//             )}
//           </section>
//         )}

//         {/* Other Data Sections */}
//         {/* Add similar sections for consultancies, patents, publications, and researchGrants */}
//         {selected.consultancies && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Consultancies</h2>
//             {renderTable("consultancies", data.consultancies)}
//           </section>
//         )}

//         {selected.patents && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Patents</h2>
//             {renderTable("patents", data.patents)}
//           </section>
//         )}

//         {selected.publications && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Publications</h2>
//             <select
//               onChange={(e) =>
//                 handleFilterChange("publications", e.target.value)
//               }
//               className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All</option>
//               <option value="Journal">Journal</option>
//               <option value="Conference">Conference</option>
//               <option value="Webinar">Webinar</option>
//             </select>
//             {renderTable(
//               "publications",
//               filterData("publications", data.publications)
//             )}
//           </section>
//         )}

//         {selected.researchGrants && (
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Research Grants</h2>
//             <select
//               onChange={(e) =>
//                 handleFilterChange("researchGrants", e.target.value)
//               }
//               className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All</option>
//               <option value="funded">Funded</option>
//               <option value="unfunded">Unfunded</option>
//             </select>
//             {renderTable("researchGrants", data.researchGrants)}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConsolidationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    journals: [],
    conferences: [],
    consultancies: [],
    patents: [],
    publications: [],
    researchGrants: [],
  });

  const [selectedBranch, setSelectedBranch] = useState("all");
  const [filters, setFilters] = useState({
    journals: "all",
    conferences: "all",
    publications: "all",
  });

  const [selected, setSelected] = useState({
    journals: false,
    conferences: false,
    consultancies: false,
    patents: false,
    publications: false,
    researchGrants: false,
  });

  useEffect(() => {
    // Fetch all data
    fetch("/api/consolidation")
      .then((res) => res.json())
      .then((data) => setData(data));

    // Fetch all branches
    async function fetchBranches() {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/faculty/branch"
        );
        const result = await response.json();
        if (response.ok) {
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

  const handleSelection = (type: keyof typeof selected) => {
    setSelected((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleBranchChange = (branchCode: string) => {
    setSelectedBranch(branchCode);
  };

  const filterDataByBranch = (items: any[]) => {
    if (selectedBranch === "all") return items;
    return items.filter((item) => item.facultyId.startsWith(selectedBranch));
  };

  const filterData = (type: string, items: any[]) => {
    const filteredByBranch = filterDataByBranch(items);
    if (type === "publications") {
      if (filters.publications === "all") return filteredByBranch;
      return filteredByBranch.filter(
        (item) => item.publicationType === filters.publications
      );
    }
    if (type === "journals" || type === "conferences") {
      if (filters[type] === "all") return filteredByBranch;
      return filteredByBranch.filter((item) => item.role === filters[type]);
    }
    return filteredByBranch;
  };

  const renderTable = (type: string, items: any[]) => {
    if (items.length === 0) {
      return <p className="text-gray-500">No data available</p>;
    }

    const headers = Object.keys(items[0]);

    return (
      <table className="w-full border border-gray-300 rounded-lg text-left mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">#</th>
            {headers.map((header) => (
              <th key={header} className="border px-4 py-2 capitalize">
                {header.replace(/([A-Z])/g, " $1")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              {headers.map((header) => (
                <td key={header} className="border px-4 py-2">
                  {item[header] !== null && item[header] !== undefined
                    ? item[header]
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Consolidation Page
      </h1>

      <div className="flex justify-between mb-6">
        {/* Home Button */}
        <button
          onClick={() => router.push("/faculty")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Home
        </button>

        {/* Branch Dropdown */}
        <div>
          <label htmlFor="branch-select" className="block font-medium mb-2">
            Filter by Branch:
          </label>
          <select
            id="branch-select"
            value={selectedBranch}
            onChange={(e) => handleBranchChange(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Branches</option>
            {branch.map((branch: any) => (
              <option key={branch.branchCode} value={branch.branchCode}>
                {branch.branchName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {Object.keys(data).map((type) => (
          <button
            key={type}
            onClick={() => handleSelection(type as keyof typeof selected)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selected[type as keyof typeof selected]
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>

      {/* Data Tables */}
      <div className="space-y-8">
        {selected.journals && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Journals</h2>
            <select
              onChange={(e) => handleFilterChange("journals", e.target.value)}
              className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="international">International</option>
              <option value="national">National</option>
            </select>
            {renderTable("journals", filterData("journals", data.journals))}
          </section>
        )}

        {selected.conferences && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Conferences</h2>
            <select
              onChange={(e) =>
                handleFilterChange("conferences", e.target.value)
              }
              className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="international">International</option>
              <option value="national">National</option>
            </select>
            {renderTable(
              "conferences",
              filterData("conferences", data.conferences)
            )}
          </section>
        )}

        {selected.consultancies && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Consultancies</h2>
            {renderTable(
              "consultancies",
              filterDataByBranch(data.consultancies)
            )}
          </section>
        )}

        {selected.patents && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Patents</h2>
            {renderTable("patents", filterDataByBranch(data.patents))}
          </section>
        )}

        {selected.publications && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Publications</h2>
            <select
              onChange={(e) =>
                handleFilterChange("publications", e.target.value)
              }
              className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="Journal">Journal</option>
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
            </select>
            {renderTable(
              "publications",
              filterData("publications", data.publications)
            )}
          </section>
        )}

        {selected.researchGrants && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Research Grants</h2>
            <select
              onChange={(e) =>
                handleFilterChange("researchGrants", e.target.value)
              }
              className="mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="funded">Funded</option>
              <option value="unfunded">Unfunded</option>
            </select>
            {renderTable(
              "researchGrants",
              filterDataByBranch(data.researchGrants)
            )}
          </section>
        )}
      </div>
    </div>
  );
}
