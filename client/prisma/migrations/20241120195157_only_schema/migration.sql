/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_classId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Class` DROP FOREIGN KEY `Class_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `Faculty` DROP FOREIGN KEY `Faculty_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_mentorId_fkey`;

-- DropTable
DROP TABLE `Attendance`;

-- DropTable
DROP TABLE `Class`;

-- DropTable
DROP TABLE `Course`;

-- DropTable
DROP TABLE `Faculty`;

-- DropTable
DROP TABLE `Student`;
