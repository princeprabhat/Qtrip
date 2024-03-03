import config from "../conf/index.js";

const citiesLink = `${config.backendEndpoint}/cities`;

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    
    const getData = await fetch(citiesLink);
    const dataToJson = await getData.json();

    return dataToJson;
  }
  catch(e){
    return null;
  }
  
}
// console.log(fetchCities());

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const row = document.getElementById("data")
  
  const div = document.createElement('div');
  div.setAttribute("class","col-6 col-sm-6 col-lg-3 mb-3");
  
  const tile = document.createElement('div');
  tile.setAttribute("class","tile");

  const anch = document.createElement('a');
  anch.setAttribute("id",id);
  anch.setAttribute("href",`pages/adventures/?city=${id}`);

  const img = document.createElement('img');
  img.setAttribute("class","img-fluid");
  img.setAttribute("src",image);
  img.setAttribute("alt",id);



  const heading = document.createElement('p');
  
  const br = document.createElement('br');
  
  const span = document.createElement('span');
  span.innerText = description;
  span.style.fontSize = "1rem";
  
  heading.setAttribute("class","tile-text text-center fw-bold");

  heading.innerText = city;
  heading.appendChild(br);
  heading.appendChild(span);
  heading.style.fontSize = "1.5rem";

 


 
  tile.append(heading);
  tile.append(img);

  anch.append(tile);

  div.append(anch);

  row.appendChild(div);

  

}

export { init, fetchCities, addCityToDOM };
