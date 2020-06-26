//You can edit ALL of the code here
const getBody = document.querySelector("body");
let makeDiv = document.createElement("div");
makeDiv.id = "main";
getBody.appendChild(makeDiv);
const allEpisodes = getAllEpisodes();

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  for (let i = 0; i < episodeList.length; i++) {
    const makeCard = document.createElement("div");
    makeCard.id = "card";
    makeDiv.appendChild(makeCard);
    const writeTitle = document.createElement("h2");
    writeTitle.id = "title";
    makeCard.appendChild(writeTitle);
    writeTitle.innerHTML = `${allEpisodes[i].name}: S${pad2(
      allEpisodes[i].season
    )}E${allEpisodes[i].number}`;
    const makeImage = document.createElement("img");
    makeImage.id = "image";
    makeCard.appendChild(makeImage);
    makeImage.src = allEpisodes[i].image.medium;
    const makeSummary = document.createElement("div");
    makeSummary.id = "summary";
    makeCard.appendChild(makeSummary);
    makeSummary.innerHTML = "summary: " + allEpisodes[i].summary;
  }
}

// function getEpisodes() {

// }
// console.log(allEpisodes[]);

window.onload = setup;
