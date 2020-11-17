const APIURL = "/api/characters/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getCharacter("itachi");

async function getCharacter(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);

  addDetailsToCard(respData);
}

function createUserCard(user) {
  let clanOrVillage = "";
  if (user.village) {
    clanOrVillage = `<li><strong>Village- </strong>${user.village}</li>`;
  } else {
    clanOrVillage = `<li><strong>Clan- </strong>${user.clan}</li>`;
  }
  const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.image_url}" alt="${
    user.name
  }" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.occupation.join(" , ")}</p>

                <ul class="info">
                    <li><strong>Age- </strong> ${user.age}</li>
                    <li><strong>BirthDate- </strong>${user.birthdate}</li>
                    
                   ${clanOrVillage}
                </ul>

                <div id="classif"><span>Classification - </span></div>
                <div id="jutsus"><span>Best Jutsus - </span></div>
            </div>
        </div>
    `;

  main.innerHTML = cardHTML;
}

function addDetailsToCard(charac) {
  const classifEl = document.getElementById("classif");
  const jutsusEl = document.getElementById("jutsus");

  charac.classifaction.forEach((char) => {
    const characEl = document.createElement("a");
    characEl.classList.add("characinfo");

    characEl.alt = char;
    characEl.innerText = char;

    classifEl.appendChild(characEl);
  });

  charac.best_jutsus.forEach((char) => {
    const jutsuEl = document.createElement("a");
    jutsuEl.classList.add("characinfo");

    jutsuEl.alt = char;
    jutsuEl.innerText = char;

    jutsusEl.appendChild(jutsuEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getCharacter(user);

    search.value = "";
  }
});
