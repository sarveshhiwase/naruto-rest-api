const APIURL = "/api/characters/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getCharacter("itachi");

async function getCharacter(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  if (respData.error) {
    createErrorCard();
  } else {
    createCharacterCard(respData);
  }
}
function createErrorCard() {
  const errorHTML =
    "<div class='user-info'><h2>Maybe There was no Character on Our side or Make Sure You Typed Correct Spelling.</h2></div>";
  main.innerHTML = errorHTML;
}

function createCharacterCard(charac) {
  let clanOrVillage = "";
  if (charac.village) {
    clanOrVillage = `<strong>Village - </strong>${charac.village}`;
  } else {
    clanOrVillage = `<strong>Clan - </strong>${charac.clan}`;
  }
  const cardHTML = `
  
  
  <div class="flex around">
  <img class="avatar" src="${charac.image_url}">
  <div class="flex column">
  <h1>${charac.name}</h1>
  <p><strong> Age - </strong>${charac.age}</p>
  <p><strong>BirthDate - </strong>${charac.birthdate}</p>
  <p>${clanOrVillage}</p>
  </div>
  </div>
  <div class="flex column">
  <div><strong>Occupation - </strong>${generateLinks(charac.occupation)}</div>
  <div><strong>Best Jutsus - </strong>${generateLinks(charac.best_jutsus)}</div>
  <div><strong>Classification - </strong> ${generateLinks(
    charac.classifaction
  )}</div>
  </div>
        `;

  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    loading();
    getCharacter(user);

    search.value = "";
  }
});

function loading() {
  const loadingHTML =
    "<div class='loading' id='load'><img src='Sharingan.png'></div>";
  main.innerHTML = loadingHTML;
}

function generateLinks(arr) {
  let constlinkMarkup = ``;
  arr.forEach((element) => {
    constlinkMarkup += `<a class="characinfo">${element}</a>`;
  });
  return constlinkMarkup;
}
