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
  <div class="card">
  <img src="${charac.image_url}" alt="John" style="width:100%">
  <h1>${charac.name}</h1>
  <p class="title">${charac.occupation.join(", ")}</p>
  <p>${charac.classifaction.join(", ")}</p>
  <p><strong>Age - </strong>${charac.age} years.</p>
  <p><strong>Birthdate - </strong>${charac.birthdate}</p>
  <p>${clanOrVillage}</p>
  <div style="margin: 24px 0;">
    <p><em>${charac.best_jutsus.join(", ")}</em></p>
  </div>
  
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
    "<div class='loading flex' id='load'><img src='Sharingan.png'></div>";
  main.innerHTML = loadingHTML;
}
