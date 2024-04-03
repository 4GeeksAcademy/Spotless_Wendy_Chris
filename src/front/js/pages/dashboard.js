import React, { useContext, useState, useEffect, useNavigate } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import howto from "../../img/how-to.png";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
    const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    // const navigate = useNavigate();


	useEffect(() => {

        
 let myProperty_url= "api/user/2/property/all";
 fetch(process.env.BACKEND_URL + "api/user/"+currentUser.id+"/property/all" )
     .then(res => {
         if (!res.ok) throw Error(res.statusText);
         return res.json();
     })
     .then(response => {
     
   console.log(response)
   let newArray=[... response];
   let finalProperty=[];
  
   newArray.forEach((el)=>{
    let each_property={};
    let all_img= el.img.split("  ");
   // console.log(all_img)
    each_property=el;
    each_property.image1=all_img[0];
    each_property.image2=all_img[1];
    each_property.image3=all_img[2];
    finalProperty.push(each_property);
console.log('test begins here')
console.log(finalProperty);

     })
 setMyProperties(finalProperty);

       
         })

     .catch(error => console.log(error));

	}, []);

	
	return (
<div >

    {myProperties.map((element, index)=>



<div class="card" style={{width: "18rem" }}>
<div id="carouselExampleSlidesOnly" class="carousel slide h-50" data-bs-ride="carousel">
  <div class="carousel-inner" style={{height: "10rem" }}>
    <div class="carousel-item active">
      <img src={element.image1} class="d-block w-100 " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={element.image2} class="d-block w-100 " alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={element.image3} class="d-block w-100  " alt="..."/>
    </div>
  </div>
</div>
 
  <div class="card-body">
    <h5 class="card-title">{element.name}</h5>
    <p class="card-text">Address: {element.address}<br/>
      City: {element.city}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>


    )}




  


</div>
	);
};
