import React from 'react'
import FormField from "@/components/FormField";

const HandleMapping = () => {
    const formFieldsData = [
      {
        label: "Last Name",
        stepsReference: "personalSchema.lastName",
        type: "text",
      },
      {
        label: "Email ID",
        stepsReference: "personalSchema.emailId",
        type: "email",
      },
      {
        label: "Contact Number",
        stepsReference: "personalSchema.contactNo",
        type: "tel",
      },
      {
        label: "Alternate Contact Number",
        stepsReference: "personalSchema.alternateContactNo",
        type: "tel",
      },
      {
        label: "Emergency Contact Number",
        stepsReference: "personalSchema.emergencyContactNo",
        type: "tel",
      },
      {
        label: "Aadhar Number",
        stepsReference: "personalSchema.aadhar",
        type: "text",
      },
      {
        label: "PAN Number",
        stepsReference: "personalSchema.pan",
        type: "text",
      },
      {
        label: "Date of Birth",
        stepsReference: "personalSchema.dob",
        type: "date",
      },
    ];
  return (
    <>
      {formFieldsData.map((field, index) => (
        <FormField
          key={index}
          label={field.label}
          stepsReference={field.stepsReference}
          type={field.type}
        />
      ))}
    </>
  )
}

export default HandleMapping