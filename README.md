# AI-Powered Digital Forensics Platform

A portfolio project that combines a Spring Boot service and React interface for authenticated digital-forensics case analysis.

The workflow lets an officer sign in, submit a case name with logs and an analysis query, send the case to an AI-backed endpoint, and view the generated response in a report vault.

## Features

- Officer login flow in the React interface
- Case name, log, and query submission
- Spring Boot endpoint at POST /api/forensics/analyze
- AI-assisted analysis through Spring AI and Ollama
- MySQL persistence for case/report data
- Saved case identifier returned to the UI
- Report vault view for generated results
- Separate backend and frontend applications

## Technology

### Backend

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Spring AI with Ollama
- MySQL
- Maven

### Frontend

- React
- JavaScript
- CSS
- React Icons

## Repository structure

- AI-Powewred/ — Spring Boot backend module
- forensic-ui/ — React frontend

The backend directory retains its current repository name for compatibility with the existing project structure.

## Run locally

### Start the backend

~~~bash
cd AI-Powewred
mvn spring-boot:run
~~~

Configure MySQL and Ollama using local configuration or environment variables. Do not commit credentials or real case data.

### Start the frontend

In a second terminal:

~~~bash
cd forensic-ui
npm install
npm start
~~~

The current frontend expects the backend at http://localhost:8080.

## Responsible-use note

This is a portfolio/demo system. Use synthetic logs and test cases only; do not upload real personal, confidential, or law-enforcement data.
