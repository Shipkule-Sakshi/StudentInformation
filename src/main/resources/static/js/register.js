document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  const formData = new FormData();

  formData.append("name", form.name.value);
  formData.append("mobileno", form.mobileno.value);
  formData.append("fathersName", form.fathersName.value);
  formData.append("mothersName", form.mothersName.value);
  formData.append("course", form.course.value);
  formData.append("gender", form.querySelector('input[name="gender"]:checked')?.value || "");
  formData.append("branch", form.querySelector('input[name="branch"]:checked')?.value || "");
  formData.append("email", form.email.value);
  formData.append("dob", form.dob.value);
  formData.append("address", form.address.value);

  // Append file if selected
  const photoFile = form.photo.files[0];
  if (photoFile) {
    formData.append("photo", photoFile);
  }

  fetch("http://localhost:8080/api/students", {
    method: "POST",
    body: formData,  // automatically sets multipart/form-data with boundary
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to register student.");
      return res.json();
    })
    .then((data) => {
      alert("✅ Student registered successfully!");
      form.reset();
      window.location.href = "listStud.html";
    })
    .catch((err) => {
      console.error("❌ Error:", err);
      alert("❌ Error registering student.");
    });
});
