import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export const AddListing = () => {
	const { store, actions } = useContext(Context);
	const [testApi, setTestApi] = useState([]);
    const [listingNote, setListingNote] = useState('');
    const [listingDate, setListingDate] = useState('');
	


	useEffect(() => {

	}, []);

	function add_listing_function() {
let listing= [{special_note:listingNote, Date_needed: listingDate}]
        fetch(process.env.BACKEND_URL + "/api/listing/new/load",
        {
            method: 'POST',
            body: JSON.stringify(listing) ,
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


    function pop_modal_function(){
        console.log('Function was called');
        const dialog = document.getElementById('modal');
       
        dialog.showModal();
    }

    
    function close_modal_function(){
        console.log('Close Function was called');
        const dialog = document.getElementById('modal');
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
       alert('this function was called')
       let new_listing= {property_id: id,date_needed: listingDate , status: true};
       
		fetch(process.env.BACKEND_URL + "/user/property/listing/new",
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

        const dialog = document.getElementById('modal');
        dialog.close();
    }
	
	return (

<div className="container">



<dialog id="modal" className="container container-sm"> 


<form>
  <div className="form-group ">
    <label for="exampleFormControlInput1">Date needed</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" value={listingDate} placeholder="Date needed" onChange={(e)=>get_date_needed_function(e)}/>
  </div>
  
 
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Example textarea</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={listingNote} onChange={(e)=>get_specialNote_function(e)}></textarea>
  </div>
</form>


  <button className="btn btn-secondary" onClick={()=>close_modal_function()}>Close</button>
  <button className="button-24" onClick={()=>save_modal_function()}>Save </button>
</dialog>
    
	<button type="button" className="btn btn-success " onClick={()=>pop_modal_function()}>Pop modal</button>



<Link to='/'>
	<button type="button" className="btn btn-secondary">Home</button>
</Link>


		</div>


	);
};
