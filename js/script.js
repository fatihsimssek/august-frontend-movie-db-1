import { apiKey, apiUrl } from "./config.js";

// ! Header Section Start - Parviz

const moviesBackground = [
  {
    id: 1,
    title: "Deadpool: Madness on the Road",
    releaseDate: "05.01.2025",
    videoLink: "./assets/video/deadpool2.mp4",
  },
  {
    id: 2,
    title: "Disney’s Snow White",
    releaseDate: "21.03.2024",
    videoLink: "./assets/video/snow_white.mp4",
  },
  {
    id: 3,
    title: "KRAVEN",
    releaseDate: "15.12.2024",
    videoLink: "./assets/video/kraven.mp4",
  },
];

const toggleMenu = document.querySelector(".toggle-menu");
const toggleMenuIcon = document.querySelector(".toggle-menu ion-icon");
const mobileNav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".nav-links li a");

// * Burası scroll yaptımızda header background değişiyor

window.addEventListener("scroll", () => {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
  filmDetail;
});

// * Burası mobileNav değer atar, sola kaydırmamız için

if (!mobileNav.style.transform) {
  mobileNav.style.transform = "translateX(-100%)";
}

// * Burası toggle menu

toggleMenu.onclick = () => {
  if (mobileNav.style.transform == "translateX(-100%)") {
    mobileNav.style.transform = "translateX(0%)";
    toggleMenuIcon.setAttribute("name", "close");
  } else {
    mobileNav.style.transform = "translateX(-100%)";
    toggleMenuIcon.setAttribute("name", "menu");
  }
};

//* Burada navbarda kliklendiğinde arkaplan rekgini değişiyoruz

let lastClicked = null;

navLinks.forEach((e) => {
  e.addEventListener("click", () => {
    if (lastClicked && lastClicked !== e) {
      lastClicked.style.background = "";
    }

    if (!e.style.background) {
      e.style.background = "#e91e63";
    } else {
      e.style.background = "";
    }

    lastClicked = e;
  });
});

// * Burada tesadüfü bir id alıyorum

let random = [...Array(moviesBackground.length).keys()].map((i) => i + 1)[
  Math.floor(Math.random() * moviesBackground.length)
];

// * Burada tesadüfü bir id alıyorum

const movie = moviesBackground.find((movie) => movie.id === random);

const videoBackgroundArea = document.querySelector(".video-background");

videoBackgroundArea.innerHTML = `<div class="pause-button">
                    <span>WATCH</span>
                    <ion-icon name="pause-circle-outline" onclick="pausePlay()"></ion-icon>
                    <span>TRAILER</span>
                  </div>

                  <div class="movie-info">
                    <p>Watch here and on the app across your devices.</p>
                    <h1>${movie.title}</h1>
                    <p>On the air ${movie.releaseDate}</p>
                  </div>

                  <video autoplay muted loop id="background-video">
                    <source src="${movie.videoLink}" type="video/mp4" />
                  </video>

                  <div class="overlay"></div>`;

//* Burada Hero Sectiondakı videoyu ayarlıyorum

const heroVideo = document.querySelector("#background-video");
const pauseButton = document.querySelector(".pause-button ion-icon");
const pauseButtonSection = document.querySelector(".pause-button");

export function pausePlay() {
  if (heroVideo.paused) {
    heroVideo.play();
    pauseButton.setAttribute("name", "pause-circle-outline");
    pauseButtonSection.classList.add("hidden");
  } else {
    heroVideo.pause();
    pauseButton.setAttribute("name", "play-circle-outline");
    pauseButtonSection.classList.remove("hidden");
  }
}

window.pausePlay = pausePlay;

// * Burada Settings (Dark Mode) ayarlıyorum

const settingsButton = document.querySelector(".menu-setting ion-icon");
const settingSidebar = document.querySelector(".setting-sidebar");

settingsButton.onclick = () => {
  if (settingSidebar.classList.contains("visible")) {
    settingSidebar.classList.remove("visible");
  } else {
    settingSidebar.classList.add("visible");
  }
};

