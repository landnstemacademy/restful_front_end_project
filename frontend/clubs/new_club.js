const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

const form = document.getElementById("club_form");
const message = document.getElementById("form_message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const newClub = {
    name,
    description: form.description.value.trim(),
    thumbnail:
      form.thumbnail.value.trim() ||
      `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`,
    users: [],
  };

  const button = form.querySelector("button");
  button.disabled = true;
  message.textContent = "Saving...";

  const response = await fetch(`${API_URL}/clubs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClub),
  });
  window.location.href = "../index.html";
});
