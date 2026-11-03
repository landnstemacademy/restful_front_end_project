const API_ORIGIN = "https://playground.nileslabs.com";
const API_URL = `${API_ORIGIN}/api/v1`;

let all_posts = [];

async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  const json = await response.json();
  all_posts = json.data;
  console.log(all_posts);
  for(let post of all_posts){
      document.getElementById('posts').innerHTML += `<div class='post_card'><img src='${API_ORIGIN}${post['thumbnail']}' alt='${post['title']}'><h3>${post['title']}</h3><p>${post['body']}</p></div>`
  }
}

window.addEventListener("load", fetchPosts);

