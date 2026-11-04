const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

async function fetchStudents() {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();
  users.sort((a, b) => a.name.localeCompare(b.name));
  document.getElementById("student_list").innerHTML = users
    .map(
      (user) => `<li class="collection-item student_row">
        <span class="member_info">
          <img class="member_avatar" src="${user.avatar}" alt="">
          <span>${user.name}</span>
        </span>
        <span class="student_actions">
          <a class="edit_button" href="student.html?id=${user.id}">Edit</a>
          <button type="button" class="delete_student_button" data-id="${user.id}">Delete</button>
        </span>
      </li>`
    )
    .join("");
}

document.getElementById("student_list").addEventListener("click", async (event) => {
  const button = event.target.closest(".delete_student_button");
  if (!button) return;
  if (!confirm("Delete this student?")) return;

  await fetch(`${API_URL}/users/${button.dataset.id}`, { method: "DELETE" });
  button.closest("li").remove();
});

window.addEventListener("load", fetchStudents);