document.addEventListener("click", (event) => {
  const isClickInsideSidebar = settingSidebar.contains(event.target);
  const isClickOnSettingsButton = settingsButton.contains(event.target);

  if (!isClickInsideSidebar && !isClickOnSettingsButton) {
    settingSidebar.classList.remove("visible");
  }
});

// * Burası Dark Mode klick olayı

const darkMode = document.querySelector(".dark-mode ion-icon");
const logOut = document.querySelector(".logout ion-icon");
const darkModeIcons = document.querySelectorAll(".setting-sidebar ion-icon");
const darkModeText = document.querySelectorAll(".setting-sidebar li");

darkMode.onclick = () => {
  if (darkMode.getAttribute("name") === "sunny") {
    darkMode.setAttribute("name", "moon");
    settingSidebar.style.backgroundColor = "var(--backgroundlight)";
    darkModeText.forEach((item) => (item.style.color = "black"));
    darkMode.style.color = "black";
    logOut.style.color = "black";
  } else {
    darkMode.setAttribute("name", "sunny");
    settingSidebar.style.backgroundColor = "var(--backgrounddark)";
    darkModeText.forEach((item) => (item.style.color = ""));
    darkMode.style.color = "white";
    logOut.style.color = "white";
  }
};

// * Burada Logout ayarlıyorum

const logOutButton = document.querySelector(".logout");
const login = localStorage.getItem("user");
const user = JSON.parse(login);
const authLinks = document.querySelector(".auth-links");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("user");

  window.location.href = "index.html";
});

if (login) {
  authLinks.innerHTML = `<div class="welcome-message">
                          Welcome <b>${user.name}</b>!
                        </div>`;
}

// ! Header Section End - Parviz

// #Trending Movies Js Start - Onur

const movieNameList = [
  "Inception",
  "Interstellar",
  "Superman",
  "Batman",
  "Smile",
  "Terrifier",
];

// *Fetch movies

const fetchMovie = async (title) => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
  );

  const data = await response.json();

  return data;
};

const fetchedMovies = await Promise.all(
  movieNameList.map(async (movie) => await fetchMovie(movie))
);

const cardList = document.querySelector("#cardList");

cardList.innerHTML = fetchedMovies
  .map(
    (movie) => `
    <div class="hs-card">
              <div class="hs-content">
                <div class="hs-content-left">
                  <span class="hs-content-sub-desc">New Episode Friday</span>
                  <h1 class="hs-content-title">${movie.Title}</h1>
                  <div class="hs-content-info">
                    <span class="hs-content-info-stars-group">
                      <div class="hs-content-info-star">
                        <img
                          src="/assets/icons/star.svg"
                          alt=""
                          class="hs-content-info-star-img"
                        />
                        <img
                          src="/assets/icons/star.svg"
                          alt=""
                          class="hs-content-info-star-img"
                        />
                        <img
                          src="/assets/icons/star.svg"
                          alt=""
                          class="hs-content-info-star-img"
                        />
                        <img
                          src="/assets/icons/star.svg"
                          alt=""
                          class="hs-content-info-star-img"
                        />
                        <img
                          src="/assets/icons/star.svg"
                          alt=""
                          class="hs-content-info-star-img"
                        />

                        <span class="hs-content-info-rate">5.0</span>
                      </div>
                    </span>
                    <span class="hs-content-info-duration">${
                      movie.Runtime
                    }</span>
                  </div>
                  <p class="hs-content-desc">
                    ${movie.Plot.slice(0, 130)}...
                  </p>
                  <div class="hs-content-btn-group">
                    <button class="hs-content-trailer-btn">
                      Watch Trailer
                    </button>
                    <button class="hs-content-redirect-btn">
                      Watch Full Movie
                    </button>
                  </div>
                </div>
                <div class="hs-content-right">
                  <img
                    class="hs-content-poster-img"
                    src="${movie.Poster}"
                    alt=""
                  />
                </div>
              </div>
              <div class="hs-card-bg">
                <img
                  class="hs-card-bg-img"
                  src="${movie.Poster}"
                  alt=""
                />
              </div>
            </div>
    `
  )
  .join("");

