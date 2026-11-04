const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;

let all_clubs = [];

async function fetchClubs() {
  const response = await fetch(`${API_URL}/clubs`);
  all_clubs = await response.json();
  console.log(all_clubs);
  for(let club of all_clubs){
      document.getElementById('clubs').innerHTML +=
    //   Card populated by API data
      `<div class='club_card' data-id='${club['id']}'>
        <img src='${club['thumbnail']}' alt='${club['name']}'>
        <h3>${club['name']}</h3>
        <p>${club['description']}</p>
        <a class='card_edit_button' href='clubs/edit_club.html?id=${club['id']}'>Edit</a>
      </div>`
  }
}

// Clicking a card opens its club page; the Edit button keeps its own link
document.getElementById('clubs').addEventListener('click', (event) => {
  const card = event.target.closest('.club_card[data-id]');
  if (!card || event.target.closest('.card_edit_button')) return;
  window.location.href = `clubs/club.html?id=${card.dataset.id}`;
});

window.addEventListener("load", fetchClubs);

