# 📘 StudentInfoRest – Spring Boot Application Configuration

This document outlines the key configuration settings and structure used in the **StudentInfoRest** Spring Boot application. It includes REST APIs for managing student data, supports file uploads, and uses an H2 database by default (can be switched to PostgreSQL).

---

## 📁 Project Structure

StudentInfoRest/

├── src/

│ ├── main/

│ │ ├── java/

│ │ │ └── com.example.studentinfo/

│ │ │ ├── controller/

│ │ │ │ └── StudentController.java

│ │ │ ├── model/

│ │ │ │ └── Student.java

│ │ │ ├── repository/

│ │ │ │ └── StudentRepository.java

│ │ │ └── StudentInfoRestApplication.java

│ │ └── resources/

│ │ ├── static/

│ │ │ ├── css/

│ │ │ │ └── style.css

│ │ │ ├── js/

│ │ │ │ ├── register.js

│ │ │ │ └── list.js

│ │ │ ├── registerStud.html

│ │ │ └── listStud.html

│ │ └── application.properties

├── pom.xml

└── README.md


---

## 📡 Server Configuration

```properties
server.port=8080
server.servlet.context-path=/

The server runs on port 8080.


