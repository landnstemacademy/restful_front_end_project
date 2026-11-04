const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

async function fetchStudents() {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();
  document.getElementById("student_list").innerHTML = users
    .map((user) => `<li class="collection-item">${user.name}</li>`)
    .join("");
}

window.addEventListener("load", fetchStudents);
