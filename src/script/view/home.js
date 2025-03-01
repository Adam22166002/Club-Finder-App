import Utils from "../utils.js";
import Clubs from "../data/local/clubs.js";

const home = () => {
  const clubListContainerElement = document.querySelector("#clubListContainer");
  const clubLoadingElement =
    clubListContainerElement.querySelector(".search-loading");
  const clubListElement = clubListContainerElement.querySelector(".club-list");
  const listElement = clubListElement.querySelector(".list");
  const searchFormElement = document.querySelector("#searchForm");

  const showSportClub = (query) => {
    showLoading();

    const result = Clubs.searchClub(query);
    displayResult(result);

    showClubList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    const query = event.target.elements.name.value;
    showSportClub(query);
  };

  const displayResult = (clubs) => {
    const clubItems = clubs.map((club) => {
      return `
        <div class="card">
          <img
            class="fan-art-club"
            src="${club.strTeamBadge}" 
            alt="Fan Art: ${club.strTeam}"
          >
          <div class="club-info">
            <div class="club-info__title">
              <h2>${club.strTeam}</h2>
            </div>
            <div class="club-info__description">
              <p>${club.strDescriptionEN}</p>
            </div>
          </div>
        </div>
      `;
    });

    listElement.innerHTML = clubItems.join("");
  };

  const showLoading = () => {
    Array.from(clubListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(clubLoadingElement);
  };

  const showClubList = () => {
    Array.from(clubListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(clubListElement);
  };

  // Inisialisasi halaman dengan query kosong, untuk menampilkan semua klub pada awalnya
  showSportClub("");

  // Menambahkan event listener untuk form submit
  searchFormElement.addEventListener("submit", onSearchHandler);
};

export default home;
