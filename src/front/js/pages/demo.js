import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import rigoImage from "../../img/how-to.png";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

export const Demo = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
    const [listingDate, setListingDate] = useState('');
    const [listingId, setListingId] = useState(null);



  useEffect(() => {



  }, []);







	return (
    <div> 
      <div className="add_property_class_div">
      <button class="button-24" role="button" onClick={()=>navigate("/dashboard")}>Back to my dashboard</button>
      </div>

      
<div class="product-list-container">

   <h1>Nothing to show yet</h1>
   
  </div>
</div>

      





	);
};









