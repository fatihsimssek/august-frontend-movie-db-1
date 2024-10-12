import { apiKey, apiUrl } from "./config.js";

// Esra Detail Section START

async function fetchMovieDataDetails(movieId) {
  const url = `${apiUrl}${apiKey}&i=${movieId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    detailWatched(data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}
function getStars(rating) {
  let stars = ``;
  for (let i = 0; i < parseInt(rating) / 2; i++) {
    stars += `<img src="./assets/images/star.png" />`;
  }
  return stars;
}
// URLSearchParams kullanarak parametreleri al

const params = new URLSearchParams(window.location.search);
await fetchMovieDataDetails(params.get("i"));

function detailWatched(film) {
  const filmBoxes = document.querySelector(".md-container");
  const detail_body = document.getElementById("md-body");
  const detail_footer = document.getElementById("md-footer");
  detail_body.style.cssText = `
  opacity: 0.8;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
  background-image: url(${film.Poster});
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  -webkit-filter: blur(8px);
  position:absolute;
  top:0;
  left:0px;
  height: 110vh;
  width:100vw;
  z-index: -1;
  `;
  filmBoxes.innerHTML = `<div class="total-box">
  <div class="md-title-box">
                <div class="md-title-main">
                <h4 class="md-primary-title">${film.Title}</h4>
                <p class="stars">${getStars(film.imdbRating)}</p>
                <p class="type">${film.Genre}</p>
                <div class="btn-field">
                  <a class="first-btn" href="#">WATCH TRAILER</a>
                  <a class="btn primary" href="#">WATCH FULL MOVIE</a>
                </div>
              </div>
            <div class="md-films" id="md-filmid" style="position:relative;cursor: pointer;">
              <img class="imw-poster" src="${film.Poster}" alt="Poster of ${
    film.Title
  }"> <span style="color: white; position:absolute;top:150px;left:100px;"><i class="fa-regular fa-circle-play fa-6x"></i></span>
            </div>
            </div>
             </div>
            <div class="story-text">
            <div class="card about">
            <div class="row">
            <div class="col-md-7">
            <h4 class="use-text-title2 mb-3">Storyline</h4>
            <p>${film.Plot}</p>
            <div class="btn-area-detail mt-10">
            <i class="fa-solid fa-share-nodes" style="color: #C5CAE9";></i>SHARE &nbsp;
            <i class="fa-solid fa-clapperboard" style="color: #C5CAE9"></i>TRIVIA &nbsp;
            <i class="fa-solid fa-star" style="color: #C5CAE9"></i>RATE THIS &nbsp;
              </div>
              </div>
              <div class="col-md-5">
              <div class="person"><h6 class="title-person">director</h6>
              <p>${film.Director}</p><h6 class="title-person">writers</h6>
              <p>${film.Writer}</p>
              <h6 class="title-person">stars</h6>
              <p>${film.Actors}</p>
              </div>
              </div>
              </div>
            </div>
            </div>`;
  // Function to toggle the visibility of the div
  function toggleInfo() {
    const infoDiv = document.getElementById("md-popup");
    if (infoDiv.style.display === "none" || infoDiv.style.display === "") {
      infoDiv.style.display = "block";
    } else {
      infoDiv.style.display = "none";
    }
  }

  // Add click event listener to the image
  document.querySelector("#md-filmid").addEventListener("click", toggleInfo);
}
document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("md-popup").style.display = "none";
});

// Esra Detail Section End
