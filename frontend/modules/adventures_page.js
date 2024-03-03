


import config from "../conf/index.js";




//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  const cityName = new URLSearchParams(search);
  const city =cityName.get("city");
return city;


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
const link = `${config.backendEndpoint}/adventures?city=${city}`;

  try{
    const data = await fetch(link);
    const dataToJson = await data.json();
    return dataToJson;
  }
  catch(err){
    return null;
  }


}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((element)=>{
    
  const dataDiv = document.getElementById("data");





  const divLink = document.createElement('a');
  divLink.setAttribute("class","activity-card col-6 col-lg-3 col-sm-6 col-md-6 mb-3");
  divLink.setAttribute("id",element.id);
  divLink.setAttribute("href",`detail/?adventure=${element.id}`);
   
   
    const img = document.createElement("img");
 
    img.setAttribute("src",element.image);
    img.setAttribute("alt",element.name);
    img.style.borderTopLeftRadius = "8px";
    img.style.borderTopRightRadius = "8px";

    const banner = document.createElement('div');
    banner.setAttribute("class","category-banner");
    banner.textContent = element.category;

    const textDiv = document.createElement("div");
    textDiv.setAttribute("class","w-100 pt-3");
    textDiv.style.border = "1px solid #ddd";
    textDiv.style.borderBottomLeftRadius ="8px";
    textDiv.style.borderBottomRightRadius = "8px";

    const textDiv1 = document.createElement("div");
    textDiv1.setAttribute("class","d-flex justify-content-between w-100 px-2 fw-bold");
    textDiv1.style.fontSize = "15px";
    textDiv1.innerHTML = `
    <p>${element.name}</p>
    <p><span>&#8377</span>${element.costPerHead}</p>
    `;

    const textDiv2 = document.createElement("div");
    textDiv2.setAttribute("class","d-flex justify-content-between w-100 px-2 fw-bold");
    textDiv2.style.fontSize = "15px";
    textDiv2.innerHTML = `
    <p>Duration</p>
    <p>${element.duration} Hours</p>
    `;

    textDiv.append(textDiv1);
    textDiv.append(textDiv2);
    

    divLink.append(img);
    divLink.append(banner);
    divLink.append(textDiv);

    dataDiv.append(divLink);

  });

}

  // const btn1 = document.getElementById("newBtn");
  // btn1.addEventListener("click",(e)=>{
  //   const city = getCityFromURL(window.location.search);
  //   const urlLink = `${config.backendEndpoint}/adventures/new`;
  //  try{
  // fetch(urlLink,{
  //     method:'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({"city":city})
  
  //   })
  // }
  // catch(err){
  //   return null;
  // }
  // })


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterByDurationItems = list.filter((item)=> item.duration>low && item.duration<=high);

  return filterByDurationItems;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredByCategoryItems = list.filter((item)=> categoryList.includes(item.category));

  return filteredByCategoryItems;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredItems;
  // Filter By both Category and Duration
  if(filters['duration'] && filters['category'].length>0){
    let time = filters['duration'].split("-");
    filteredItems = filterByDuration(list,parseInt(time[0]),parseInt(time[1]));
    filteredItems = filterByCategory(filteredItems,filters['category']);
  }
  //Filter By Duration
  else if(filters['duration']){
    let time = filters['duration'].split("-");
    filteredItems = filterByDuration(list,parseInt(time[0]),parseInt(time[1]));
   
  }
  // Filter by Category
  else if(filters['category'].length>0){
  filteredItems = filterByCategory(list,filters['category']);
}
else return list;
  // Place holder for functionality to work in the Stubs
  return filteredItems;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  const data = JSON.stringify(filters)
  localStorage.setItem("filters",JSON.stringify(filters));


  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
const filterFromLocalStorage = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filterFromLocalStorage;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
 
  document.getElementById("duration-select").value = filters.duration;

  let categoryItem = document.querySelector("#category-list");
  

  filters['category'].forEach((item)=>{
  let span = document.createElement('span');
  span.setAttribute("class","category-filter remove-filter");
  span.innerText = item;
 
  categoryItem.append(span);

})

}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
