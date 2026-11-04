const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

const clubId = new URLSearchParams(window.location.search).get("id");
const form = document.getElementById("club_form");
const deleteButton = document.getElementById("delete_button");
const userSelect = document.getElementById("user_select");
const addUserButton = document.getElementById("add_user_button");
const memberList = document.getElementById("member_list");

let all_users = [];
let clubUsers = [];

function renderUsers() {
  memberList.innerHTML = clubUsers
    .map((id) => {
      const user = all_users.find((u) => u.id === String(id));
      return `<li>
        <span>${user.name}</span>
        <button type="button" class="remove_user_button" data-id="${id}">Remove</button>
      </li>`;
    })
    .join("");

  // Only offer users that aren't already in the club
  userSelect.innerHTML = all_users
    .filter((u) => !clubUsers.map(String).includes(u.id))
    .map((u) => `<option value="${u.id}">${u.name}</option>`)
    .join("");
}

async function loadClub() {
  const [clubResponse, usersResponse] = await Promise.all([
    fetch(`${API_URL}/clubs/${clubId}`),
    fetch(`${API_URL}/users`),
  ]);
  const club = await clubResponse.json();
  all_users = await usersResponse.json();
  all_users.sort((a, b) => a.name.localeCompare(b.name));
  form.name.value = club.name;
  form.description.value = club.description;
  form.thumbnail.value = club.thumbnail;
  clubUsers = club.users;
  renderUsers();
}

async function saveUsers() {
  await fetch(`${API_URL}/clubs/${clubId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ users: clubUsers }),
  });
  renderUsers();
}

addUserButton.addEventListener("click", async () => {
  if (!userSelect.value) return;

  clubUsers = [...clubUsers, userSelect.value];
  await saveUsers();
});

memberList.addEventListener("click", async (event) => {
  const button = event.target.closest(".remove_user_button");
  if (!button) return;

  clubUsers = clubUsers.filter((id) => String(id) !== button.dataset.id);
  await saveUsers();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch(`${API_URL}/clubs/${clubId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      thumbnail: form.thumbnail.value.trim(),
      users: clubUsers,
    }),
  });
  window.location.href = "../index.html";
});

deleteButton.addEventListener("click", async () => {
  if (!confirm("Delete this club?")) return;

  await fetch(`${API_URL}/clubs/${clubId}`, { method: "DELETE" });
  window.location.href = "../index.html";
});

window.addEventListener("load", loadClub);
