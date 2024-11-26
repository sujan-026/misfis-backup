-- CreateTable
CREATE TABLE `FacultyPersonalDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `emailId` VARCHAR(191) NOT NULL,
    `contactNo` VARCHAR(191) NOT NULL,
    `alternateContactNo` VARCHAR(191) NULL,
    `emergencyContactNo` VARCHAR(191) NULL,
    `adharNo` VARCHAR(191) NOT NULL,
    `panNo` VARCHAR(191) NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `firstAddressLine1` VARCHAR(191) NOT NULL,
    `firstAddressLine2` VARCHAR(191) NULL,
    `firstAddressLine3` VARCHAR(191) NULL,
    `correspondenceAddressLine1` VARCHAR(191) NOT NULL,
    `correspondenceAddressLine2` VARCHAR(191) NULL,
    `correspondenceAddressLine3` VARCHAR(191) NULL,
    `religion` VARCHAR(191) NULL,
    `caste` VARCHAR(191) NULL,
    `category` VARCHAR(191) NULL,
    `motherTongue` VARCHAR(191) NOT NULL,
    `speciallyChallenged` BOOLEAN NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `languages` JSON NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `accountNo` VARCHAR(191) NOT NULL,
    `accountName` VARCHAR(191) NOT NULL,
    `accountType` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `ifsc` VARCHAR(191) NOT NULL,
    `pfNumber` VARCHAR(191) NULL,
    `uanNumber` VARCHAR(191) NULL,
    `pensionNumber` VARCHAR(191) NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `aicteFacultyId` VARCHAR(191) NULL,
    `department` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `motherName` VARCHAR(191) NULL,
    `fatherName` VARCHAR(191) NULL,
    `spouseName` VARCHAR(191) NULL,
    `children` JSON NOT NULL,
    `classProgram` VARCHAR(191) NOT NULL,
    `usnSsn` VARCHAR(191) NOT NULL,
    `schoolCollege` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `mediumOfInstruction` VARCHAR(191) NOT NULL,
    `directCorr` VARCHAR(191) NOT NULL,
    `passClass` VARCHAR(191) NOT NULL,
    `dateOfJoining` DATETIME(3) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `designationOnJoining` VARCHAR(191) NOT NULL,
    `awardReceived` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `IndustryExperiencedesignation` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `subjectsTaught` VARCHAR(191) NOT NULL,
    `program` VARCHAR(191) NOT NULL,
    `numberOfTimes` INTEGER NOT NULL,

    UNIQUE INDEX `FacultyPersonalDetails_facultyId_key`(`facultyId`),
    UNIQUE INDEX `FacultyPersonalDetails_emailId_key`(`emailId`),
    UNIQUE INDEX `FacultyPersonalDetails_adharNo_key`(`adharNo`),
    UNIQUE INDEX `FacultyPersonalDetails_accountNo_key`(`accountNo`),
    UNIQUE INDEX `FacultyPersonalDetails_employeeId_key`(`employeeId`),
    UNIQUE INDEX `FacultyPersonalDetails_aicteFacultyId_key`(`aicteFacultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyResearchDetails` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `facultyVTUId` VARCHAR(191) NOT NULL,
    `facultyAICTEId` VARCHAR(191) NULL,
    `orcidId` VARCHAR(191) NULL,
    `googleScholarId` VARCHAR(191) NULL,
    `scopusId` VARCHAR(191) NULL,
    `publonsId` VARCHAR(191) NULL,

    UNIQUE INDEX `FacultyResearchDetails_facultyId_key`(`facultyId`),
    UNIQUE INDEX `FacultyResearchDetails_facultyResearchId_key`(`facultyResearchId`),
    UNIQUE INDEX `FacultyResearchDetails_facultyVTUId_key`(`facultyVTUId`),
    UNIQUE INDEX `FacultyResearchDetails_facultyAICTEId_key`(`facultyAICTEId`),
    UNIQUE INDEX `FacultyResearchDetails_orcidId_key`(`orcidId`),
    UNIQUE INDEX `FacultyResearchDetails_googleScholarId_key`(`googleScholarId`),
    UNIQUE INDEX `FacultyResearchDetails_scopusId_key`(`scopusId`),
    UNIQUE INDEX `FacultyResearchDetails_publonsId_key`(`publonsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conference` (
    `id` VARCHAR(191) NOT NULL,
    `conferenceType` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
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
    `sponsor` VARCHAR(191) NULL,
    `venue` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,

    INDEX `Conference_facultyId_fkey`(`facultyId`),
    INDEX `Conference_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Journal` (
    `id` VARCHAR(191) NOT NULL,
    `journalType` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
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

    INDEX `Journal_facultyResearchId_fkey`(`facultyResearchId`),
    INDEX `Journal_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultancy` (
    `id` VARCHAR(191) NOT NULL,
    `sanctionedDate` DATETIME(3) NOT NULL,
    `projectPeriod` VARCHAR(191) NOT NULL,
    `amountSanctioned` DOUBLE NOT NULL,
    `fundedBy` VARCHAR(191) NOT NULL,
    `principalInvestigator` VARCHAR(191) NOT NULL,
    `coPrincipalInvestigator` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,

    INDEX `Consultancy_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAttended` (
    `id` VARCHAR(191) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `sponsor` VARCHAR(191) NULL,
    `targetAudience` VARCHAR(191) NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `EventAttended_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Extracurricular` (
    `id` VARCHAR(191) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `eventTitle` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `achievement` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `Extracurricular_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvitedTalk` (
    `id` VARCHAR(191) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `organizer` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `targetAudience` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `InvitedTalk_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutreachActivity` (
    `id` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `OutreachActivity_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patent` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `areaOfResearch` VARCHAR(191) NOT NULL,
    `patentPeriod` VARCHAR(191) NOT NULL,
    `grantedYear` INTEGER NOT NULL,
    `author1` VARCHAR(191) NOT NULL,
    `author2` VARCHAR(191) NULL,
    `author3` VARCHAR(191) NULL,
    `author4` VARCHAR(191) NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,

    INDEX `Patent_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreviousTeachingExperience` (
    `id` VARCHAR(191) NOT NULL,
    `instituteName` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `PreviousTeachingExperience_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `id` VARCHAR(191) NOT NULL,
    `publicationType` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `volume` VARCHAR(191) NULL,
    `pageNumber` VARCHAR(191) NULL,
    `doi` VARCHAR(191) NULL,
    `impactFactor` DOUBLE NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `Publication_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recognition` (
    `id` VARCHAR(191) NOT NULL,
    `recognitionReceived` VARCHAR(191) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `Recognition_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchExperience` (
    `id` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `ResearchExperience_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchGrant` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `sanctionedDate` DATETIME(3) NOT NULL,
    `projectPeriod` VARCHAR(191) NOT NULL,
    `amountSanctioned` DOUBLE NOT NULL,
    `fundedBy` VARCHAR(191) NOT NULL,
    `principalInvestigator` VARCHAR(191) NOT NULL,
    `coPrincipalInvestigator` VARCHAR(191) NULL,
    `phdAwarded` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,

    INDEX `ResearchGrant_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResearchSupervision` (
    `id` VARCHAR(191) NOT NULL,
    `researchScholarName` VARCHAR(191) NOT NULL,
    `universitySeatNumber` VARCHAR(191) NOT NULL,
    `areaOfResearch` VARCHAR(191) NOT NULL,
    `registrationDate` DATETIME(3) NOT NULL,
    `university` VARCHAR(191) NOT NULL,
    `researcherDesignation` VARCHAR(191) NOT NULL,
    `instituteName` VARCHAR(191) NOT NULL,
    `progress` VARCHAR(191) NOT NULL,
    `facultyResearchId` VARCHAR(191) NOT NULL,

    INDEX `ResearchSupervision_facultyResearchId_fkey`(`facultyResearchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Responsibility` (
    `id` VARCHAR(191) NOT NULL,
    `additionalResponsibility` VARCHAR(191) NOT NULL,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `facultyId` INTEGER NOT NULL,

    INDEX `Responsibility_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Award` (
    `id` VARCHAR(191) NOT NULL,
    `awardReceived` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,

    INDEX `Award_facultyId_fkey`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoginDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'faculty',
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LoginDetails_facultyId_key`(`facultyId`),
    UNIQUE INDEX `LoginDetails_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conference` ADD CONSTRAINT `Conference_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`facultyResearchId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conference` ADD CONSTRAINT `Conference_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultancy` ADD CONSTRAINT `Consultancy_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttended` ADD CONSTRAINT `EventAttended_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Extracurricular` ADD CONSTRAINT `Extracurricular_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InvitedTalk` ADD CONSTRAINT `InvitedTalk_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutreachActivity` ADD CONSTRAINT `OutreachActivity_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Patent` ADD CONSTRAINT `Patent_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreviousTeachingExperience` ADD CONSTRAINT `PreviousTeachingExperience_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recognition` ADD CONSTRAINT `Recognition_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchExperience` ADD CONSTRAINT `ResearchExperience_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchGrant` ADD CONSTRAINT `ResearchGrant_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResearchSupervision` ADD CONSTRAINT `ResearchSupervision_facultyResearchId_fkey` FOREIGN KEY (`facultyResearchId`) REFERENCES `FacultyResearchDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responsibility` ADD CONSTRAINT `Responsibility_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `FacultyPersonalDetails`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
