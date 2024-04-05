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

        let newArray = [...response];
        let finalProperty = [];

        newArray.forEach((el) => {
          let each_property = {};
          let all_img = el.img.split("  ");
         
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
  }



function pop_modal_function(id_of_property){
  const dialog = document.getElementById('modal');
  dialog.showModal();
  setListingId(id_of_property);
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

      
<div class="product-list-container">


        {myProperties.map((element, index) =>



          <div class="card text-secondary" style={{ width: "18rem" }}>




            <div id="carouselExampleSlidesOnly" class="carousel slide h-50" data-bs-ride="carousel">
              <div class="carousel-inner" style={{ height: "10rem" }}>
                <div class="carousel-item active">
                  <img src={element.image1} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={rigoImage} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={rigoImage} class="d-block w-100  " alt="..." />
                </div>
              </div>
            </div>








 
  <div class="card-body">
    <h5 class="card-title">{element.name}</h5>
    <p class="card-text">Address: {element.address}<br/>
      City: {element.city}</p>
      <div>
      <button class="button-24" role="button" onClick={()=>pop_modal_function(element.id)}>Add to Listing</button>
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









