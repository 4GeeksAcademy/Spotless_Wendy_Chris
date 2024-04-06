import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import {  Link, useNavigate } from "react-router-dom";

export const WDashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
  const[Listing, setListing]= useState([]); 
    const navigate = useNavigate();


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log('Test listing endpoint begins here :')
        console.log(response)
        // let newArray = [...response];
        // let formatted_Listing = [];

        // newArray.forEach((el) => {
        //   let each_listing = {};
        //   let all_img = el.img.split(" ");
       
        //   each_listing = el;
        //   each_listing.image1 = all_img[0];
        //   each_listing.image2 = all_img[1];
        //   each_listing.image3 = all_img[2];
        //    formatted_Listing.push(each_property);
        //   console.log('test begins here')
        //   console.log( formatted_Listing);

        // })
        // setListing( formatted_Listing);    


      })

      .catch(error => console.log(error));

  }, []);





function accept_offer_function(id){
  let new_schedule= {listing_id: id, worker_id:currentUser.id};
fetch(process.env.BACKEND_URL + "/api/worker/schedule/new",
   {
       method: 'POST',
       body:JSON.stringify(new_schedule),
       headers: {
           'Content-Type': 'application/json'
       }
   })
   .then(res => {
       if (!res.ok) console.log(res.statusText);
       return res.json();
   })
   .then(response => {
       console.log(response)

   })

   .catch(error => console.log(error));

}


	return (
    <div> 

<div className="add_property_class_div">
      <button class="test button-24"  onClick={()=>navigate("/")}>My Schedule</button>
      </div>
    

{/*       
    <div className="add_property_class_div">
    <button class="button-24" role="button" onClick={()=>navigate("/")}>See my Schedule</button>
    </div>

    
<div class="product-list-container">

      {allListing.map((element) =>

        <div class="card text-secondary" style={{ width: "18rem" }}>


      

          <div id="slideshow">
       
<div class="slide-wrapper">
<img src={rigoImage} class=" w-100"/>
  
   <div class="slide"><img src={element.image1} class="slide-number w-100"/></div>
  <div class="slide"><img src={element.image2} class="slide-number w-100"/></div>
  <div class="slide"><img src={element.image3} class="slide-number w-100"/></div>
  <div class="slide"><img src={element.image1} class="slide-number w-100"/></div>
 
 
</div>
</div>

<div class="card-body">
  <h5 class="card-title">{element.name}</h5>
  <p class="card-text">Address: {element.address}<br/>
    City: {element.city}</p>
    <div className="d-flex justify-content-between">
    <button class="button-24" role="button" onClick={()=>accept_offer_function(element.id)}>Accept Gig</button>
    <button className="btn" onClick={() =>delete_property(element.id)}> 
             <i className="fas fa-trash-alt fa-bounce fa-xl" />
                 </button> 
    </div>
 
</div>
</div>

      )}


</div> */} 

</div>
	);
};









