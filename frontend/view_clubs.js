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
      `<a class='club_card' href='edit_club.html?id=${club['id']}'>
        <img src='${club['thumbnail']}' alt='${club['name']}'>
        <h3>${club['name']}</h3>
        <p>${club['description']}</p>
      </a>`
  }
}

window.addEventListener("load", fetchClubs);

