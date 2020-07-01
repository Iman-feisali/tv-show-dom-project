//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const body = document.querySelector("body");

//header
const header = document.createElement("header");
header.id = "header";
header.innerHTML = "<h1>TV SHOW</h1>";
body.appendChild(header);

//navbar
const navBar = document.createElement("nav");
navBar.id = "nav";
body.appendChild(navBar);

//main container
let divElement = document.createElement("div");
divElement.id = "main";
body.appendChild(divElement);

// select eposides
let selectedEpisode = document.createElement("select");
const firstOption = document.createElement("Option");
selectedEpisode.prepend(firstOption);
firstOption.innerText = "< SELECT EPISODES >";
selectedEpisode.id = "select_episode";
navBar.prepend(selectedEpisode);
selectedEpisode.addEventListener("change", selectEpisode);

function selectEpisode() {
  let findedEpisode = allEpisodes.find(
    (episode) => episode.id == selectedEpisode.value
  );
  if (findedEpisode == null) {
    makePageForEpisodes(allEpisodes);
  } else {
    makePageForEpisodes([findedEpisode]);
  }
}

//search bar
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.id = "search-bar";
searchBar.placeholder = "Search...";
navBar.appendChild(searchBar);
searchBar.addEventListener("keydown", searchEpisodes);

//display bar
let episodesToDisplay = document.createElement("span");
navBar.appendChild(episodesToDisplay);

//makePageForEpisodes(search);
function searchEpisodes() {
  var searchedEpisodes = allEpisodes.filter((p) =>
    (p.name + p.summary).toLowerCase().includes(searchBar.value.toLowerCase())
  );
  makePageForEpisodes(searchedEpisodes);
}

//format episodes numbers
function formatEpisodeNumber(number) {
  return (number < 10 ? "0" : "") + number;
}

function makePageForEpisodes(episodeList) {
  divElement.innerHTML = "";
  episodeList.forEach((episode) => createCard(episode));
  episodesToDisplay.innerHTML = `Display ${episodeList.length} from ${allEpisodes.length} Episodes`;
}

function createCard(episode) {
  const card = document.createElement("div");
  card.id = "card";
  divElement.appendChild(card);

  //title
  const writeTitle = document.createElement("h2");
  writeTitle.id = "title";
  card.appendChild(writeTitle);
  writeTitle.innerHTML = `${episode.name}: S${formatEpisodeNumber(
    episode.season
  )} E${formatEpisodeNumber(episode.number)}`;

  //card image
  const makeImage = document.createElement("img");
  makeImage.id = "image";
  card.appendChild(makeImage);
  makeImage.src = episode.image.medium;

  //summary
  const makeSummary = document.createElement("div");
  makeSummary.id = "summary";
  card.appendChild(makeSummary);
  makeSummary.innerHTML = "summary: " + episode.summary;

  //select
  let episodeOptions = document.createElement("Option");
  selectedEpisode.appendChild(episodeOptions);
  episodeOptions.value = episode.id;
  episodeOptions.innerHTML = `S${formatEpisodeNumber(
    episode.season
  )}E${formatEpisodeNumber(episode.number)}: ${episode.name}`;
}

//footer
let footerContainer = document.createElement("footer");
footerContainer.id = "footer";
let footerText = document.createElement("p");
let source = document.createElement("a");
source.target = "_blank";
source.textContent = "TVMAZE.COM";
footerText.innerText = "THIS WEBSITE IS USING " + source;
body.appendChild(footerContainer);
footerContainer.appendChild(footerText);
footerText.appendChild(source);
source.href = "https://www.tvmaze.com/";

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
