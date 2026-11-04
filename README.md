# Clubs at L&N STEM: Build a Front End for a REST API

**
To Run, type ```js
npx http-server```
**

This is a small web app for browsing and managing school clubs and the students in them. It has **no back end of its own**. All data comes from a free mock API service, and the app talks to it with `fetch()`.

You can build the same thing with your own idea (movies, sports teams, recipes, whatever you like). This guide shows how this project works so you can copy the pattern.

## What the app does

| Page | File | What you can do |
|---|---|---|
| Clubs list | `frontend/clubs/view_clubs.html` | See every club as a card. Click a card to view it, click **Edit** to change it, click the **+** card to add one |
| Club details | `frontend/clubs/club.html` | See the club's logo, name, and its members (read-only) |
| New club | `frontend/clubs/new_club.html` | Create a club |
| Edit club | `frontend/clubs/edit_club.html` | Change a club, delete it, add or remove its members |
| Students list | `frontend/students/students.html` | See all students (A to Z), edit or delete them |
| Student details | `frontend/students/student.html` | See a student and the clubs they belong to |
| New student | `frontend/students/new_student.html` | Add a student |

## Folder layout

```
restful_front_end_project/
  README.md
  backend/README.md        notes on the mock API
  frontend/
    index.html             just redirects to the clubs list
    style.css              one stylesheet shared by every page
    clubs/                 pages and scripts for clubs
    students/              pages and scripts for students
```

Each page has its own `.html` file and a `.js` file with the same name, for example `new_club.html` and `new_club.js`.

## Concepts you'll practice

- **REST**: using URLs and HTTP methods to work with data
- **`fetch()` and `async`/`await`**: asking a server for data and waiting for the answer
- **JSON**: the text format the data arrives in
- **The DOM**: building HTML from data with JavaScript
- **Query strings**: passing an ID between pages, like `edit_club.html?id=3`
- **Relationships**: a club stores a list of student IDs, and you look those students up

## Step 1: Create your own API

This project uses [mockapi.io](https://mockapi.io), a free service that pretends to be a back end. Similar tools include [JSON Server](https://github.com/typicode/json-server) and [ApiMocker](https://apimocker.com).

1. Make an account on mockapi.io and create a **project**.
2. Add a **resource** (it creates an endpoint) for each kind of thing you want to store. This project uses two:

   **`clubs`**

   | Field | Type |
   |---|---|
   | `name` | string |
   | `description` | string |
   | `thumbnail` | image URL |
   | `users` | array of student IDs |

   **`users`** (these are the students)

   | Field | Type |
   |---|---|
   | `name` | string |
   | `email` | string |
   | `avatar` | image URL |

   mockapi.io also adds an `id` and a `createdAt` to every record for you.
3. Let mockapi fill each resource with sample data, or add a few records yourself.
4. Copy your project's base URL. It looks like `https://XXXXXXXX.mockapi.io/api/v1`.
5. Open `https://XXXXXXXX.mockapi.io/api/v1/clubs` in your browser. You should see JSON.

**Free plan limits:** the free plan allows only a limited number of requests per month (the last time I checked, 500 per project). Every page load and button click uses some, so check your usage in the dashboard. If your data stops loading, you may have used them all up.

## Step 2: Point the app at your API

Each script starts with the same two lines:

```js
const API_ORIGIN = "https://XXXXXXXX.mockapi.io";
const API_URL = `${API_ORIGIN}/api/v1`;
```

Change `API_ORIGIN` to your own URL. It appears at the top of each of these seven files, so update all of them:

- `frontend/clubs/view_clubs.js`, `club.js`, `new_club.js`, `edit_club.js`
- `frontend/students/students.js`, `student.js`, `new_student.js`

If your resources or fields have different names, change them in the scripts as well.

## Step 3: Run it

Open `frontend/index.html` in your browser. For a smoother experience, use the **Live Server** extension in VS Code: right-click `index.html` and choose **Open with Live Server**.

## How the four REST methods work

Every action in the app is one of these. The `fetch` calls are simplified from the real code.

| Method | What it does | Used for |
|---|---|---|
| `GET` | Read data | Showing clubs and students |
| `POST` | Create a new record | Adding a club or student |
| `PUT` | Update an existing record | Saving an edit, adding or removing a member |
| `DELETE` | Remove a record | Deleting a club or student |

**GET: load all the clubs and show them** (`view_clubs.js`)

```js
const response = await fetch(`${API_URL}/clubs`);
const clubs = await response.json();

for (let club of clubs) {
  document.getElementById("clubs").innerHTML += `
    <div class="club_card">
      <img src="${club.thumbnail}">
      <h3>${club.name}</h3>
      <p>${club.description}</p>
    </div>`;
}
```

**GET one record by ID**: add the ID to the URL (`edit_club.js`)

```js
const response = await fetch(`${API_URL}/clubs/${clubId}`);
const club = await response.json();
```

**POST: create a record** (`new_club.js`)

```js
await fetch(`${API_URL}/clubs`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, description, thumbnail, users: [] }),
});
```

**PUT: update a record** (`edit_club.js`)

```js
await fetch(`${API_URL}/clubs/${clubId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, description, thumbnail, users }),
});
```

**DELETE: remove a record** (`edit_club.js`)

```js
await fetch(`${API_URL}/clubs/${clubId}`, { method: "DELETE" });
```

## Passing an ID from one page to another

When you click a club's **Edit** button, the link is `edit_club.html?id=3`. The part after `?` is a **query string**. The next page reads it like this:

```js
const clubId = new URLSearchParams(window.location.search).get("id");
```

Then it uses `clubId` in its `fetch` calls. This is how one page can show any record.

## How club members work

A club does not store whole students, only their IDs: `"users": ["2", "13", "16"]`. To show the member names and pictures, the page fetches the club and all students, then matches the IDs:

```js
const members = users.filter((user) => club.users.includes(user.id));
```

To add a member, push their ID onto the array and `PUT` the club back. To remove one, filter it out of the array and `PUT` again.

## Things to know

- **No error handling on purpose.** This is a simple example. If a request fails, the page won't tell you. Adding that (`try`/`catch` and checking `response.ok`) is a great next step.
- **Passwords:** the sample students include a `password` field, but this app never shows or uses it. Don't store real passwords in a mock API.
- **Shared data:** everyone who uses your API URL sees the same data, and anyone who has the URL can change or delete it.
- **Images:** new clubs without an image get a random photo from [picsum.photos](https://picsum.photos). New students without one get a generated avatar from [dicebear.com](https://www.dicebear.com).
- **Styling:** the app uses [Materialize CSS](https://materializecss.com) for the navbar and lists, plus the free Oswald font. Both load from the top of `style.css`.

## Challenges to try next

1. Add a third resource, like `events`, that belongs to a club.
2. Add a search box that filters the clubs as you type.
3. Show a friendly message when a request fails.
4. Make the navbar one shared piece of code instead of copying it into every page.
5. Add a `role` field to students, like "president" or "member".
6. When a student is deleted, remove them from every club they were in.
