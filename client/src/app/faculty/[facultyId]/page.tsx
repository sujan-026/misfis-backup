"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const FacultyDetailPage = () => {
  const searchParams = useSearchParams();
  const facultyId = searchParams.get("facultyId"); // Get query parameter
  const [facultyDetails, setFacultyDetails] = useState(null);
  const [facultyEducationDetails, setFacultyEducationDetails] = useState(null);
  const [academicDetails, setAcademicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Faculty ID:", facultyId);
    if (facultyId) {
      async function fetchFacultyDetail() {
        try {
          const personalResponse = await fetch(
            `http://localhost:3000/api/facultypersonaldetails?facultyId=${facultyId}`
          );
          const educationResponse = await fetch(
            `http://localhost:3000/api/facultyeducation?facultyId=${facultyId}`
          );
          const academicResponse = await fetch(
            `http://localhost:3000/api/facultyacademicdetails?facultyId=${facultyId}`
          );
          console.log(
            "API Response:",
            personalResponse,
            educationResponse,
            academicResponse
          );
          const personalResult = await personalResponse.json();
          const educationResult = await educationResponse.json();
          const academicResult = await academicResponse.json();

          if (
            (personalResponse.ok, educationResponse.ok, academicResponse.ok)
          ) {
            console.log("Faculty Data:", personalResult.data);
            console.log("Education Data:", educationResult.data);
            console.log("Academics Data:", academicResult.data);
            setFacultyDetails(personalResult.data);
            setFacultyEducationDetails(personalResult.data);
            setAcademicDetails(academicResult.data);
          } else {
            console.error("API Error:", personalResult.error);
            setError(personalResult.error || "Failed to fetch faculty detail");
          }
        } catch (err) {
          console.error("Error fetching faculty detail:", err);
          setError("An unexpected error occurred");
        } finally {
          setLoading(false);
        }
      }

      fetchFacultyDetail();
    } else {
      console.error("Missing facultyId");
      setError("Faculty ID is missing");
      setLoading(false);
    }
  }, [facultyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <div className="min-h-screen p-6 bg-gray-100">
    //   <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
    //     <h2 className="text-2xl font-bold mb-4">Faculty Details</h2>
    //     <p>
    //       <strong>Faculty ID:</strong> {facultyDetail.facultyId}
    //     </p>
    //     <p>
    //       <strong>Name:</strong> {facultyDetail.firstName}{" "}
    //       {facultyDetail.middleName} {facultyDetail.lastName}
    //     </p>
    //     <p>
    //       <strong>Qualification:</strong> {facultyDetail.qualification}
    //     </p>
    //     <p>
    //       <strong>Department:</strong> {facultyDetail.department}
    //     </p>
    //     <p>
    //       <strong>Designation:</strong> {facultyDetail.designation}
    //     </p>
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        <div className="relative">
          <Image
            src={facultyDetails?.photo || ""}
            alt={`${facultyDetails?.firstName || ""} ${
              facultyDetails?.lastName || ""
            }`}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {facultyDetails.firstName} {facultyDetails.lastName}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Faculty ID</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.facultyId}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.qualification}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.contactNo}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {facultyDetails.emailId || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Qualification</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.qualification || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Title</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.title || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Middle Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.middleName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Alternate Contact No</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.alternateContactNo || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Emergency Contact No</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.emergencyContactNo || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Aadhar No</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.adharNo || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">PAN No</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.panNo || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.dob.split("T")[0] || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.gender || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Nationality</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.nationality || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">First Address Line 1</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.firstAddressLine1 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">First Address Line 2</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.firstAddressLine2 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">First Address Line 3</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.firstAddressLine3 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Correspondence Address Line 1
            </p>
            <p className="font-medium text-gray-800">
              {facultyDetails.correspondenceAddressLine1 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Correspondence Address Line 2
            </p>
            <p className="font-medium text-gray-800">
              {facultyDetails.correspondenceAddressLine2 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Correspondence Address Line 3
            </p>
            <p className="font-medium text-gray-800">
              {facultyDetails.correspondenceAddressLine3 || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Religion</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.religion || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Caste</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.caste || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.category || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Mother Tongue</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.motherTongue || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Specially Challenged</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.speciallyChallenged ? "Yes" : "No"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Remarks</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.remarks || "N/A"}
            </p>
          </div>
          {/* <div className="space-y-1">
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.languages || "N/A"}
            </p>
          </div> */}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Academic Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Program</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.Program || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">UsnSsn</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.usnSsn || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">School College</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.schoolCollege || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.specialization || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Medium Of Instruction</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.mediumOfInstruction || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Pass Class</p>
            <p className="font-medium text-gray-800">
              {facultyEducationDetails.passClass || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Bank Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Bank Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.bankName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Account Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.accountName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.accountType || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Account Number</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.accountNo || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Branch</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.branch || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">IFSC</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.ifsc || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">PF Number</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.pfNumber || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">UAN Number</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.uanNumber || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Pension Number</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.pensionNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Family Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Mother's Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.motherName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Father's Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.fatherName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Spouse Name</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.spouseName || "N/A"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Children</p>
            <p className="font-medium text-gray-800">
              {facultyDetails.children || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Academic Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Employee ID</p>
            <p className="font-medium text-gray-800">
              {academicDetails.employeeId}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Faculty ID</p>
            <p className="font-medium text-gray-800">
              {academicDetails.facultyId}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Qualification</p>
            <p className="font-medium text-gray-800">
              {academicDetails.qualification}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium text-gray-800">
              {academicDetails.department}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Designation</p>
            <p className="font-medium text-gray-800">
              {academicDetails.designation}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Level</p>
            <p className="font-medium text-gray-800">{academicDetails.level}</p>
          </div>

          {/* Responsibilities */}
          {/* <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Responsibilities
            </h2>
            {academicDetails.responsibilities.map(
              (
                responsibility: {
                  additionalResponsibility: string;
                  level: string;
                  fromDate: string;
                  toDate: string;
                },
                index: number
              ) => (
                <div key={index} className="mb-4">
                  <p className="font-medium text-gray-800">
                    {responsibility.additionalResponsibility} (
                    {responsibility.level})
                  </p>
                  <p className="text-sm text-gray-500">
                    From:{" "}
                    {new Date(responsibility.fromDate).toLocaleDateString()} -
                    To: {new Date(responsibility.toDate).toLocaleDateString()}
                  </p>
                </div>
              )
            )}
          </div> */}

          {/* Awards and Recognition */}
          {/* <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Awards and Recognition
          </h2>
          {academicDetails.data.awardsandrecognition.map((award, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-gray-800">{award.awardReceived}</p>
              <p className="text-sm text-gray-500">
                {award.recognitionReceived}
              </p>
            </div>
          ))}
        </div> */}

          {/* Events Attended */}
          {/* <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Events Attended
          </h2>
          {academicDetails.data.eventsAttended.map((event, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-gray-800">{event.nameofevent}</p>
              <p className="text-sm text-gray-500">{event.typeofevent}</p>
              <p className="text-sm text-gray-500">
                {new Date(event.fromDate).toLocaleDateString()} -{" "}
                {new Date(event.toDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">{event.organizer}</p>
              <p className="text-sm text-gray-500">{event.venue}</p>
            </div>
          ))}
        </div> */}

          {/* Research Experience */}
          {/* <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Research Experience
          </h2>
          {academicDetails.data.researchExperience.map((experience, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium text-gray-800">
                {experience.organization}
              </p>
              <p className="text-sm text-gray-500">{experience.designation}</p>
              <p className="text-sm text-gray-500">
                {new Date(experience.fromDate).toLocaleDateString()} -{" "}
                {new Date(experience.toDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailPage;
