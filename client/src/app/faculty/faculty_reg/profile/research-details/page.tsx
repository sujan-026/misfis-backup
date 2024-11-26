"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { z } from "zod";
import { facultyResearchDetailsSchema } from "@/schemas/research-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { identity } from "lodash";
import FormProgress from "@/components/FormProgress";
import { Step } from "@/types/form";
import FormField from "@/components/FormField";
import FormNavigation from "@/components/FormNavigation";
import { FormProvider } from "@/hooks/FormProvider";
import Header from "@/components/ui/header";
import { NavLinks } from "@/components/ui/nav-links";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

type Inputs = z.infer<typeof facultyResearchDetailsSchema>;

const steps: Step[] = [
  {
    id: "Step 1",
    name: "Faculty Research Details",
    fields: [
      "facultyResearchSchema.vtuFacultyId",
      "facultyResearchSchema.aicteFacultyId",
      "facultyResearchSchema.orcId",
      "facultyResearchSchema.scopusId",
      "facultyResearchSchema.publonsAndWebOfScienceId",
    ],
  },
  {
    id: "Step 2",
    name: "National and International Journal",
    fields: [
      "nationalJournalDetailsSchema",
      "internationalJournalDetailsSchema",
    ],
  },
  {
    id: "Step 3",
    name: "National and International Conference",
    fields: [
      "nationalConferenceDetailsSchema",
      "internationalConferenceDetailsSchema",
    ],
  },
  {
    id: "Step 4",
    name: "Research and Consultancy",
    fields: ["researchGrantsSchema", "consultancySchema"],
  },
  {
    id: "Step 5",
    name: "Patents Details",
    fields: ["patentsSchema"],
  },
  {
    id: "Step 6",
    name: "Research Scholar Details",
    fields: ["researchScholarDetailsSchema"],
  },
  {
    id: "Step 7",
    name: "Publications and Awards",
    fields: ["publicationsSchema"],
  },
  { id: "Step 8", name: "Complete", fields: [] },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(facultyResearchDetailsSchema),
  });

  const {
    fields: nationalJournal,
    append: appendNationalJournal,
    remove: removeNationalJournal,
  } = useFieldArray({ control, name: "nationalJournalDetailsSchema" });

  const {
    fields: internationalJournal,
    append: appendInternationalJournal,
    remove: removeInternationalJournal,
  } = useFieldArray({ control, name: "internationalJournalDetailsSchema" });
  const {
    fields: nationalConference,
    append: appendNationalConference,
    remove: removeNationalConference,
  } = useFieldArray({ control, name: "nationalConferenceDetailsSchema" });

  const {
    fields: internationalConference,
    append: appendInternationalConference,
    remove: removeInternationalConference,
  } = useFieldArray({ control, name: "internationalConferenceDetailsSchema" });

  const {
    fields: researchGrants,
    append: appendResearchGrants,
    remove: removeResearchGrants,
  } = useFieldArray({ control, name: "researchGrantsSchema" });

  const {
    fields: consultancy,
    append: appendConsultancy,
    remove: removeConsultancy,
  } = useFieldArray({ control, name: "consultancySchema" });

  const {
    fields: patents,
    append: appendPatents,
    remove: removePatents,
  } = useFieldArray({ control, name: "patentsSchema" });

  const {
    fields: researchScholar,
    append: appendResearchScholar,
    remove: removeResearchScholar,
  } = useFieldArray({ control, name: "researchScholarDetailsSchema" });
  const {
    fields: publications,
    append: appendPublications,
    remove: removePublications,
  } = useFieldArray({ control, name: "publicationsSchema" });
  const facultyId = searchParams.get("facultyId");
  useEffect(() => {
    if (!facultyId) {
      alert("Faculty ID is missing. Redirecting...");
      router.push("/"); // Redirect to the dashboard or relevant page
    }
  }, [facultyId, router]);
  
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const submitresearch = await axios.post("/api/facultyresearchdetails", {
      facultyResearchSchema: data.facultyResearchSchema,
      nationalJournalDetailsSchema: data.nationalJournalDetailsSchema,
      internationalJournalDetailsSchema: data.internationalJournalDetailsSchema,
      nationalConferenceDetailsSchema: data.nationalConferenceDetailsSchema,
      internationalConferenceDetailsSchema:
        data.internationalConferenceDetailsSchema,
      researchGrantsSchema: data.researchGrantsSchema,
      consultancySchema: data.consultancySchema,
      patentsSchema: data.patentsSchema,
      researchScholarDetailsSchema: data.researchScholarDetailsSchema,
      publicationsSchema: data.publicationsSchema,
    });
    if (submitresearch.status === 200) {
      console.log("Data submitted successfully");
    } else {
      console.log("Data submission failed");
    }
    //reset();
  };

  type FieldName = keyof Inputs;

  const nextButtonFunction = async () => {
    const fields = steps[currentStep].fields;
  
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
  
    if (!output) return; // Prevent navigation if validation fails
  
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prevButtonFunction = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div>
      <Header title="Faculty Details" />
      <NavLinks />

      <section className=" flex flex-col justify-between p-24">
        <FormProgress steps={steps} currentStep={currentStep} />

        <FormProvider register={register} errors={errors}>
          <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Faculty Research Details
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    label="VTU Faculty ID"
                    stepsReference="facultyResearchSchema.vtuFacultyId"
                    type="text"
                  />

                  <FormField
                    label="AICTE Faculty ID"
                    stepsReference="facultyResearchSchema.aicteFacultyId"
                    type="text"
                  />

                  <FormField
                    label="ORC ID"
                    stepsReference="facultyResearchSchema.orcId"
                    type="text"
                  />

                  <FormField
                    label="Scopus ID"
                    stepsReference="facultyResearchSchema.scopusId"
                    type="text"
                  />

                  <FormField
                    label="Publons ID"
                    stepsReference="facultyResearchSchema.publonsAndWebOfScienceId"
                    type="text"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  National Journal Details
                </h2>

                {nationalJournal.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Research Paper"
                      stepsReference={`nationalJournalDetailsSchema[${index}].titleOfResearchPaper`}
                      type="text"
                    />

                    <FormField
                      label="Name Of Journal"
                      stepsReference={`nationalJournalDetailsSchema[${index}].nameOfJournal`}
                      type="text"
                    />

                    <FormField
                      label="Volume"
                      stepsReference={`nationalJournalDetailsSchema[${index}].volume`}
                      type="text"
                    />

                    <FormField
                      label="issueNo"
                      stepsReference={`nationalJournalDetailsSchema[${index}].issueNo`}
                      type="text"
                    />

                    <FormField
                      label="Year Of Publication"
                      stepsReference={`nationalJournalDetailsSchema[${index}].yearOfPublication`}
                      type="number"
                    />

                    <FormField
                      label="Page No From"
                      stepsReference={`nationalJournalDetailsSchema[${index}].pageNoFrom`}
                      type="number"
                    />

                    <FormField
                      label="Page No To"
                      stepsReference={`nationalJournalDetailsSchema[${index}].pageNoTo`}
                      type="number"
                    />

                    <FormField
                      label="Author 01"
                      stepsReference={`nationalJournalDetailsSchema[${index}].author01`}
                      type="text"
                    />

                    <FormField
                      label="Author 02"
                      stepsReference={`nationalJournalDetailsSchema[${index}].author02`}
                      type="text"
                    />

                    <FormField
                      label="Author 03"
                      stepsReference={`nationalJournalDetailsSchema[${index}].author03`}
                      type="text"
                    />

                    <FormField
                      label="Author 04"
                      stepsReference={`nationalJournalDetailsSchema[${index}].author04`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Published Under
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `nationalJournalDetailsSchema.${index}.publishedUnder`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Web of Science">Web of Science</option>
                        <option value="Scopus">Scopus</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                      </select>
                      {errors.nationalJournalDetailsSchema?.[index]
                        ?.publishedUnder && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.nationalJournalDetailsSchema[index]
                              .publishedUnder.message
                          }
                        </p>
                      )}
                    </div>

                    <FormField
                      label="Impact Factor"
                      stepsReference={`nationalJournalDetailsSchema[${index}].impactFactor`}
                      type="number"
                    />
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeNationalJournal(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendNationalJournal({
                      titleOfResearchPaper: "",
                      nameOfJournal: "",
                      volume: "",
                      issueNo: "",
                      yearOfPublication: "",
                      pageNoFrom: "",
                      pageNoTo: "",
                      author01: "",
                      author02: "",
                      author03: "",
                      author04: "",
                      publishedUnder: "Web of Science",
                      impactFactor: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add a National Journal Publication
                </button>

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  International Journal Details
                </h2>

                {internationalJournal.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Research Paper"
                      stepsReference={`internationalJournalDetailsSchema[${index}].titleOfResearchPaper`}
                      type="text"
                    />

                    <FormField
                      label="Name Of Journal"
                      stepsReference={`internationalJournalDetailsSchema[${index}].nameOfJournal`}
                      type="text"
                    />

                    <FormField
                      label="Volume"
                      stepsReference={`internationalJournalDetailsSchema[${index}].volume`}
                      type="text"
                    />

                    <FormField
                      label="Issue No"
                      stepsReference={`internationalJournalDetailsSchema[${index}].issueNo`}
                      type="text"
                    />

                    <FormField
                      label="Year Of Publication"
                      stepsReference={`internationalJournalDetailsSchema[${index}].yearOfPublication`}
                      type="number"
                    />

                    <FormField
                      label="Page No From"
                      stepsReference={`internationalJournalDetailsSchema[${index}].pageNoFrom`}
                      type="number"
                    />

                    <FormField
                      label="Page No To"
                      stepsReference={`internationalJournalDetailsSchema[${index}].pageNoTo`}
                      type="number"
                    />

                    <FormField
                      label="Author 01"
                      stepsReference={`internationalJournalDetailsSchema[${index}].author01`}
                      type="text"
                    />

                    <FormField
                      label="Author 02"
                      stepsReference={`internationalJournalDetailsSchema[${index}].author02`}
                      type="text"
                    />

                    <FormField
                      label="Author 03"
                      stepsReference={`internationalJournalDetailsSchema[${index}].author03`}
                      type="text"
                    />

                    <FormField
                      label="Author 04"
                      stepsReference={`internationalJournalDetailsSchema[${index}].author04`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Published Under
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `internationalJournalDetailsSchema.${index}.publishedUnder`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Web of Science">Web of Science</option>
                        <option value="Scopus">Scopus</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="SCI">SCI</option>
                      </select>
                      {errors.internationalJournalDetailsSchema?.[index]
                        ?.publishedUnder && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.internationalJournalDetailsSchema[index]
                              .publishedUnder.message
                          }
                        </p>
                      )}
                    </div>

                    <FormField
                      label="Impact Factor"
                      stepsReference={`internationalJournalDetailsSchema[${index}].impactFactor`}
                      type="number"
                    />

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeInternationalJournal(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendInternationalJournal({
                      titleOfResearchPaper: "",
                      nameOfJournal: "",
                      volume: "",
                      issueNo: "",
                      yearOfPublication: "",
                      pageNoFrom: "",
                      pageNoTo: "",
                      author01: "",
                      author02: "",
                      author03: "",
                      author04: "",
                      publishedUnder: "Web of Science",
                      impactFactor: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add an International Journal Publication
                </button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  National Conference Details
                </h2>

                {nationalConference.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Research Paper"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].titleOfResearchPaper`}
                      type="text"
                    />

                    <FormField
                      label="Name Of Journal"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].nameOfJournal`}
                      type="text"
                    />

                    <FormField
                      label="Volume"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].volume`}
                      type="text"
                    />

                    <FormField
                      label="Issue No"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].issueNo`}
                      type="text"
                    />

                    <FormField
                      label="Year Of Publication"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].yearOfPublication`}
                      type="number"
                    />

                    <FormField
                      label="Page No From"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].pageNoFrom`}
                      type="number"
                    />

                    <FormField
                      label="Page No To"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].pageNoTo`}
                      type="number"
                    />

                    <FormField
                      label="Author 01"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].author01`}
                      type="text"
                    />

                    <FormField
                      label="Author 02"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].author02`}
                      type="text"
                    />

                    <FormField
                      label="Author 03"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].author03`}
                      type="text"
                    />

                    <FormField
                      label="Author 04"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].author04`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Published Under
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `nationalConferenceDetailsSchema.${index}.publishedUnder`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Web of Science">Web of Science</option>
                        <option value="Scopus">Scopus</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                      </select>
                      {errors.nationalConferenceDetailsSchema?.[index]
                        ?.publishedUnder && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.nationalConferenceDetailsSchema[index]
                              .publishedUnder.message
                          }
                        </p>
                      )}
                    </div>

                    <FormField
                      label="Impact Factor"
                      stepsReference={`nationalConferenceDetailsSchema[${index}].impactFactor`}
                      type="number"
                    />

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeNationalConference(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendNationalConference({
                      titleOfResearchPaper: "",
                      nameOfJournal: "",
                      volume: "",
                      issueNo: "",
                      yearOfPublication: "",
                      pageNoFrom: "",
                      pageNoTo: "",
                      author01: "",
                      author02: "",
                      author03: "",
                      author04: "",
                      publishedUnder: "Web of Science",
                      impactFactor: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add a National Conference Publication
                </button>

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  International Conference Details
                </h2>

                {internationalConference.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Research Paper"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].titleOfResearchPaper`}
                      type="text"
                    />

                    <FormField
                      label="Name Of Journal"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].nameOfJournal`}
                      type="text"
                    />

                    <FormField
                      label="Volume"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].volume`}
                      type="text"
                    />

                    <FormField
                      label="Issue No"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].issueNo`}
                      type="text"
                    />

                    <FormField
                      label="Year Of Publication"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].yearOfPublication`}
                      type="number"
                    />

                    <FormField
                      label="Page No From"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].pageNoFrom`}
                      type="number"
                    />

                    <FormField
                      label="Page No To"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].pageNoTo`}
                      type="number"
                    />

                    <FormField
                      label="Author 01"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].author01`}
                      type="text"
                    />

                    <FormField
                      label="Author 02"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].author02`}
                      type="text"
                    />

                    <FormField
                      label="Author 03"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].author03`}
                      type="text"
                    />

                    <FormField
                      label="Author 04"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].author04`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Published Under
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `internationalConferenceDetailsSchema.${index}.publishedUnder`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Web of Science">Web of Science</option>
                        <option value="Scopus">Scopus</option>
                        <option value="Q1">Q1</option>
                        <option value="Q2">Q2</option>
                        <option value="Q3">Q3</option>
                        <option value="SCI">SCI</option>
                      </select>
                      {errors.internationalConferenceDetailsSchema?.[index]
                        ?.publishedUnder && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.internationalConferenceDetailsSchema[index]
                              .publishedUnder.message
                          }
                        </p>
                      )}
                    </div>

                    <FormField
                      label="Impact Factor"
                      stepsReference={`internationalConferenceDetailsSchema[${index}].impactFactor`}
                      type="number"
                    />

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeInternationalConference(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendInternationalConference({
                      titleOfResearchPaper: "",
                      nameOfJournal: "",
                      volume: "",
                      issueNo: "",
                      yearOfPublication: "",
                      pageNoFrom: "",
                      pageNoTo: "",
                      author01: "",
                      author02: "",
                      author03: "",
                      author04: "",
                      publishedUnder: "Web of Science",
                      impactFactor: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add an International Conference Publication
                </button>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Research Grants
                </h2>
                {researchGrants.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Project"
                      stepsReference={`researchGrantsSchema[${index}].titleOfProject`}
                      type="text"
                    />

                    <FormField
                      label="Time Period Of Project (in years)"
                      stepsReference={`researchGrantsSchema[${index}].timePeriodOfProject`}
                      type="number"
                    />

                    <FormField
                      label="Sanctioned Date"
                      stepsReference={`researchGrantsSchema[${index}].sanctionedDate`}
                      type="date"
                    />

                    <FormField
                      label="Amount Sanctioned"
                      stepsReference={`researchGrantsSchema[${index}].sanctionedAmount`}
                      type="number"
                    />

                    <FormField
                      label="Funded Agency"
                      stepsReference={`researchGrantsSchema[${index}].fundedBy`}
                      type="text"
                    />
                    <FormField
                      label="Designation of Principal Investigator"
                      stepsReference={`researchGrantsSchema[${index}].principalInvestigatorDesignation`}
                      type="text"
                    />
                    <FormField
                      label="Institute of Principal Investigator"
                      stepsReference={`researchGrantsSchema[${index}].principalInvestigatorInstitute`}
                      type="text"
                    />
                    <FormField
                      label="Designation of Co-Principal Investigator"
                      stepsReference={`researchGrantsSchema[${index}].coPrincipalInvestigatorDesignation`}
                      type="text"
                    />
                    <FormField
                      label="Institute of Co-Principal Investigator"
                      stepsReference={`researchGrantsSchema[${index}].coPrincipalInvestigatorInstitute`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Any Phd Awarded
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `researchGrantsSchema.${index}.anyPhdAwarded`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.researchGrantsSchema?.[index]?.anyPhdAwarded && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.researchGrantsSchema[index].anyPhdAwarded
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status of Project
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(`researchGrantsSchema.${index}.status`)}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {errors.researchGrantsSchema?.[index]?.status && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.researchGrantsSchema[index].status.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeResearchGrants(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendResearchGrants({
                      titleOfProject: "",
                      timePeriodOfProject: "1",
                      sanctionedDate: new Date(),
                      sanctionedAmount: "0",
                      fundedBy: "",
                      principalInvestigatorDesignation: "",
                      principalInvestigatorInstitute: "",
                      coPrincipalInvestigatorDesignation: "",
                      coPrincipalInvestigatorInstitute: "",
                      anyPhdAwarded: "Yes",
                      status: "Ongoing",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add a Research Grant
                </button>

                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Consultancy
                </h2>
                {consultancy.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Time Period Of Project (in years)"
                      stepsReference={`consultancySchema[${index}].timePeriodOfProject`}
                      type="number"
                    />

                    <FormField
                      label="Sanctioned Date"
                      stepsReference={`consultancySchema[${index}].sanctionedDate`}
                      type="date"
                    />

                    <FormField
                      label="Amount Sanctioned"
                      stepsReference={`consultancySchema[${index}].sanctionedAmount`}
                      type="number"
                    />

                    <FormField
                      label="Funded Agency"
                      stepsReference={`consultancySchema[${index}].fundedBy`}
                      type="text"
                    />
                    <FormField
                      label="Designation of Principal Investigator"
                      stepsReference={`consultancySchema[${index}].principalInvestigatorDesignation`}
                      type="text"
                    />
                    <FormField
                      label="Institute of Principal Investigator"
                      stepsReference={`consultancySchema[${index}].principalInvestigatorInstitute`}
                      type="text"
                    />
                    <FormField
                      label="Designation of Co-Principal Investigator"
                      stepsReference={`consultancySchema[${index}].coPrincipalInvestigatorDesignation`}
                      type="text"
                    />
                    <FormField
                      label="Institute of Co-Principal Investigator"
                      stepsReference={`consultancySchema[${index}].coPrincipalInvestigatorInstitute`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status of Project
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(`consultancySchema.${index}.status`)}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {errors.consultancySchema?.[index]?.status && (
                        <p className="mt-2 text-sm text-red-600">
                          {errors.consultancySchema[index].status.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeConsultancy(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    appendConsultancy({
                      timePeriodOfProject: "1",
                      sanctionedDate: new Date(),
                      sanctionedAmount: "0",
                      fundedBy: "",
                      principalInvestigatorDesignation: "",
                      principalInvestigatorInstitute: "",
                      coPrincipalInvestigatorDesignation: "",
                      coPrincipalInvestigatorInstitute: "",
                      status: "Ongoing",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add a Consultancy
                </button>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Patents
                </h2>

                {patents.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Title Of Research Patent"
                      stepsReference={`patentsSchema[${index}].titleOfResearchPatent`}
                      type="text"
                    />

                    <FormField
                      label="Area of Research"
                      stepsReference={`patentsSchema[${index}].areaOfResearch`}
                      type="text"
                    />

                    <FormField
                      label="Patent Period"
                      stepsReference={`patentsSchema[${index}].patentPeriod`}
                      type="number"
                    />

                    <FormField
                      label="Patent Granted Year"
                      stepsReference={`patentsSchema[${index}].patentGrantedYear`}
                      type="number"
                    />

                    <FormField
                      label="Author 1"
                      stepsReference={`patentsSchema[${index}].author1`}
                      type="text"
                    />

                    <FormField
                      label="Author 2"
                      stepsReference={`patentsSchema[${index}].author2`}
                      type="text"
                    />

                    <FormField
                      label="Author 3"
                      stepsReference={`patentsSchema[${index}].author3`}
                      type="text"
                    />

                    <FormField
                      label="Author 4"
                      stepsReference={`patentsSchema[${index}].author4`}
                      type="text"
                    />

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removePatents(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Patent
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendPatents({
                      titleOfResearchPatent: "",
                      areaOfResearch: "",
                      patentPeriod: "0",
                      patentGrantedYear: "0",
                      author1: "",
                      author2: "",
                      author3: "",
                      author4: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add Patent
                </button>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Research Scholar
                </h2>

                {researchScholar.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <FormField
                      label="Name Of Research Scholar"
                      stepsReference={`researchScholarDetailsSchema[${index}].nameOfResearchScholar`}
                      type="text"
                    />

                    <FormField
                      label="University Seat Number"
                      stepsReference={`researchScholarDetailsSchema[${index}].universitySeatNumber`}
                      type="text"
                    />

                    <FormField
                      label="Area Of Research"
                      stepsReference={`researchScholarDetailsSchema[${index}].areaOfResearch`}
                      type="text"
                    />

                    <FormField
                      label="Date Of Registration"
                      stepsReference={`researchScholarDetailsSchema[${index}].dateOfRegistration`}
                      type="date"
                    />

                    <FormField
                      label="University of Registration"
                      stepsReference={`researchScholarDetailsSchema[${index}].universityOfRegistration`}
                      type="text"
                    />

                    <FormField
                      label="Designation of Supervisor"
                      stepsReference={`researchScholarDetailsSchema[${index}].designationOfResearcher`}
                      type="text"
                    />

                    <FormField
                      label="Name of Institute"
                      stepsReference={`researchScholarDetailsSchema[${index}].nameOfInstitute`}
                      type="text"
                    />

                    <div>
                      <label
                        htmlFor="publishedUnder"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Progress of Research Work
                      </label>
                      <select
                        id="publishedUnder"
                        {...register(
                          `researchScholarDetailsSchema.${index}.progressOfResearchWork`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {errors.researchScholarDetailsSchema?.[index]
                        ?.progressOfResearchWork && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.researchScholarDetailsSchema[index]
                              .progressOfResearchWork.message
                          }
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeResearchScholar(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Research Scholar
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendResearchScholar({
                      nameOfResearchScholar: "",
                      universitySeatNumber: "",
                      areaOfResearch: "",
                      dateOfRegistration: new Date(),
                      universityOfRegistration: "",
                      designationOfResearcher: "",
                      nameOfInstitute: "",
                      progressOfResearchWork: "Ongoing",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add Research Scholar
                </button>
              </motion.div>
            )}
            {currentStep === 6 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Publications
                </h2>



                {publications.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  >
                    <div>
                      <label
                        htmlFor="directCorr"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Direct/Correspondence
                      </label>
                      <select
                        id="directCorr"
                        {...register(
                          `publicationsSchema.${index}.typeOfPublication`
                        )}
                        className="mt-1 block w-full p-1 py-2.5 rounded-md border bg-gray-50 border-gray-300 shadow-sm"
                      >
                        <option value="Direct">Direct</option>
                        <option value="Correspondence">Correspondence</option>
                      </select>
                      {errors.publicationsSchema?.[index]
                        ?.typeOfPublication && (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            errors.publicationsSchema[index].typeOfPublication
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <FormField
                      label="N/IN"
                      stepsReference={`publicationsSchema[${index}].n_In`}
                      type="text"
                    />

                    <FormField
                      label="Name of journal"
                      stepsReference={`publicationsSchema[${index}].nameOfJournal`}
                      type="text"
                    />

                    <FormField
                      label="Volume and Page"
                      stepsReference={`publicationsSchema[${index}].volumeAndPage`}
                      type="text"
                    />
                    <FormField
                      label="DOI"
                      stepsReference={`publicationsSchema[${index}].doi`}
                      type="text"
                    />
                    <FormField
                      label="Impact Factor"
                      stepsReference={`publicationsSchema[${index}].impactFactor`}
                      type="text"
                    />
                    <div className="col-span-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removePublications(index)}
                        className="text-red-500 text-sm"
                      >
                        Remove Button
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    appendPublications({
                      typeOfPublication: "Journal",
                      n_In: "",
                      nameOfJournal: "",
                      volumeAndPage: "",
                      doi: "",
                      impactFactor: "",
                    })
                  }
                  className="text-blue-500 text-sm"
                >
                  + Add Publications
                </button>
              </motion.div>
            )}

          {currentStep === 7 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Review and Submit
              </h2>
              <p className="text-gray-600 mb-6">
                Review the entered data below. If everything looks correct, click "Submit" to finalize.
              </p>

              <div className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {/* Faculty Research Details */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">Faculty Research Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>VTU Faculty ID:</strong> {watch("facultyResearchSchema.vtuFacultyId")}</p>
                    <p><strong>AICTE Faculty ID:</strong> {watch("facultyResearchSchema.aicteFacultyId")}</p>
                    <p><strong>ORC ID:</strong> {watch("facultyResearchSchema.orcId")}</p>
                    <p><strong>Scopus ID:</strong> {watch("facultyResearchSchema.scopusId")}</p>
                    <p><strong>Publons/Web of Science ID:</strong> {watch("facultyResearchSchema.publonsAndWebOfScienceId")}</p>
                  </div>
                </div>

                {/* National Journal Details */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">National Journal Details</h3>
                  <div className="space-y-2">
                    {watch("nationalJournalDetailsSchema")?.map((journal, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                        <p><strong>Title:</strong> {journal.titleOfResearchPaper}</p>
                        <p><strong>Journal:</strong> {journal.nameOfJournal}</p>
                        <p><strong>Impact Factor:</strong> {journal.impactFactor}</p>
                        <p><strong>Volume:</strong> {journal.volume}, <strong>Issue:</strong> {journal.issueNo}</p>
                        <p><strong>Year:</strong> {journal.yearOfPublication}, <strong>Pages:</strong> {journal.pageNoFrom} - {journal.pageNoTo}</p>
                        <p><strong>Authors:</strong> {journal.author01}, {journal.author02}, {journal.author03}, {journal.author04}</p>
                        <p><strong>Published Under:</strong> {journal.publishedUnder}</p>
                        <p><strong>Impact Factor:</strong> {journal.impactFactor}</p>

                      </div>
                    ))}
                  </div>
                </div>

                {/* International Journal Details */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">International Journal Details</h3>
                  <div className="space-y-2">
                    {watch("internationalJournalDetailsSchema")?.map((journal, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                        <p><strong>Title:</strong> {journal.titleOfResearchPaper}</p>
                        <p><strong>Journal:</strong> {journal.nameOfJournal}</p>
                        <p><strong>Impact Factor:</strong> {journal.impactFactor}</p>
                        <p><strong>Volume:</strong> {journal.volume}, <strong>Issue:</strong> {journal.issueNo}</p>
                        <p><strong>Year:</strong> {journal.yearOfPublication}, <strong>Pages:</strong> {journal.pageNoFrom} - {journal.pageNoTo}</p>
                        <p><strong>Authors:</strong> {journal.author01}, {journal.author02}, {journal.author03}, {journal.author04}</p>
                        <p><strong>Published Under:</strong> {journal.publishedUnder}</p>
                        
                      </div>
                    ))}
                  </div>
                </div>

                {/* National and International Conferences */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">National and International Conferences</h3>
                  {["nationalConferenceDetailsSchema", "internationalConferenceDetailsSchema"].map((conferenceType, typeIndex) => (
                    <div key={typeIndex}>
                      <h4 className="text-md font-semibold text-gray-600 mt-2">
                        {conferenceType === "nationalConferenceDetailsSchema" ? "National Conferences" : "International Conferences"}
                      </h4>
                      <div className="space-y-2">
                        {Array.isArray(watch(conferenceType as keyof Inputs)) && (watch(conferenceType as keyof Inputs) as any[])?.map((conference : any, index : any) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                            <p><strong>Title:</strong> {conference.titleOfResearchPaper}</p>
                            <p><strong>Journal:</strong> {conference.nameOfJournal}</p>
                            <p><strong>Year:</strong> {conference.yearOfPublication}</p>
                            <p><strong>Impact Factor:</strong> {conference.impactFactor}</p>
                            <p><strong>Volume:</strong> {conference.volume}, <strong>Issue:</strong> {conference.issueNo}</p>
                            <p><strong>Pages:</strong> {conference.pageNoFrom} - {conference.pageNoTo}</p>
                            <p><strong>Authors:</strong> {conference.author01}, {conference.author02}, {conference.author03}, {conference.author04}</p>
                            <p><strong>Published Under:</strong> {conference.publishedUnder}</p>
                          
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Research Grants */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">Research Grants</h3>
                  <div className="space-y-2">
                    {watch("researchGrantsSchema")?.map((grant, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                        <p><strong>Title:</strong> {grant.titleOfProject}</p>
                        <p><strong>Funded By:</strong> {grant.fundedBy}</p>
                        <p><strong>Amount:</strong> {grant.sanctionedAmount}</p>
                        <p><strong>Status:</strong> {grant.status}</p>
                        <p><strong>Time Period:</strong> {grant.timePeriodOfProject}</p>
                        <p>
                          <strong>Sanctioned Date:</strong>{" "}
                          {new Date(grant.sanctionedDate).toDateString()}
                        </p>
                        <p><strong>Principal Investigator:</strong> {grant.principalInvestigatorDesignation}, {grant.principalInvestigatorInstitute}</p>
                        <p><strong>Co-Principal Investigator:</strong> {grant.coPrincipalInvestigatorDesignation}, {grant.coPrincipalInvestigatorInstitute}</p>
                        <p><strong>PhD Awarded:</strong> {grant.anyPhdAwarded}</p>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Patents */}
                <div className="pb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">Patents</h3>
                  <div className="space-y-2">
                    {watch("patentsSchema")?.map((patent, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                        <p><strong>Title:</strong> {patent.titleOfResearchPatent}</p>
                        <p><strong>Area:</strong> {patent.areaOfResearch}</p>
                        <p><strong>Year:</strong> {patent.patentGrantedYear}</p>
                        <p><strong>Period:</strong> {patent.patentPeriod}</p>
                        <p><strong>Authors:</strong> {patent.author1}, {patent.author2}, {patent.author3}, {patent.author4}</p>

                      </div>
                    ))}
                  </div>
                  {/* Consultancy */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-700 mb-3">Consultancy</h3>
                    <div className="space-y-2">
                      {watch("consultancySchema")?.map((consultancy, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                          <p><strong>Amount:</strong> {consultancy.sanctionedAmount}</p>
                          <p><strong>Funded By:</strong> {consultancy.fundedBy}</p>
                          <p><strong>Status:</strong> {consultancy.status}</p>
                          <p><strong>Time Period:</strong> {consultancy.timePeriodOfProject}</p>
                          <p>
                            <strong>Sanctioned Date:</strong>{" "}
                            {new Date(consultancy.sanctionedDate).toDateString()}
                          </p>
                          <p><strong>Principal Investigator:</strong> {consultancy.principalInvestigatorDesignation}, {consultancy.principalInvestigatorInstitute}</p>
                          <p><strong>Co-Principal Investigator:</strong> {consultancy.coPrincipalInvestigatorDesignation}, {consultancy.coPrincipalInvestigatorInstitute}</p>

                        </div>
                      ))}
                    </div>
                    {/* Research Scholar */}
                    <div>
                       <h3 className="text-lg font-bold text-gray-700 mb-3">Research Scholar</h3>
                       <div className="space-y-2">
                         {watch("researchScholarDetailsSchema")?.map((scholar, index) => (
                           <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                             <p><strong>Name:</strong> {scholar.nameOfResearchScholar}</p>
                             <p><strong>University Seat Number:</strong> {scholar.universitySeatNumber}</p>
                             <p><strong>Area of Research:</strong> {scholar.areaOfResearch}</p>
                             <p>
                              <strong>Sanctioned Date:</strong>{" "}
                              {new Date(scholar.dateOfRegistration).toDateString()}
                            </p>
                             <p><strong>University of Registration:</strong> {scholar.universityOfRegistration}</p>
                             <p><strong>Designation of Supervisor:</strong> {scholar.designationOfResearcher}</p>
                             <p><strong>Name of Institute:</strong> {scholar.nameOfInstitute}</p>
                             <p><strong>Progress of Research Work:</strong> {scholar.progressOfResearchWork}</p>
                           </div>
                         ))}
                         </div>
                    </div>
                  </div>
                </div>

                {/* Publications */}
                <div className="pb-4">
                  <h3 className="text-lg font-bold text-gray-700 mb-3">Publications</h3>
                  <div className="space-y-2">
                    {watch("publicationsSchema")?.map((publication, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-300">
                        <p><strong>Name of Journal:</strong> {publication.nameOfJournal}</p>
                        <p><strong>DOI:</strong> {publication.doi}</p>
                        <p><strong>Impact Factor:</strong> {publication.impactFactor}</p>
                        <p><strong>Volume and Page:</strong> {publication.volumeAndPage}</p>
                        <p><strong>N/IN:</strong> {publication.n_In}</p>
                        <p><strong>Type:</strong> {publication.typeOfPublication}</p>

                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit(async (data) => {
                    try {
                      const response = await axios.post("/api/facultyresearchdetails", {facultyId,data});
                      if (response.status === 200) {
                        alert("Form submitted successfully!");
                        reset(); // Reset the form
                        setCurrentStep(0); // Restart the form
                      }
                    } catch (error) {
                      console.error(error);
                      alert("An error occurred while submitting the form.");
                    }
                  })}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          )}

          </form>
        </FormProvider>

        <FormNavigation
          prevButtonFunction={prevButtonFunction}
          steps={steps}
          currentStep={currentStep}
          nextButtonFunction={nextButtonFunction}
        />
      </section>
    </div>
  );
}
