import { z } from "zod";

export const facultyResearchSchema = z.object({
  vtuFacultyId: z.string().min(1, { message: "VTU Faculty ID is required" }),
  aicteFacultyId: z
    .string()
    .min(1, { message: "AICTE Faculty ID is required" }),
  orcId: z.string().min(1, { message: "ORCID is required" }).optional().or(z.literal("")),
  scopusId: z.string().min(1, { message: "Scopus ID is required" }).optional().or(z.literal("")),
  publonsAndWebOfScienceId: z
    .string()
    .min(1, { message: "Publons and Web of Science ID is required" }).optional().or(z.literal("")),
});

export const nationalJournalDetailsSchema = z.array(
  z.object({
    titleOfResearchPaper: z.string().min(1, { message: "Title is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of journal is required" }),
    volume: z.string().min(1, { message: "Volume is required" }),
    issueNo: z.string().min(1, { message: "Issue number is required" }),
    yearOfPublication: z
      .string()
      .min(1, { message: "Year of publication is required" }),
    pageNoFrom: z.string().min(1, { message: "Page number from is required" }),
    pageNoTo: z.string().min(1, { message: "Page number to is required" }),
    author01: z.string().min(1, { message: "Author 01 is required" }),
    author02: z.string(),
    author03: z.string(),
    author04: z.string(),
    publishedUnder: z.enum(["Web of Science", "Scopus", "Q1", "Q2", "Q3"], {
      message: "Please select a publication",
    }),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const internationalJournalDetailsSchema = z.array(
  z.object({
    titleOfResearchPaper: z.string().min(1, { message: "Title is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of journal is required" }),
    volume: z.string().min(1, { message: "Volume is required" }),
    issueNo: z.string().min(1, { message: "Issue number is required" }),
    yearOfPublication: z
      .string()
      .min(1, { message: "Year of publication is required" }),
    pageNoFrom: z.string().min(1, { message: "Page number from is required" }),
    pageNoTo: z.string().min(1, { message: "Page number to is required" }),
    author01: z.string().min(1, { message: "Author 01 is required" }),
    author02: z.string(),
    author03: z.string(),
    author04: z.string(),
    publishedUnder: z.enum(
      ["Web of Science", "Scopus", "Q1", "Q2", "Q3", "SCI"],
      {
        message: "Please select a publication",
      }
    ),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const nationalConferenceDetailsSchema = z.array(
  z.object({
    titleOfResearchPaper: z.string().min(1, { message: "Title is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of Journal is required" }),
    volume: z.string().min(1, { message: "Volume is required" }),
    issueNo: z.string().min(1, { message: "Issue number is required" }),
    yearOfPublication: z
      .string()
      .min(1, { message: "Year of publication is required" }),
    pageNoFrom: z.string().min(1, { message: "Page number from is required" }),
    pageNoTo: z.string().min(1, { message: "Page number to is required" }),
    author01: z.string().min(1, { message: "Author 01 is required" }),
    author02: z.string(),
    author03: z.string(),
    author04: z.string(),
    publishedUnder: z.enum(
      ["Web of Science", "Scopus", "Q1", "Q2", "Q3", "SCI"],
      {
        message: "Please select a publication",
      }
    ),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const internationalConferenceDetailsSchema = z.array(
  z.object({
    titleOfResearchPaper: z.string().min(1, { message: "Title is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of Journal is required" }),
    volume: z.string().min(1, { message: "Volume is required" }),
    issueNo: z.string().min(1, { message: "Issue number is required" }),
    yearOfPublication: z
      .string()
      .min(1, { message: "Year of publication is required" }),
    pageNoFrom: z.string().min(1, { message: "Page number from is required" }),
    pageNoTo: z.string().min(1, { message: "Page number to is required" }),
    author01: z.string().min(1, { message: "Author 01 is required" }),
    author02: z.string(),
    author03: z.string(),
    author04: z.string(),
    publishedUnder: z.enum(
      ["Web of Science", "Scopus", "Q1", "Q2", "Q3", "SCI"],
      {
        message: "Please select a publication",
      }
    ),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const researchGrantsSchema = z.array(
  z.object({
    titleOfProject: z.string().min(1, { message: "Title is required" }),
    sanctionedDate: z.coerce.date({ message: "Sanctioned date is required" }),
    timePeriodOfProject: z.string().min(1,{
      message: "Time period of project is required",
    }),
    sanctionedAmount: z.string().min(1,{ message: "Sanctioned amount is required" }),
    fundedBy: z.string().min(1, { message: "Funded by is required" }),
    principalInvestigatorDesignation: z
      .string()
      .min(1, { message: "Principal investigator is required" }),
    principalInvestigatorInstitute: z
      .string()
      .min(1, { message: "Principal investigator department is required" }),
    coPrincipalInvestigatorDesignation: z
      .string()
      .min(1, { message: "Principal investigator is required" }),
    coPrincipalInvestigatorInstitute: z
      .string()
      .min(1, { message: "Principal investigator department is required" }),
    anyPhdAwarded: z.enum(["Yes", "No"], {
      message: "Please select an option",
    }),
    status: z.enum(["Ongoing", "Completed"], {
      message: "Please select an option",
    }),
  })
);

export const consultancySchema = z.array(
  z.object({
    sanctionedDate: z.coerce.date({ message: "Sanctioned date is required" }),
    timePeriodOfProject: z.string().min(1,{
      message: "Time period of project is required",
    }),
    sanctionedAmount: z.string().min(1,{ message: "Sanctioned amount is required" }),
    fundedBy: z.string().min(1, { message: "Funded by is required" }),
    principalInvestigatorDesignation: z
      .string()
      .min(1, { message: "Principal investigator is required" }),
    principalInvestigatorInstitute: z
      .string()
      .min(1, { message: "Principal investigator department is required" }),
    coPrincipalInvestigatorDesignation: z
      .string()
      .min(1, { message: "Principal investigator is required" }),
    coPrincipalInvestigatorInstitute: z
      .string()
      .min(1, { message: "Principal investigator department is required" }),
    status: z.enum(["Ongoing", "Completed"], {
      message: "Please select an option",
    }),
  })
);

export const patentsSchema = z.array(
  z.object({
    titleOfResearchPatent: z.string().min(1, { message: "Title is required" }),
    areaOfResearch: z
      .string()
      .min(1, { message: "Area of research is required" }),
    patentPeriod: z.string().min(0, { message: "Patent period is required" }),
    patentGrantedYear: z.string().min(0, { message: "Patent granted year is required" }),
    author1: z.string().min(3, { message: "Author 1 is required" }),
    author2: z.string(),
    author3: z.string(),
    author4: z.string(),
  })
);

export const researchScholarDetailsSchema = z.array(
  z.object({
    nameOfResearchScholar: z
      .string()
      .min(1, { message: "Name of research scholar is required" }),
    universitySeatNumber: z
      .string()
      .min(1, { message: "University seat number is required" }),
    areaOfResearch: z
      .string()
      .min(1, { message: "Area of research is required" }),
    dateOfRegistration: z.coerce.date({
      message: "Date of registration is required",
    }),
    universityOfRegistration: z
      .string()
      .min(1, { message: "University of registration is required" }),
    designationOfResearcher: z
      .string()
      .min(1, { message: "Designation of researcher is required" }),
    nameOfInstitute: z
      .string()
      .min(1, { message: "Name of institute is required" }),
    progressOfResearchWork: z.enum(["Ongoing", "Completed"], {
      message: "Please select an option",
    }),
  })
);
export const publicationsSchema = z.array(
  z.object({
    typeOfPublication: z.enum(["Journal", "Conference","Direct","Correspondence"], {
      message: "Please select a aStype of publication",
    }),
    n_In: z.string().min(1, { message: "N/IN is required" }),
    nameOfJournal: z
      .string()
      .min(1, { message: "Name of journal is required" }),
    volumeAndPage: z
      .string()
      .min(1, { message: "Volume and page is required" }),
    doi: z.string().min(1, { message: "DOI is required" }),
    impactFactor: z.string().min(1, { message: "Impact factor is required" }),
  })
);

export const facultyResearchDetailsSchema = z.object({
  facultyResearchSchema,
  nationalJournalDetailsSchema,
  internationalJournalDetailsSchema,
  nationalConferenceDetailsSchema,
  internationalConferenceDetailsSchema,
  researchGrantsSchema,
  consultancySchema,
  patentsSchema,
  researchScholarDetailsSchema,
  publicationsSchema,
});