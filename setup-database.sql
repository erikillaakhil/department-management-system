-- =========================================================
-- Employee Management System - MySQL Database Setup Script
-- =========================================================

-- 1. Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS employeedb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Switch to the database
USE employeedb;

-- 3. Verify tables
SHOW TABLES;

-- Note: Spring Boot JPA with 'spring.jpa.hibernate.ddl-auto=update'
-- will automatically create all tables ('employees' and 'departments')
-- and data.sql will automatically seed the initial records.
