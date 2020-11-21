const url = "/api/characters";
const phraseslist = document.querySelector(".phrases-list");

const getNames = async () => {
  const result = await fetch(url);
  const jsondata = await result.json();
  console.log(jsondata);
  let characterlist = "";
  jsondata.forEach((element) => {
    characterlist += `<li>${element.firstName}</li>`;
  });
  phraseslist.innerHTML = characterlist;
};
getNames();
