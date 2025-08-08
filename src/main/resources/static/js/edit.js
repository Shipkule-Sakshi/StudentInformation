window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const studentId = params.get("id");
  const form = document.getElementById("studentForm");

  if (!studentId) {
    alert("No student ID provided");
    return;
  }

  // Fetch student data and prefill form
  fetch(`http://localhost:8080/api/students/${studentId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch student");
      return res.json();
    })
    .then(student => {
      form.studentname.value = student.studentname || "";
      form.mobileno.value = student.mobileno || "";
      form.fathers_name.value = student.fathers_name || "";
      form.mothers_name.value = student.mothers_name || "";
      form.course.value = student.course || "";

      // Set gender radio checked manually
      if (student.gender) {
        const genderRadio = form.querySelector(`input[name="gender"][value="${student.gender}"]`);
        if (genderRadio) genderRadio.checked = true;
      }

      // Set branch radio checked manually
      if (student.branch) {
        const branchRadio = form.querySelector(`input[name="branch"][value="${student.branch}"]`);
        if (branchRadio) branchRadio.checked = true;
      }

      form.email.value = student.email || "";
      form.dob.value = student.dob || "";
      form.photo.value = student.photo || "";
      form.address.value = student.address || "";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load student data");
    });

  // Submit updated student on form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: form.name.value,
      mobileno: form.mobileno.value,
      fathers_name: form.fathers_name.value,
      mothers_name: form.mothers_name.value,
      course: form.course.value,
      gender: form.querySelector('input[name="gender"]:checked')?.value || "",
      branch: form.querySelector('input[name="branch"]:checked')?.value || "",
      email: form.email.value,
      dob: form.dob.value,
      photo: form.photo.value,
      address: form.address.value,
    };

    fetch(`http://localhost:8080/api/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        alert("Student updated successfully!");
        window.location.href = "listStud.html";
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update student.");
      });
  });
});
