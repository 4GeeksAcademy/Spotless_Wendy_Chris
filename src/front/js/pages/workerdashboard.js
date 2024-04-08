import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import {  Link, useNavigate } from "react-router-dom";
import { MyListings } from "../component/mylistings";

export const WDashboard = () => {

  const { store, actions } = useContext(Context);
 
  const { currentUser, myProperties, setMyProperties, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
    const navigate = useNavigate();


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
      
        let newArray = [...response];
        let formatted_Listing = [];

        newArray.forEach((el) => {
          let each_listing = {};
          each_listing = el;
          let all_img = el.img.split(" ");
          each_listing.image1 = all_img[0];
       
          formatted_Listing.push(each_listing);
        

        })
       
        setMyListings(formatted_Listing); 
        console.log(formatted_Listing);

      })

      .catch(error => console.log(error));

  }, []);



function accept_offer_function(id){
  let new_schedule= {listing_id: id, worker_id:currentUser.id};
 console.log('Accept offer function was called');
// fetch(process.env.BACKEND_URL + "/api/worker/schedule/new",
//    {
//        method: 'POST',
//        body:JSON.stringify(new_schedule),
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//    .then(res => {
//        if (!res.ok) console.log(res.statusText);
//        return res.json();
//    })
//    .then(response => {
//        console.log(response)

//    })

//    .catch(error => console.log(error));

}


function filter_listing_function(val){
let which_filter= val.currentTarget.innerText;
if(which_filter=='City (A-Z)'){
  let test= [...myListings];
test.sort((a, b) => a.city- b.city);
console.log('This the test result: ')
console.log(test)
}
else if(which_filter=='Price: (High to Low)'){

}
else {
  
}


}


	return (
    <div> 

<div className="add_property_class_div">
      <button className="test button-24"  onClick={()=>navigate("/")}>My Schedule</button>
      </div>
    
     
      <div className="dropdown mb-3 ">
  <button
    className="btn btn-secondary mb-2 dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
  >
 <i class="fa-solid fa-sliders fa-2xl"></i>
  </button>
  <ul className="dropdown-menu text-lg" aria-labelledby="dropdownMenuButton">
    <li><span className="dropdown-item" onClick={(e)=>filter_listing_function(e)}>City (A-Z)</span></li>
    <li><span className="dropdown-item" onClick={(e)=>filter_listing_function(e)}>Price: (High to Low)</span></li>
    <li><span className="dropdown-item" onClick={(e)=>filter_listing_function(e)}>Something A-Z</span></li>
  </ul>
</div>
       
    
   
     <div>
  
  <ul>

  {myListings.map((element) =>

    <li>
    
        <div className="listing_div">

<div className="d-flex  justify-content-between ">

      <img src={element.image1} className="img_listing"/>

      <div className="city_address_div mx-2 mr-2 pt-2 ">
      <h4>{element.city}</h4>
      <span> {element.address}</span>
        </div>

        <div className="mx-4 mr-4 ">
   <span>{element.date_needed}</span>
        </div>

        <div className="mx-4 mr-4">
      <span>Quote : {element.rate}$</span>
        </div>

        </div>

        <div className="accept_div">

        <button className="test"  onClick={()=>accept_offer_function(element.id)}>Accept</button>
        </div>
      
      </div>
       
      
     
    </li>
  )}
  
    </ul>
   
    </div>

</div>
	);
};









