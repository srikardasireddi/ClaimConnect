<img width="1912" height="870" alt="Screenshot 2025-11-18 063134" src="https://github.com/user-attachments/assets/2410c9c7-cf46-4ff6-a0a2-1136130e7b7a" />

<img width="1918" height="876" alt="Screenshot 2025-11-18 063200" src="https://github.com/user-attachments/assets/8625a160-9e1e-4ee1-bdc6-3999dba030fd" />
<img width="1913" height="872" alt="Screenshot 2025-11-18 063225" src="https://github.com/user-attachments/assets/d6245141-0e56-4b4e-a939-53b42f8f8229" />
<img width="1917" height="871" alt="Screenshot 2025-11-18 063243" src="https://github.com/user-attachments/assets/5ff4017c-9d79-4c5b-a466-8b3c16c09ad0" />
<img width="1915" height="871" alt="Screenshot 2025-11-18 063301" src="https://github.com/user-attachments/assets/cda96fe6-2b0b-4a3d-aa95-6407dba1d3a9" /><img width="1915" height="870" alt="Screenshot 2025-11-18 063334" src="https://github.com/user-attachments/assets/0b1b58f9-3409-4f1c-890f-3b2ad5035b53" />


🚀 ClaimConnect - A Spring Boot Microservices & React Application

This is a complete full-stack, end-to-end application that simulates an insurance claim processing system. It is built with a backend of multiple Spring Boot microservices and a complete React.js frontend.

The entire backend is discoverable, routable, and configurable via a Spring Cloud infrastructure. The frontend is a complete Single Page Application (SPA) with full CRUD (Create, Read, Update, Delete) functionality.

🏛️ Architecture & Tech Stack
![Uploading licensed-image.jpg…]()

This project follows a "database-per-service" microservice architecture.

Backend (Spring Boot)

Java 17 & Spring Boot 3

Spring Cloud Gateway: A single entry point (localhost:9090) for the entire application. It handles routing and CORS.

Spring Cloud Eureka Server: For service discovery. All services register here, so they can find each other by name (e.g., lb://PATIENTSERVICE).

Spring Cloud Config Server: For centralized configuration. All 6 microservices (including the gateway) pull their properties from a central GitHub repository.

Spring Cloud OpenFeign: Used by the Claim-Request Service to make declarative, easy-to-use REST calls to other services.

Spring Data JPA: Used in each service to interact with its own dedicated database.

MySQL: The relational database used by all services.

Frontend (React)

React.js (built with Vite)

React Router (react-router-dom): To create a multi-page user experience.

Axios: Used for all API calls to the backend gateway.

JavaScript (ES6+): Used with async/await for asynchronous operations.

✨ Features

Full CRUD for 4 Microservices:

Patients: Create, Read, Update, and Delete patients.

Hospitals: Create, Read, Update, and Delete hospitals.

Policies: Create, Read, Update, and Delete insurance policies.

Complex Service Communication (via Feign):

Submit a Claim: A new claim form that fetches Patients and Hospitals to populate dropdowns.

View Claim Details: A "details" page that makes 3 separate API calls (to Claims, Patients, and Hospitals) and combines the data into a single view.

Centralized Infrastructure:

All services are registered with Eureka.

All services are routed through the API Gateway.

All services (including the Gateway) are configured from the Config Server.

🚀 How to Run This Project

You will need two terminals running: one for the entire backend and one for the frontend.

Prerequisites

Java 17+ and a Java IDE (like Eclipse STS or IntelliJ).

Node.js (v18 or higher).

MySQL Workbench (or any MySQL database tool).

Git (for cloning).

Part 1: Backend Setup (Spring Boot)

Database Setup:
Open MySQL Workbench and run the following commands to create the 4 required databases:

CREATE DATABASE patient_db;
CREATE DATABASE hospital_db;
CREATE DATABASE claim_db;
CREATE DATABASE insurance_db;


If you are using MySQL 8+, you must also run this command to fix authentication for Java:

ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password_here';
FLUSH PRIVILEGES;


Configuration Repository:
This project requires a second GitHub repository to hold the configuration.

Create a new, public GitHub repository (e.g., claimconnect-config).

Inside this repo, create 6 .properties files.

Crucial: You must go into all 6 services' local application.properties files (e.g., Backend/patientservice/src/main/resources/application.properties) and make sure the spring.application.name matches the GitHub file name.

You must also update all GitHub files with your MySQL username and password.

Start Services:
You must start all 7 Spring Boot services from your IDE. The startup order is critical.

Start First: eureka-server (Wait for it to be "UP" on http://localhost:8761)

Start Second: config-server

Start Third (Any Order):

patientservice

hospitalservice

claim-request-service

insurance-company-service

Start Last: api-gateway

Wait for all services to appear "UP" on the Eureka dashboard. Your entire backend is now running at http://localhost:9090.

Part 2: Frontend Setup (React)

Open a new, separate terminal.

Navigate to the Frontend folder:

cd Frontend


Install all the required packages:

npm install


Start the React development server:

npm run dev


You are done! Open your browser and go to http://localhost:5173 to use the application.
