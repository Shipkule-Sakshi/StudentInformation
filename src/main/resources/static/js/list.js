window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/students")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((students) => {
      const tbody = document.getElementById("studentList");

      if (!Array.isArray(students) || students.length === 0) {
        tbody.innerHTML = "<tr><td colspan='13'>No students found.</td></tr>";
        return;
      }

      students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
		<td>${student.id}</td>
		          <td>${student.name || ""}</td>
		          <td>${student.course || ""}</td>
		          <td>${student.email || ""}</td>
		          <td>${student.mobileno || ""}</td>
		          <td>${student.dob || ""}</td>
		          <td>${student.branch || ""}</td>
		          <td>${student.gender || ""}</td>
		          <td>${student.fathers_name || ""}</td>
		          <td>${student.mothers_name || ""}</td>
		          <td>${student.address || ""}</td>
		          <td><img src="images/${student.photo}" width="50" /></td>
		          <td>
            <button class="edit-btn" data-id="${student.id}">Edit</button>
            <button class="delete-btn" data-id="${student.id}">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // DELETE button logic
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this student?")) {
            fetch(`http://localhost:8080/api/students/${id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Delete failed");
                alert("Student deleted successfully!");
                window.location.reload();
              })
              .catch((err) => {
                console.error(err);
                alert("Failed to delete student.");
              });
          }
        });
      });

      // EDIT button logic
      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.location.href = `editStud.html?id=${id}`;
        });
      });
    })
    .catch((err) => {
      console.error("Error fetching students:", err);
      const tbody = document.getElementById("studentList");
      tbody.innerHTML = "<tr><td colspan='13' style='color:red;'>Failed to load student list.</td></tr>";
    });
});
