import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { AppContext } from "../layout";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Demo = () => {
  const location =useLocation();
const data = location.state;
 const navigate= useNavigate();


  const { store, actions } = useContext(Context);

  const {  display, setDisplay, filterListings, setFilterListings,
    menu, setMenu} = useContext(AppContext);



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
        let finalProperty = myProperties.filter((element)=>element.id!=id_to_delete);

        setMyProperties(finalProperty);
      })

      .catch(error => console.log(error));

      let newArray= [...hHistory];
      array[index].review= localrating;
      setHHistory(newArray);

  }





  return (
    <div>

      <div className="go_back_div">
        <button class="button-24" role="button" onClick={() =>{ 
          
          setDisplay("propMain");
          setFilterListings("Active");
          setMenu("properties");
         }}>Back to my dashboard</button>
      </div>

        <div class="card text-secondary" style={{ width: "80%" , height: "50%"}} >

  <img className="img_div_100" src={data.image1}/>


<div class="card-body">
  <h5 class="card-title">{data.name}</h5>
  <p class="card-text">Address: {data.address}<br />
    City: {data.city}</p>
  <div className="d-flex justify-content-between">
    
    <button className="btn" onClick={() => delete_property(data.id)}>
      <i className="fas fa-trash-alt fa-bounce fa-xl" />
    </button>
  </div>

   
  </div>


</div>

      </div>
 

  );
};









