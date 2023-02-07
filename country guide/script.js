let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let error_div = document.getElementById("errors");

const getCountry = (data) => {
  result.style.display = "block";
  error_div.style.display = "none";
  result.innerHTML = `
          <img src="${data[0].flags.svg}" class="flag-img">
          <h2>${data[0].name.common}</h2>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Capital:</h4>
                  <span>${data[0].capital[0]}</span>
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Continent:</h4>
                  <span>${data[0].continents[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Population:</h4>
                  <span>${data[0].population.toLocaleString('en-US')}</span>
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Currency:</h4>
                  <span>${
                    data[0].currencies[Object.keys(data[0].currencies)].name
                  } - ${Object.keys(data[0].currencies)[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Common Languages:</h4>
                  <span>${Object.values(data[0].languages)
                    .toString()
                    .split(",")
                    .join(", ")}</span>
              </div>
          </div>
        `;
}

searchBtn.addEventListener("click", async () => {
  try {
    let countryName = countryInp.value;
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    let response = await fetch(url);
    if(!response.ok)
      throw new Error("Country not found");
    let data = await response.json();
    getCountry(data);
  } catch (error) {
    result.style.display = "none";
    error_div.style.display = "block";
    error_div.innerText = `${error}`;
  }
});

// searchBtn.addEventListener("click", () => {
//   let countryName = countryInp.value;
//   let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

//   fetch(finalURL) // return promise
//     .then((response) => response.json()) // return promise
//     .then((data) => {
//       result.innerHTML = `
//         <img src="${data[0].flags.svg}" class="flag-img">
//         <h2>${data[0].name.common}</h2>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Capital:</h4>
//                 <span>${data[0].capital[0]}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Continent:</h4>
//                 <span>${data[0].continents[0]}</span>
//             </div>
//         </div>
//          <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Population:</h4>
//                 <span>${data[0].population.toLocaleString('en-US')}</span>
//             </div>
//         </div>
//         <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Currency:</h4>
//                 <span>${
//                   data[0].currencies[Object.keys(data[0].currencies)].name
//                 } - ${Object.keys(data[0].currencies)[0]}</span>
//             </div>
//         </div>
//          <div class="wrapper">
//             <div class="data-wrapper">
//                 <h4>Common Languages:</h4>
//                 <span>${Object.values(data[0].languages)
//                   .toString()
//                   .split(",")
//                   .join(", ")}</span>
//             </div>
//         </div>
//       `;
//     })
//     .catch(() => {
//       if (countryName.length == 0) {
//         result.innerHTML = `<h3>The input field cannot be empty</h3>`;
//       } else {
//         result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
//       }
//     });
// });