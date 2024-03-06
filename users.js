"use strict";

const usersContainer = document.getElementById("usersContainer");

async function getUsers() {
  const users = await (
    await fetch("https://jsonplaceholder.typicode.com/users")
  ).json();

  function writeUsers() {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    usersContainer.appendChild(newRow);

    for (const user of users) {
      newRow.innerHTML += `<div class="card" style="width: 20rem">
      <div class="card-header">#${user.id}</div>
      <div class="card-body">
        <h5 class="card-title"><i class="fa-solid fa-user"></i> Personal :</h5>
        <p class="card-text">Name: <span >${user.name}</span></p>
        <p class="card-text">User Name: <span >${user.username}</span></p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5 class="card-title">
            <i class="fa-solid fa-location-dot"></i> Address :
          </h5>
          <p class="card-text">Street: <span>${user.address["street"]}</span></p>
          <p class="card-text">Suite: <span >${user.address["suite"]}</span></p>
          <p class="card-text">City: <span >${user.address["city"]}</span></p>
          <p class="card-text">Zip Code: <span >${user.address["zipcode"]}</span></p>
        </li>
        <li class="list-group-item">
          <h5 class="card-title">
            <i class="fa-solid fa-building"></i> Company :
          </h5>
          <p class="card-text">
            Company Name: <span >${user.company["name"]}</span>
          </p>
          <p class="card-text">
            Company Description: <span >${user.company["catchPhrase"]}</span>
          </p>
        </li>
        <li class="list-group-item">
          <h5 class="card-title">
            <i class="fa-solid fa-address-book"></i> Contact :
          </h5>
          <p class="card-text">E-mail: <span >${user.email}</span></p>
          <p class="card-text">Phone: <span >${user.phone}</span></p>
        </li>
      </ul>
      <div class="card-footer">
        <a href="https://${user.website}" class="card-link">Web Site</a>
        <a href="http://127.0.0.1:5500/posts.html?userId=${user.id}" class="card-link">User's Posts</a>
      </div>
    </div>`;
    }
  }
  writeUsers();
}

getUsers();
