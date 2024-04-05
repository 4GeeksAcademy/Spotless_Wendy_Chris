import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import {  Link, useNavigate } from "react-router-dom";

export const WDashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
  


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/listing/all2")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {

        console.log(response)
        let newArray = [...response];
        let finalProperty = [];

        newArray.forEach((el) => {
          let each_listing = {};
          let all_img = el.img.split(" ");
       
          each_listing = el;
          each_listing.image1 = all_img[0];
          each_listing.image2 = all_img[1];
          each_listing.image3 = all_img[2];
          finalProperty.push(each_property);
          console.log('test begins here')
          console.log(finalProperty);

        })
        setMyProperties(finalProperty);    


      })

      .catch(error => console.log(error));

  }, []);





function accept_gig_function(id){
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
    <button class="button-24" role="button" onClick={()=>navigate("/")}>See my Schedule</button>
    </div>

    
<div class="product-list-container">

      {all_listing.map((element) =>

        <div class="card text-secondary" style={{ width: "18rem" }}>


      

          <div id="slideshow">
          <div className="jump_div">
                <Link to='/demo'>
                <span><i class="fa-solid fa-arrow-up-right-from-square fa-xl"></i></span>
                </Link>
                </div>
<div class="slide-wrapper">
  
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


</div>

</div>
	);
};









