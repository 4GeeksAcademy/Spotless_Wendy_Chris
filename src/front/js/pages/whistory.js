import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import {  Link, useNavigate } from "react-router-dom";

export const WSchedule= () => {

  const { store, actions } = useContext(Context);
 
  const { currentUser, myProperties, setMyProperties,workerListings, setWorkerListings, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
    const navigate = useNavigate();
const[wSchedule, setWSchedule]= useState([]);


  useEffect(() => {
    let worker_id= currentUser.id;

    fetch(process.env.BACKEND_URL + "api/worker/"+worker_id+"/schedule/history")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log('this is the history we got for this worker : ')
        console.log(response)
        setWSchedule(response); 

      })

      .catch(error => console.log(error));

  }, []);



	return (
    <div> 

<div className="add_property_class_div">
      <button className="test button-24"  onClick={()=>navigate("/wdashboard")}>Listing</button>
      </div>
    
     <div>
  
  <ul>

  {WSchedule.map((element) =>

    <li>
    
        <div className="listing_div">

<div className=" d-flex  justify-content-between pt-2 ">

      <div className="city_address_div mx-2  ">
      <h4>{element.city}</h4>
      <span> {element.address}</span>
        </div>

        <div className="date_div mx-4 pr-4 ">
   <span>{element.date_needed}</span>
        </div>
        <div className="note_rate_div mx-4 pr-2">
   <span>{element.special_note}</span><br/>
   <span>Quote : {element.rate}$</span>
        </div>

        <div className="d-flex align-items-center mx-4 mr-2">
            <span>Status: Completed</span>
             </div>

        </div>

          
      </div>
       
      
     
    </li>
  )}
  
    </ul>
   
    </div>

</div>
	);
};








