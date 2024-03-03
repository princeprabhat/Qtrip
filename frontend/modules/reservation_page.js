import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
 try{
  const url = `${config.backendEndpoint}/reservations/`;

  const data = await fetch(url);
  const dataToJson = await data.json();
 
 
  return dataToJson;
 } catch(e){
  return null;
 }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
if(reservations.length>0){
  document.querySelector('#no-reservation-banner').style.display = 'none';
  document.querySelector('#reservation-table-parent').style.display = "block";
}
else{
  document.querySelector('#no-reservation-banner').style.display = 'block';
  document.querySelector('#reservation-table-parent').style.display = "none";
}


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
    
  */
 
 reservations.forEach(el=>{
   
  
  let dateObj = new Date(el.date);
  let timeObj = new Date(el.time);

  // let adventureBtn = document.createElement('a');
  // adventureBtn.className = "reservation-visit-button";
  // adventureBtn.setAttribute("href",`/frontend/pages/adventures/detail/?adventure=${el.adventure}`);
  // adventureBtn.setAttribute("id",`${el.id}`);
  // adventureBtn.textContent = "Visit Adventure";

  let tr = document.createElement('tr');
  tr.innerHTML = `
  <th>${el.id}</th>
  <td>${el.name}</td>
  <td>${el.adventureName}</td>
  <td>${el.person}</td>
  <td>${dateObj.toLocaleDateString("en-IN")}</td>
  <td>${el.price}</td>
  <td>${timeObj.toLocaleString('en-IN',
  {
  year: 'numeric',  
  day:'numeric',
  month: 'long',})+", "+ timeObj.toLocaleTimeString('en-IN',
  {
  hour:"numeric",
  minute:"numeric",
  second:"numeric",
  hour12:true})}</td>
  <div id="${el.id}"><a href="../detail/?adventure=${el.adventure}" class="reservation-visit-button">Visit Adventure</a></div>
  `;
 
  
  document.querySelector('#reservation-table').append(tr);
  
  // console.log(document.getElementById(el.id).href);
})

}

export { fetchReservations, addReservationToTable };
