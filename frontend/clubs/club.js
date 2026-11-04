const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

const clubId = new URLSearchParams(window.location.search).get("id");

async function loadClub() {
  const [clubResponse, usersResponse] = await Promise.all([
    fetch(`${API_URL}/clubs/${clubId}`),
    fetch(`${API_URL}/users`),
  ]);
  const club = await clubResponse.json();
  const users = await usersResponse.json();

  document.getElementById("club_name").textContent = club.name;
  document.getElementById("club_logo").src = club.thumbnail;
  document.getElementById("club_logo").alt = club.name;

  const members = users
    .filter((user) => club.users.map(String).includes(user.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  document.getElementById("club_members").innerHTML = members.length
    ? members
        .map(
          (user) => `<li class="collection-item">
            <a class="club_member" href="../students/student.html?id=${user.id}">
              <img src="${user.avatar}" alt="">
              <span>${user.name}</span>
            </a>
          </li>`
        )
        .join("")
    : `<li class="collection-item">No students in this club yet</li>`;
}

window.addEventListener("load", loadClub);
