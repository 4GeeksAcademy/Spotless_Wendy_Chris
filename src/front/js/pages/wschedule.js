import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import {  Link, useNavigate } from "react-router-dom";

export const WSchedule= () => {

  const { store, actions } = useContext(Context);
 
  const { currentUser, myProperties, setMyProperties, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
    const navigate = useNavigate();
const[mySchedule, setMySchedule]= useState([]);


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/"+currentUser.id+"/schedule/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
       
        setMySchedule(response); 
        console.log(formatted_schedule);

      })

      .catch(error => console.log(error));

  }, []);



function cancel_schedule_function(id){
  let cancel_schedule= {listing_id: id, worker_id:currentUser.id};
 console.log('Accept offer function was called');
// fetch(process.env.BACKEND_URL + "/api/worker/schedule/new",
//    {
//        method: 'PUT',
//        body:JSON.stringify(cancel_schedule),
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




	return (
    <div> 

<div className="add_property_class_div">
      <button className="test button-24"  onClick={()=>navigate("/")}>Listing</button>
      </div>
    
     
   
       
    
   
     <div>
  
  <ul>

  {mySchedule.map((element) =>

    <li>
    
        <div className="listing_div">

<div className="d-flex  justify-content-between ">

      <div className="city_address_div mx-2 mr-2 pt-2 ">
      <h4>{element.city}</h4>
      <span> {element.address}</span>
        </div>

        <div className="mx-4 mr-4 ">
   <span>{element.date_needed}</span>
        </div>
        <div className="mx-4 mr-4 ">
   <span>{element.special_note}</span>
        </div>

        <div className="mx-4 mr-4">
      <span>Quote : {element.rate}$</span>
        </div>

        </div>

        <div className="accept_div">

        <button className="test"  onClick={()=>cancel_schedule_function(element.id)}>Cancel</button>
        </div>
      
      </div>
       
      
     
    </li>
  )}
  
    </ul>
   
    </div>

</div>
	);
};









