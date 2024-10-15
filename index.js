const API_URL =
  "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies";

function convertToHours(runtime) {
  try {
    let totalMins = runtime.split(" ")[0];
    let hours = Math.floor(totalMins / 60);
    let mins = totalMins % 60;
    return `${hours} hours ${mins} mins`;
  } catch (error) {
    console.log(error);
  }
}

function checkTheYear(year) {
  if (year < 0) {
    return 0;
  }
  try {
    if (year <= 2014) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

let entireData = [];
let currentIndex = 0;
let pagePerItem = 2;
function renderItem() {
  let slicedData = entireData.slice(currentIndex, currentIndex + pagePerItem);
  currentIndex += pagePerItem;

  slicedData.map((item) => {
    document.getElementById(
      "movieContainer"
    ).innerHTML += `<div class="movie__card">
    <h3>${item.Title}</h3>
     <img
       src=${
         item.Poster
           ? item.Poster
           : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnLMEBSD_QdkyERh9OUe7XExAvG9rw9Ao1A&s`
       }
      alt="movieCard"
    />
    <div>
     <span>${convertToHours(item.Runtime)}</span>
     <span class=${checkTheYear(item.Year) ? "orangeSpan" : "purpleSpan"}>${
      item.Year
    }</span>
     </div>
    </div>`;
  });
  if (currentIndex >= entireData.length) {
    document.getElementById("showMore").style.display = "none";
  }
}

function getMovieData() {
  try {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        entireData = data;
        renderItem();
      });
  } catch (err) {
    console.log(err);
  }
}

async function handleFilter(filter) {
  try {
    return fetch(API_URL)
      .then((res) => res.json())
      .then(
        (json) =>
          json &&
          json
            .filter((item) => item.Title.includes(filter))
            .map((item) => {
              document.getElementById(
                "movieContainer"
              ).innerHTML += `<div class="movie__card">
          <h3>${item.Title}</h3>
           <img
             src=${
               item.Poster
                 ? item.Poster
                 : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnLMEBSD_QdkyERh9OUe7XExAvG9rw9Ao1A&s`
             }
            alt="movieCard"
          />
          <div>
           <span>${convertToHours(item.Runtime)}</span>
           <span class=${
             checkTheYear(item.Year) ? "orangeSpan" : "purpleSpan"
           }>${item.Year}</span>
           </div>
        </div>`;
            })
      );
  } catch (err) {
    console.log(err);
  }
}

getMovieData();

document
  .getElementById("header__searchbar")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchValue = document.getElementById("search").value;
    if (searchValue) {
      document.getElementById("movieContainer").innerHTML = "";
      await handleFilter(searchValue);
      if (document.getElementById("movieContainer").innerHTML) {
        console.log("Inner");
      } else {
        let searchElement = document.createElement("h3");
        searchElement.textContent = "No data found";
        document.getElementById("movieContainer").append(searchElement);
      }
    } else {
      document.getElementById("movieContainer").innerHTML = "";
      getMovieData();
    }
  });
let isLoggedIn = JSON.parse(localStorage.getItem("user"));
let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logOutBtn");
logoutBtn.style.display = "none";
if (isLoggedIn) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
}
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});
// // console.log(1 && 5);login
// ................. Regsiter ......................

document.getElementById("showMore").addEventListener("click", () => {
  renderItem();
});
