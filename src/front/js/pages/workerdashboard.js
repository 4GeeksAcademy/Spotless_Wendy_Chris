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

    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {

        console.log(response)
        // let newArray = [...response];
        // let finalProperty = [];       


      })

      .catch(error => console.log(error));

  }, []);


  function delete_property(id_to_delete) {
    fetch(process.env.BACKEND_URL + `/api/user/${currentUser.id}/delete/property/` + id_to_delete,
      {
        method: 'DELETE',
        body: id_to_delete,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) console.log(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log("This is the response")
        console.log(response)

      
      })

      .catch(error => console.log(error));
  }






function accept_gig_function(id){
  let new_schedule= {listing_id: listingId, worker_id:1};
fetch(process.env.BACKEND_URL + "/api/user/property/listing/new",
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
      <button class="button-24" role="button" onClick={()=>navigate("/")}>See my schedule</button>
      </div>

      
<div class="listing_container">

   
  <h1>Nothing to show yet</h1>

</div>


</div>
	);
};









