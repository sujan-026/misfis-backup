-- CreateTable
CREATE TABLE `FacultyPersonalDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `emailId` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NULL,
    `alternateContactNo` VARCHAR(191) NULL,
    `emergencyContactNo` VARCHAR(191) NULL,
    `adharNo` VARCHAR(191) NULL,
    `panNo` VARCHAR(191) NULL,
    `dob` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `firstAddressLine1` VARCHAR(191) NULL,
    `firstAddressLine2` VARCHAR(191) NULL,
    `firstAddressLine3` VARCHAR(191) NULL,
    `correspondenceAddressLine1` VARCHAR(191) NULL,
    `correspondenceAddressLine2` VARCHAR(191) NULL,
    `correspondenceAddressLine3` VARCHAR(191) NULL,
    `religion` VARCHAR(191) NULL,
    `caste` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `motherTongue` VARCHAR(191) NULL,
    `speciallyChallenged` BOOLEAN NULL,
    `remarks` VARCHAR(191) NULL,
    `languages` JSON NULL,
    `accountName` VARCHAR(191) NULL,
    `accountNo` VARCHAR(191) NULL,
    `accountType` VARCHAR(191) NULL,
    `bankName` VARCHAR(191) NULL,
    `branch` VARCHAR(191) NULL,
    `children` JSON NULL,
    `fatherName` VARCHAR(191) NULL,
    `ifsc` VARCHAR(191) NULL,
    `motherName` VARCHAR(191) NULL,
    `pensionNumber` VARCHAR(191) NULL,
    `pfNumber` VARCHAR(191) NULL,
    `spouseName` VARCHAR(191) NULL,
    `uanNumber` VARCHAR(191) NULL,

    UNIQUE INDEX `FacultyPersonalDetails_facultyId_key`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaccultyEducation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` VARCHAR(191) NOT NULL,
    `Program` VARCHAR(191) NULL,
    `usnSsn` VARCHAR(191) NULL,
    `schoolCollege` VARCHAR(191) NULL,
    `specialization` VARCHAR(191) NULL,
    `mediumOfInstruction` VARCHAR(191) NULL,
    `passClass` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyAcademicDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FacultyAcademicDetails_employeeId_key`(`employeeId`),
    UNIQUE INDEX `FacultyAcademicDetails_facultyId_key`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyResearchDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orcidId` VARCHAR(191) NULL,
    `googleScholarId` VARCHAR(191) NULL,
    `scopusId` VARCHAR(191) NULL,
    `publonsId` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `researchId` VARCHAR(191) NULL,

    UNIQUE INDEX `FacultyResearchDetails_orcidId_key`(`orcidId`),
    UNIQUE INDEX `FacultyResearchDetails_googleScholarId_key`(`googleScholarId`),
    UNIQUE INDEX `FacultyResearchDetails_scopusId_key`(`scopusId`),
    UNIQUE INDEX `FacultyResearchDetails_publonsId_key`(`publonsId`),
    UNIQUE INDEX `FacultyResearchDetails_facultyId_key`(`facultyId`),
    UNIQUE INDEX `FacultyResearchDetails_researchId_key`(`researchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patent` (
    `id` VARCHAR(191) NOT NULL,
    `areaOfResearch` VARCHAR(191) NOT NULL,
    `patentPeriod` VARCHAR(191) NOT NULL,
    `grantedYear` INTEGER NOT NULL,
    `author1` VARCHAR(191) NOT NULL,
    `author2` VARCHAR(191) NULL,
    `author3` VARCHAR(191) NULL,
    `author4` VARCHAR(191) NULL,
    `author5` VARCHAR(191) NULL,
    `author6` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Patent_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreviousTeachingExperience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `instituteName` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PreviousTeachingExperience_facultyId_key`(`facultyId`),
    INDEX `PreviousTeachingExperience_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IndustryExperience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `IndustryExperience_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchExperience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `ResearchExperience_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specialization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectsTaught` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `numberOfTimes` INTEGER NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Specialization_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAttended` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `sponsor` VARCHAR(191) NULL,
    `targetAudience` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `nameofevent` VARCHAR(191) NOT NULL,
    `typeofevent` VARCHAR(191) NOT NULL,

    INDEX `EventAttended_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventOrganized` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `typeofevent` VARCHAR(191) NOT NULL,
    `nameofevent` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `sponsor` VARCHAR(191) NULL,
    `targetAudience` VARCHAR(191) NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `EventAttended_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvitedTalk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventType` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `targetAudience` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,

    INDEX `InvitedTalk_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publicationType` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `volume` VARCHAR(191) NULL,
    `pageNumber` VARCHAR(191) NULL,
    `doi` VARCHAR(191) NULL,
    `impactFactor` DOUBLE NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `yearOfPublication` DATETIME(3) NULL,

    INDEX `Publication_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AddtionalResponsibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `additionalResponsibility` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Responsibility_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extracurricular` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventType` VARCHAR(191) NOT NULL,
    `eventTitle` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `achievement` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Extracurricular_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutreachActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activity` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `OutreachActivity_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AwardAndRecognition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recognitionReceived` VARCHAR(191) NOT NULL,
    `awardReceived` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Award_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConferenceAndJournal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `journalName` VARCHAR(191) NOT NULL,
    `issueNo` VARCHAR(191) NULL,
    `volume` VARCHAR(191) NULL,
    `yearOfPublication` INTEGER NOT NULL,
    `pageNo` VARCHAR(191) NULL,
    `author1` VARCHAR(191) NOT NULL,
    `author2` VARCHAR(191) NULL,
    `author3` VARCHAR(191) NULL,
    `author4` VARCHAR(191) NULL,
    `publishedUnder` VARCHAR(191) NULL,
    `impactFactor` DOUBLE NULL,
    `quartile` VARCHAR(191) NULL,
    `sponsor` VARCHAR(191) NULL,
    `venue` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,

    INDEX `ConferenceAndJournal_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultancy` (
    `id` VARCHAR(191) NOT NULL,
    `sanctionedDate` DATETIME(3) NOT NULL,
    `projectPeriod` VARCHAR(191) NOT NULL,
    `principalInvestigator` VARCHAR(191) NOT NULL,
    `coPrincipalInvestigator` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `faculty1` VARCHAR(191) NOT NULL,
    `faculty2` VARCHAR(191) NOT NULL,
    `faculty3` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Consultancy_facultyId_fkey`(`facultyId`),
    INDEX `Consultancy_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchGrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sanctionedDate` DATETIME(3) NOT NULL,
    `projectPeriod` VARCHAR(191) NOT NULL,
    `amountSanctioned` DOUBLE NOT NULL,
    `fundedBy` VARCHAR(191) NOT NULL,
    `principalInvestigator` VARCHAR(191) NOT NULL,
    `coPrincipalInvestigator` VARCHAR(191) NULL,
    `phdAwarded` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    INDEX `ResearchGrant_facultyId_fkey`(`facultyId`),
    INDEX `ResearchGrant_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'faculty',
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_facultyId_key`(`facultyId`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branchName` VARCHAR(191) NOT NULL,
    `branchCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `studentId` INTEGER NOT NULL,
    `classId` INTEGER NOT NULL,

    INDEX `Attendance_classId_fkey`(`classId`),
    UNIQUE INDEX `Attendance_studentId_classId_date_key`(`studentId`, `classId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `courseId` INTEGER NOT NULL,

    INDEX `Class_courseId_fkey`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `Course_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Faculty_email_key`(`email`),
    UNIQUE INDEX `Faculty_facultyId_key`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usn` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `classesHeld` INTEGER NOT NULL,
    `classesAttended` INTEGER NOT NULL,
    `attendancePercentage` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `subjects` JSON NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_usn_key`(`usn`),
    UNIQUE INDEX `Student_email_key`(`email`),
    INDEX `Student_mentorId_fkey`(`mentorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patent` ADD CONSTRAINT `Patent_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyResearchDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreviousTeachingExperience` ADD CONSTRAINT `PreviousTeachingExperience_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IndustryExperience` ADD CONSTRAINT `IndustryExperience_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchExperience` ADD CONSTRAINT `ResearchExperience_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Specialization` ADD CONSTRAINT `Specialization_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttended` ADD CONSTRAINT `EventAttended_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventOrganized` ADD CONSTRAINT `EventOrganized_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvitedTalk` ADD CONSTRAINT `InvitedTalk_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyResearchDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AddtionalResponsibility` ADD CONSTRAINT `AddtionalResponsibility_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Extracurricular` ADD CONSTRAINT `Extracurricular_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutreachActivity` ADD CONSTRAINT `OutreachActivity_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AwardAndRecognition` ADD CONSTRAINT `AwardAndRecognition_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyAcademicDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConferenceAndJournal` ADD CONSTRAINT `ConferenceAndJournal_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyResearchDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultancy` ADD CONSTRAINT `Consultancy_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyResearchDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchGrant` ADD CONSTRAINT `ResearchGrant_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyResearchDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Faculty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
