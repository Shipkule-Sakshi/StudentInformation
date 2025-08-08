# 📘 StudentInfoRest Project

A full-stack Spring Boot application for registering, displaying, editing, and deleting student records using a PostgreSQL database. It includes RESTful APIs, file upload support, validation, and a responsive frontend using HTML, CSS, and JavaScript.

---

## 📦 Technologies Used

### Backend:

* Java 17
* Spring Boot 3.2.4
* Spring Data JPA
* PostgreSQL
* Hibernate (JPA Implementation)
* REST APIs
* Multipart File Upload Support

### Frontend:

* HTML5, CSS3
* JavaScript (Vanilla)

### Other:

* Maven (Build Tool)
* Lombok (optional, not used in code shown)

---

## 🗄️ Database Configuration

### PostgreSQL Setup:

Ensure your PostgreSQL service is running, and you have a database named `Studinfo`.

**application.properties**:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/Studinfo
spring.datasource.username=postgres
spring.datasource.password=sakshi
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
```

---

## 🛠 Project Structure

```
StudentInfoRest/
├── src/main/java/com/example/Studentinfo/
│   ├── StudentInfoRestApplication.java
│   ├── controller/StudentController.java
│   ├── entity/Student.java
│   ├── service/StudentService.java
│   ├── service/StudentServiceImpl.java
│   └── repository/StudentRepository.java
├── src/main/resources/
│   ├── static/
│   │   ├── css/style1.css
│   │   ├── css/style2.css
│   │   ├── js/register.js
│   │   ├── js/list.js
│   │   └── js/edit.js
│   ├── templates/
│   └── application.properties
├── pom.xml
└── README.md
```

---

## 📋 API Endpoints

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| GET    | `/api/students`      | List all students               |
| GET    | `/api/students/{id}` | Get student by ID               |
| POST   | `/api/students`      | Create student (multipart/form) |
| PUT    | `/api/students/{id}` | Update student (multipart/form) |
| DELETE | `/api/students/{id}` | Delete student                  |

---

## 🖼️ File Uploads

Uploaded student photos are saved to an `uploads/` folder in the project directory. The filename is generated based on current timestamp to avoid collisions.

---

## 🖥️ Running the Project

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd StudentInfoRest
```

### 2. Run via Maven

The app will be accessible at: `http://localhost:8080`

### 3. Frontend Pages

Place the following HTML files in `src/main/resources/static`:

* `registerStud.html` – For registration
* `listStud.html` – For viewing records
* `editStud.html` – For editing

Ensure JS and CSS files are correctly linked.

---

## 🧪 Testing

You can test the API using:

* Postman (send multipart form data for POST/PUT)
* Browser (with the included frontend)

---

## 📜 License

This project is open-source and free to use.

---

## 🙋‍♀️ Author

**Sakshi Shipkule**
📧 Email: *shipkulesakshi682@gmail.com*

🌐 GitHub: (https://github.com/Shipkule-Sakshi).

---

##  🖼️ Screenshots


### 📋 Registration Form

# 1.

<img width="1877" height="917" alt="Screenshot 2025-08-08 122132" src="https://github.com/user-attachments/assets/28562c9b-3d2c-471e-b657-5a85466c8e31" />

# 2.

<img width="1882" height="911" alt="Screenshot 2025-08-08 122318" src="https://github.com/user-attachments/assets/1aadc129-61c2-429b-a023-83c10ff7589b" />

### 📄 List View

# 1.
<img width="1893" height="921" alt="Screenshot 2025-08-08 122815" src="https://github.com/user-attachments/assets/e55e7778-5aa6-4e60-95de-ad8b41cdf9bc" />


