import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);


  const navigate = useNavigate();


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/user/" + currentUser.id + "/property/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {

        console.log(response)
        let newArray = [...response];
        let finalProperty = [];

        newArray.forEach((el) => {
          let each_property = {};
          let all_img = el.img.split("  ");
          // console.log(all_img)
          each_property = el;
          each_property.image1 = all_img[0];
          each_property.image2 = all_img[1];
          each_property.image3 = all_img[2];
          finalProperty.push(each_property);
          console.log('test begins here')
          console.log(finalProperty);

        })
        setMyProperties(finalProperty);


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

        let newArray = [...response];
        let finalProperty = [];

        newArray.forEach((el) => {
          let each_property = {};
          let all_img = el.img.split("  ");
          // console.log(all_img)
          each_property = el;
          each_property.image1 = all_img[0];
          each_property.image2 = all_img[1];
          each_property.image3 = all_img[2];
          finalProperty.push(each_property);
          console.log('test begins here')
          console.log(finalProperty);

        })
        setMyProperties(finalProperty);
      })

      .catch(error => console.log(error)); git
  }



  return (
    <div>
      <div class="product-list-container">


        {myProperties.map((element, index) =>


          <div class="card text-secondary" style={{ width: "18rem" }}>




            <div id="carouselExampleSlidesOnly" class="carousel slide h-50" data-bs-ride="carousel">
              <div class="carousel-inner" style={{ height: "10rem" }}>
                <div class="carousel-item active">
                  <img src={element.image1} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={element.image2} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={element.image3} class="d-block w-100  " alt="..." />
                </div>
              </div>
            </div>









            <div class="card-body">
              <h5 class="card-title">{element.name}</h5>
              <p class="card-text">Address: {element.address}<br />
                City: {element.city}</p>
              <div>
                <button class="button-24" role="button" >Add to Listing</button>
                <button className="btn" onClick={() => delete_property(element.id)}>
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









