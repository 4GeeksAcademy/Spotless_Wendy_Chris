import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import rigoImage from "../../img/how-to.png";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
    const [listingDate, setListingDate] = useState('');
    const [listingId, setListingId] = useState(null);



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
          let all_img = el.img.split("");
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
  }



function pop_modal_function(id_of_property){
  const dialog = document.getElementById('modal_dialog');
  dialog.showModal();
  setListingId(id_of_property);
}


function close_modal_function(){
  console.log('Close Function was called');
  const dialog = document.getElementById('modal_dialog');
  setListingId(null);
  dialog.close();
}


function get_specialNote_function(val){
let note= val.target.value;
setListingNote(note)

}

function get_date_needed_function(val){
let date_needed= val.target.value;
setListingDate(date_needed);

}

function save_modal_function(id){
  let new_listing= {property_id: listingId, special_note:listingNote, date_needed: listingDate};
fetch(process.env.BACKEND_URL + "/api/user/property/listing/new",
   {
       method: 'POST',
       body:JSON.stringify(new_listing),
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
setListingDate('');
setListingNote('');
   const dialog = document.getElementById('modal');
   dialog.close();
}


	return (
    <div> 
      <div className="add_property_class_div">
      <button class="button-24" role="button" onClick={()=>navigate("/")}>Add New Property</button>
      </div>

      
<div class="product-list-container">

        {myProperties.map((element, index) =>

          <div class="card text-secondary" style={{ width: "18rem" }}>


            <div id="carouselExampleSlidesOnly" class="carousel slide h-50" data-bs-ride="carousel">
              <div class="carousel-inner" style={{ height: "10rem" }}>
                <div className="jump_div">
                  <Link to='/'>
                  <span><i class="fa-solid fa-arrow-up-right-from-square fa-xl"></i></span>
                  </Link>
                  </div>
                <div class="carousel-item active">
                  <img src={element.image1} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={rigoImage} class="d-block w-100 " alt="..." />
                </div>
                <div class="carousel-item">
                  <img src={rigoImageUrl} class="d-block w-100  " alt="..." />
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


<dialog id="modal_dialog" className="modal"> 
<form>
  <div class="form-group ">
    <label for="exampleFormControlInput1">Date needed</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" value={listingDate} placeholder="Date needed" onChange={(e)=>get_date_needed_function(e)}/>
  </div>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={listingNote} onChange={(e)=>get_specialNote_function(e)}></textarea>
  </div>
</form>

  <button className="btn btn-secondary" onClick={()=>close_modal_function()}>Close</button>
  <button className="button-24" onClick={()=>save_modal_function()}>Save </button>

</dialog>
</div>
	);
};









