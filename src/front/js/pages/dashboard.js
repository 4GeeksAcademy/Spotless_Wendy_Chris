import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import rigoImage from "../../img/how-to.png";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";


export const Dashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);

    const navigate = useNavigate();
    const [listingNote, setListingNote] = useState('');
    const [listingDate, setListingDate] = useState('');
    const [listingId, setListingId] = useState(null);
    const [dateN, setDateN] = useState('');


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
  console.log('this function was called')
  const dialog = document.getElementById('modal_dialog');
  dialog.showModal();
  setListingId(id_of_property);
}


function close_modal_function(){
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
console.log('THis our test : '+date_needed)
setListingDate(date_needed);

}

function save_modal_function(id){

  if( listingDate.length>5){

 
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
  else{
    const dialog = document.getElementById('modal');
   dialog.close();
  }
}



	return (
    <div> 
      <div className="add_property_class_div">
      <button class="button-24" role="button" onClick={()=>navigate("/")}>Add New Property</button>
      </div>

      
<div class="product-list-container">

        {myProperties.map((element) =>

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
      <button class="button-24" role="button" onClick={()=>pop_modal_function(element.id)}>Add to Listing</button>
      <button className="btn" onClick={() =>delete_property(element.id)}> 
               <i className="fas fa-trash-alt fa-bounce fa-xl" />
                   </button> 
      </div>
   
  </div>
</div>

        )}


</div>


<dialog id="modal_dialog"  class="card-body border-light rounded"> 
            <div class="row gx-3 mb-3">

            <div class="col-2 d-flex align-items-center">
                    <label class="medium mb-1" for="inputdate">Date</label>
                   </div>
                <div class="col-3">
                 
                
                     {/* <input class="form-control" id="inputdate" type="text" onChange={(e) => { get_date_needed_function(e) }} placeholder="Enter your first name" value={listingDate} /> */}

                     <input type="date" name="dateofbirth" id="dateofbirth" onChange={(e) => { get_date_needed_function(e)}}/>


                </div>


            </div>

            <div className="row mb-3">
            <div class="col-2 d-flex align-items-center">
            <label class="medium mb-1" for="inputnote">Note</label>
                   </div>
            
            <div class="col-5">
                
                <textarea class="form-control" id="inputnote" type="email" onChange={(e) => { get_specialNote_function(e) }} placeholder="Enter your note" value={listingNote}  textarea/>
            </div>
            <div class="col"> </div>
            </div>

            <div className="row mb-3">
            <div class="col d-flex align-items-center">
            <button className="btn btn-secondary text-md" onClick={()=>close_modal_function()}>Close</button>
           
                   </div>
                   <div className="col"></div>
            
            <div class="col">
            <button className="button-24" onClick={()=>save_modal_function()}>Save </button> 
                </div>
            </div>
            


</dialog>
</div>
	);
};









