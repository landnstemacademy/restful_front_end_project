const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

const form = document.getElementById("student_form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const newStudent = {
    name,
    email: form.email.value.trim(),
    avatar:
      form.avatar.value.trim() ||
      `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
  };

  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });
  window.location.href = "students.html";
});
