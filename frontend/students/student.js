const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

const studentId = new URLSearchParams(window.location.search).get("id");

async function loadStudent() {
  const [userResponse, clubsResponse] = await Promise.all([
    fetch(`${API_URL}/users/${studentId}`),
    fetch(`${API_URL}/clubs`),
  ]);
  const user = await userResponse.json();
  const clubs = await clubsResponse.json();

  document.getElementById("student_avatar").src = user.avatar;
  document.getElementById("student_avatar").alt = user.name;
  document.getElementById("student_name").textContent = user.name;
  document.getElementById("student_email").textContent = user.email;

  const memberOf = clubs.filter((club) => club.users.map(String).includes(String(user.id)));
  document.getElementById("student_clubs").innerHTML = memberOf.length
    ? memberOf
        .map((club) => `<li class="collection-item"><a href="../clubs/edit_club.html?id=${club.id}">${club.name}</a></li>`)
        .join("")
    : `<li class="collection-item">Not in any clubs yet</li>`;
}

document.getElementById("delete_student_button").addEventListener("click", async () => {
  if (!confirm("Delete this student?")) return;

  await fetch(`${API_URL}/users/${studentId}`, { method: "DELETE" });
  window.location.href = "students.html";
});

window.addEventListener("load", loadStudent);
