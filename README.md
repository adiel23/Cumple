# Cumple — Student Compliance Tracking System

## Overview

Cumple is a web-based system designed to help school administrators and teachers in El Salvador easily record and review student infractions related to personal presentation and discipline guidelines established by the Ministry of Education (MINED).

The system centralizes reports, enables efficient filtering, and supports PDF report generation, providing a modern tool to manage school-wide compliance records.

## Demo

You can watch the 1 minute system's demo here: https://youtu.be/aAG503wzVW8

## Key Features

### Teachers

- Record student infractions
- Secure login system

### Principal and Assistant Principals

- Secure login system
- View a student’s full infraction history with optional filters (date range, type of infraction)
- View all infractions registered in the system with optional filters (group, date range)
- Export filtered results as PDF reports

## Technologies and Arquitecture

- **Backend:** Node.js + Express (MVC + Services architecture)
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **PDF Generation:** Server-side report generator

## Installation & Requirements

### Node.js

1. Install Node.js (default installation is fine).
2. Run the command: npm install to download all project dependencies.

### MySQL

1. From the MySQL Community package, install: MySQL Server and MySQL Workbench
2. Import the database script included in the repository (if applicable).
3. Configure database credentials in the project’s environment variables.

## Usage Guide

### For Teachers

- Once logged in, teachers access a simple interface containing a form with a NIE input field (student ID).
- Enter the NIE to search for a student.
- Select the correct student from the suggestions (matching name and section).
- Choose the infraction type from the list.
- Click Register to save the infraction.
- The entry is immediately stored in the system’s database.

### For Principal and Assistant Principals

After logging in, the administration panel provides two main views:

**1. General Infractions View**

- By default, shows all infractions registered on the current day.
- Apply filters: By group and/or By date range
- Export filtered records as a PDF report.

**2. Student History View**

- Displays a list of all students in the institution.
- Search by NIE or student name.
- Open the student’s detailed infraction history using the "View History" button.
- Apply filters: By type of infraction and/or By date range
- Export the results as a PDF report.

## Credits / Authors

Author: Adiel Arturo Elías Mercado

## License

This project is available under a monthly, annual, or full-purchase software license, depending on the institution’s needs.
