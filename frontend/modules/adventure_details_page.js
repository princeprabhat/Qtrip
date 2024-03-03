import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
 
  const cityID = new URLSearchParams(search);
  const Id = cityID.get("adventure");
 
  
  // Place holder for functionality to work in the Stubs

  
  return Id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  const link = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`;

  // 1. Fetch the details of the adventure by making an API call
  try{
    const data = await fetch(link);
    const dataToJson = await data.json();
    return dataToJson;
  }
  catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs
 
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {name,subtitle,images,content} = adventure;

  document.getElementById('adventure-name').innerHTML = name;
  document.getElementById('adventure-subtitle').innerHTML = subtitle;
 
  images.forEach((img) =>{
    let div = document.createElement('div');
   
    div.innerHTML = `
    <img src="${img}" alt="${name}" class='activity-card-image'>`;
    document.getElementById('photo-gallery').append(div); 
  });

  document.getElementById('adventure-content').innerText = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.querySelector("#photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  images.forEach((image,index)=>{
    let div = document.createElement('div');
    div.className = `carousel-item ${index===0?"active":""}`;
    div.innerHTML = `<img class="activity-card-image" src="${image}" alt="Image">`
    document.querySelector(".carousel-inner").append(div);
  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
 if(adventure.available){
   document.querySelector('#reservation-panel-sold-out').style.display = "none";
   document.querySelector('#reservation-panel-available').style.display = "block";
   document.querySelector('#reservation-person-cost').textContent = adventure.costPerHead;   
}
else{

  document.querySelector('#reservation-panel-sold-out').style.display = "block";
  document.querySelector('#reservation-panel-available').style.display = "none"; 

}

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.querySelector('#reservation-cost').textContent = parseInt(adventure.costPerHead*persons);

}

//Implementation of reservation form submission
function captureFormSubmit(adventureInp) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const formId =  document.getElementById('myForm');
  formId.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputs = formId.elements;
    
    
    let reservation ={
      name:inputs['name'].value,
      date:inputs['date'].value,
      person:inputs['person'].value,
      adventure:adventureInp.id

    }
    const url = `${config.backendEndpoint}/reservations/new`;
   try{
    fetch(url,{
     
      // Adding method type
      method: "POST",
       
      // Adding body or contents to send
      body: JSON.stringify(reservation),
       
      // Adding headers to the request
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  }).then(res=>{
    
    // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    if(res.ok){
     alert('Success!');
     location.reload();
    }
    else{
      alert('Failed!');
      location.reload();
    }
  })

   }
catch(e){
  alert("Some error happened");
  location.reload();
} 

  })


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.querySelector('#reserved-banner').style.display = "block";
  }
  else{
    document.querySelector('#reserved-banner').style.display = "none";
  }

}


export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
