//You can edit ALL of the code here
let allShows = getAllShows().sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
});
let allEpisodes;
const body = document.querySelector("body");
let selectedShowsId = allShows.map((p) => p.id);
let defaulShowId = "82";

function getFetchForEpisodes(showsId) {
  fetch(`https://api.tvmaze.com/shows/${showsId}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      makeEpisodeList(allEpisodes);
    })
    .catch((err) => console.log(err));
}

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

//select shows
let selectedShows = document.createElement("select");
selectedShows.id = "shows-list";
const firstShowOption = document.createElement("option");
selectedShows.prepend(firstShowOption);
firstShowOption.innerText = "< SELECT SHOWS >";
selectedShows.id = "select_shows";
navBar.prepend(selectedShows);
selectedShows.addEventListener("change", getShowId);

function makeShowsList(showsList) {
  showsList.forEach((show) => createShowsList(show));
}

function createShowsList(newShows) {
  let showsOption = document.createElement("option");
  selectedShows.appendChild(showsOption);
  showsOption.value = newShows.id;
  showsOption.innerHTML = newShows.name;
}

function getShowId() {
  selectedEpisode.innerHTML = "";
  let findShowsId = allShows.find((shows) => shows.id == selectedShows.value);
  if (findShowsId == null) {
    getFetchForEpisodes(defaulShowId);
  } else {
    getFetchForEpisodes(findShowsId.id);
  }
}

// select episodes
let selectedEpisode = document.createElement("select");
let firstOption = document.createElement("Option");
selectedEpisode.prepend(firstOption);
firstOption.innerText = "< SELECT EPISODES >";
selectedEpisode.id = "select_episode";
navBar.appendChild(selectedEpisode);
selectedEpisode.addEventListener("change", selectEpisode);

function makeEpisodeList(newEpisodes) {
  newEpisodes.forEach((episode) => createEpisodesList(episode));
}

function createEpisodesList(episode) {
  selectedEpisode.prepend(firstOption);
  firstOption.innerText = "< SELECT EPISODES >";
  let episodeOptions = document.createElement("Option");
  selectedEpisode.appendChild(episodeOptions);
  episodeOptions.value = episode.id;
  episodeOptions.innerHTML = `S${formatEpisodeNumber(
    episode.season
  )}E${formatEpisodeNumber(episode.number)}: ${episode.name}`;
}

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
  if (episode.image == null) {
    makeImage.src =
      "https://uhcl-ir.tdl.org/bitstream/handle/10657.1/1586/not-available.jpg.jpg.jpg?sequence=3&isAllowed=y";
  } else {
    makeImage.src = episode.image.medium;
  }

  //summary
  const makeSummary = document.createElement("div");
  makeSummary.id = "summary";
  card.appendChild(makeSummary);
  makeSummary.innerHTML = "summary: " + episode.summary;
}

//footer
let footerContainer = document.createElement("footer");
footerContainer.id = "footer";
let footerText = document.createElement("p");
let source = document.createElement("a");
source.target = "_blank";
source.textContent = "TVMAZE.COM";
footerText.innerText = "THIS WEBSITE IS USING DATA FROM " + source;
body.appendChild(footerContainer);
footerContainer.appendChild(footerText);
footerText.appendChild(source);
source.href = "https://www.tvmaze.com/";

function setup() {
  makeShowsList(allShows);
  getFetchForEpisodes(defaulShowId);
}

window.onload = setup;
