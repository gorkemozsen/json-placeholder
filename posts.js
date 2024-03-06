"use strict";

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("myParam");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let value = params.userId; // "some_value"

const postsContainer = document.getElementById("postsContainer");

if (value == undefined || value == null) {
  myFunction();
}

function myFunction() {
  let promptValue = prompt(
    "Please enter the User ID of the posts you want to view:"
  );
  let x = promptValue;
  console.log(x, promptValue);
  try {
    if (x.trim() == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x < 1) throw "too low";
    if (x > 10) throw "too high";
  } catch (err) {
    alert("Input is " + err);
    myFunction();
  }
  value = promptValue;
  getPosts();
}

async function getPosts() {
  let currentUserID = String(value);
  const posts = await (
    await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + currentUserID
    )
  ).json();

  function writeUsers() {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    postsContainer.appendChild(newRow);

    for (const post of posts) {
      newRow.innerHTML += `<div class="card" style="width: 18rem">
        <div class="card-header">#${post.id}</div>
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">
            ${post.body}
          </p>
        </div>
        <div class="card-footer">#${post.userId}</div>
      </div>`;
    }
  }
  writeUsers();
}

const backToUsers = document.createElement("a");
postsContainer.before(backToUsers);
backToUsers.innerText = "Back to the Users List";
backToUsers.classList.add("btn-primary", "btn");
backToUsers.setAttribute("href", "/index.html");

getPosts();