// *Slider slide functions
const windowWidth = window.innerWidth;

let i = 0;
let step;

if (windowWidth <= 640) {
  step = 400;
} else if (windowWidth <= 864) {
  step = 650;
} else if (windowWidth <= 1140) {
  step = 850;
} else {
  step = 1050;
}

export const nextSlider = (event) => {
  // event.preventDefault();
  i--;

  if (-i > movieNameList.length - 1) {
    cardList.style.transform = `translateX(${0 * step}px)`;
    i = 0;
  } else {
    cardList.style.transform = `translateX(${(i > 0 ? -i : i) * step}px)`;
  }
};

window.nextSlider = nextSlider;

export const prevSlider = (event) => {
  // event.preventDefault();
  i++;

  if (i > movieNameList.length - 1) {
    cardList.style.transform = `translateX(${0 * step}px)`;
    i = 0;
  } else {
    cardList.style.transform = `translateX(${(i < 0 ? i : -i) * step}px)`;
  }
};

window.prevSlider = prevSlider;

setInterval(() => {
  nextSlider(event);
}, 3000);

// #Trending Movies Js End - Onur

// Erkin Most Watched Section START
function mostWatched(film, container) {
  const filmDiv = document.createElement("div");
  filmDiv.classList.add("imw-film");
  filmDiv.innerHTML = `<a href="/detail.html?i=${film.imdbID}"> <img class="imw-poster" src="${film.Poster}" alt="Poster of ${film.Title}">
    <h4 class="imw-new">NEW</h4>
    <h2 class="imw-title">${film.Title} </h2></a>`;
  const playButton = document.createElement("button");
  playButton.classList.add("imw-play-button");
  playButton.innerHTML = "&#9658;";

  playButton.addEventListener("click", () => {
    window.location.href = "detail.html";
  });
  filmDiv.appendChild(playButton);
  container.appendChild(filmDiv);
}
async function fetchMovieData(movieId, container) {
  const url = `${apiUrl}${apiKey}&i=${movieId}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    mostWatched(data, container);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}

const filmIds = ["tt0468569", "tt0120689", "tt0816692"];
const filmBoxes = document.querySelectorAll(".imw-film-box");

filmIds.forEach((id, index) => {
  if (filmBoxes[index]) {
    fetchMovieData(id, filmBoxes[index]);
  }
});
// Erkin Most Watched Section END

/* <!--Abdullah-[AU-2]Implement the Events and News section start --> */

const faqs = document.querySelectorAll(".faq-ques-div");

faqs.forEach((faq) => {
  faq.addEventListener("click", (e) => {
    let cont = e.target.closest(".faq");
    const isActive = cont.classList.contains("active");
    faqs.forEach((btn) => btn.closest(".faq").classList.remove("active"));
    if (!isActive) {
      cont.classList.add("active");
    }
  });
});

const cardText = document.querySelectorAll(".card-text");
cardText.forEach((text) => {
  text.textContent = text.textContent.slice(0, 140) + "...";
});

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});

function updateSlider() {
  let width = window.innerWidth;
  if (width > 600) {
    const translatePercentage = -50 * currentIndex;
    document.querySelector(
      ".slides"
    ).style.transform = `translateX(${translatePercentage}%)`;
  } else {
    const translatePercentage = -100 * currentIndex;
    document.querySelector(
      ".slides"
    ).style.transform = `translateX(${translatePercentage}%)`;
  }
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}
setInterval(autoSlide, 5000);

/* <!--Abdullah-[AU-2]Implement the Events and News section end --> */

/*<!-- [AU-16] -Implement-the-All-Categories-section START-->*/
const sliderContainer = document.querySelector(".slide-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const slideWidth = 46;
const autoSlideInterval = 3000;

let index = 0;
let startX = 0;
let startY = 0;
let isDragging = false;
let autoSlideId;
let currentTranslateX = 0;

const slideItems = [
  {
    id: 1,
    img: "/assets/icons/heart.svg",
    title: "ROMANTIC",
  },
  {
    id: 2,
    img: "/assets/icons/ion-planet.svg",
    title: "SCI-FI",
  },
  {
    id: 3,
    img: "assets/icons/commedy.svg",
    title: "COMMEDY",
  },
  {
    id: 4,
    img: "assets/icons/heroes.svg",
    title: "SUPER HEROES",
  },
  {
    id: 5,
    img: "assets/icons/actions.svg",
    title: "ACTIONS",
  },
  {
    id: 6,
    img: "assets/icons/hollywood.svg",
    title: "HOLLYWOOD",
  },
  {
    id: 7,
    img: "/assets/icons/heart.svg",
    title: "ROMANTIC",
  },
  {
    id: 8,
    img: "/assets/icons/ion-planet.svg",
    title: "SCI-FI",
  },
  {
    id: 9,
    img: "assets/icons/heroes.svg",
    title: "SUPER HEROES",
  },
  {
    id: 10,
    img: "assets/icons/actions.svg",
    title: "ACTIONS",
  },
  {
    id: 11,
    img: "assets/icons/hollywood.svg",
    title: "HOLLYWOOD",
  },
  {
    id: 12,
    img: "assets/icons/commedy.svg",
    title: "COMMEDY",
  },
  {
    id: 13,
    img: "assets/icons/heroes.svg",
    title: "SUPER HEROES",
  },
  {
    id: 14,
    img: "assets/icons/actions.svg",
    title: "ACTIONS",
  },
  {
    id: 15,
    img: "/assets/icons/heart.svg",
    title: "ROMANTIC",
  },
];
console.log(sliderContainer);

sliderContainer.innerHTML = slideItems
  .map((item) => {
    return `
   <a href="#" class="slidef">
                <span class="wrap">
                  <span class="gradi">
                    <span class="figure">
                      <span class="heart-broken">
                        <img src="${item.img}" alt="" />
                      </span>
                    </span>
                  </span>
                  <span class="text">${item.title}</span>
                </span>
              </a>
  `;
  })
  .join("");

sliderContainer.style.transform = "translateX(0px)";

function sliderNext() {
  index++;
  if (index >= 3) {
    index = 0;
  }
  const transformValue = index * 460;
  sliderContainer.style.transform = `translateX(-${transformValue}px)`;
}

function sliderPrev() {
  index--;
  if (index <= -3) {
    index = 0;
  }
  const transformValue = index * 460;
  sliderContainer.style.transform = `translateX(${transformValue}px)`;
}

function startAutoSlide() {
  autoSlideId = setInterval(sliderNext, autoSlideInterval);
}

function stopAutoSlide() {
  clearInterval(autoSlideId);
}

prevButton.addEventListener("click", () => {
  stopAutoSlide();
  sliderPrev();
  startAutoSlide();
});

nextButton.addEventListener("click", () => {
  stopAutoSlide();
  sliderNext();
  startAutoSlide();
});

sliderContainer.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;
  isDragging = true;
  stopAutoSlide();
});

sliderContainer.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      const newTranslateX = currentTranslateX + diffX;
      sliderContainer.style.transform = `translateX(${newTranslateX}px)`;
    }
  }
});

sliderContainer.addEventListener("mouseup", () => {
  isDragging = false;
  const currentTranslateX = parseInt(
    sliderContainer.style.transform.match(/-?\d+/)[0]
  );
  const index = Math.round(-currentTranslateX / slideWidth) + 1;
  sliderContainer.style.transform = `translateX(-${
    (index - 1) * slideWidth
  }px)`;
  startAutoSlide();
});

startAutoSlide();
/*<!-- [AU-16] -Implement-the-All-Categories-section END-->*/

/*Footer-Section-Start*/

const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
/*Footer-Section-End*/
