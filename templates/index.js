const SearchForm = document.getElementById("SearchForm");
const DataAdd = document.getElementById("Data");

const url = (character) => `/api/characters/${character}`;

SearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterSearch = document.getElementById("charac").value;
  getcharacterDetails(characterSearch);
});

const getcharacterDetails = async (charac) => {
  const results = await fetch(url(charac));
  const JSONdata = await results.json();
  console.log(JSONdata);
  DataAdd.innerHTML = HTMLmarkup(JSONdata);
};

const HTMLmarkup = (data) => {
  console.log(data);
  const markup = `<h1>${data.name} </h1>
  <img src="${data.image_url}">
  
  <p>${data.age}</p>
  <p>${data.birthdate}</p>
  <p>${data.clan}</p>
  <p>${data.best_jutsus.join(",")}<p>
  <p>${data.classifaction.join(",")}<p>
  <p>${data.occupation.join(",")}<p>
  
  `;
  return markup;
};
