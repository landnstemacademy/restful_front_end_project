const API_ORIGIN = "https://6aea96643d3dd3d37be6cb9a.mockapi.io/api/v1";
const API_URL = `${API_ORIGIN}/api/v1`;

let all_posts = [];

async function fetchPosts() {
  const response = await fetch(`${API_URL}/clubs`);
  const json = await response.json();
  all_posts = json.data;
  console.log(all_posts);
  for(let post of all_posts){
      document.getElementById('posts').innerHTML +=
    //   Card populated by API data
      `<div class='post_card'>
        <img src='${API_ORIGIN}${post['thumbnail']}' alt='${post['title']}'>
        <h3>${post['title']}</h3>
        <p>${post['body']}</p>
      </div>`
  }
}

window.addEventListener("load", fetchPosts);

