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

    fetch(process.env.BACKEND_URL + "api/worker/listing/all2")
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





function accept_gig_function(id){
  let new_schedule= {listing_id: listingId, worker_id:1};
fetch(process.env.BACKEND_URL + "/api/worker/schedule/new",
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
    <div className="block"> 
      <div className="add_property_class_div">
      <button class="button-24" role="button" onClick={()=>navigate("/")}>See my schedule</button>
      </div>

      
<div class="row style-alt">
			<div class="col-sm-6 col-md-4">
				<div class="widget">
					<div class="widget-simple">
						<a href="#">
							<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" class="widget-image img-circle pull-left animation-fadeIn"/>
						</a>
						<h4 class="widget-content text-right">
							<a href="#"><strong>Name</strong></a><br/>
							<span class="btn-group">
								<a href="javascript:void(0)" class="btn btn-xs btn-default" data-toggle="tooltip" title="" data-original-title="Category">Follow</a>
								<a href="javascript:void(0)" class="btn btn-xs btn-primary" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fa fa-pencil"></i></a>
							</span>
						</h4>
					</div>
				</div>
			</div>
      </div>


         
<div class="row style-alt">
			<div class="col-sm-6 col-md-4">
				<div class="widget">
					<div class="widget-simple">
						<a href="#">
							<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" class="widget-image img-circle pull-left animation-fadeIn"/>
						</a>
						<h4 class="widget-content text-right">
							<a href="#"><strong>Name</strong></a><br/>
							<span class="btn-group">
								<a href="javascript:void(0)" class="btn btn-xs btn-default" data-toggle="tooltip" title="" data-original-title="Category">Follow</a>
								<a href="javascript:void(0)" class="btn btn-xs btn-primary" data-toggle="tooltip" title="" data-original-title="Edit"><i class="fa fa-pencil"></i></a>
							</span>
						</h4>
					</div>
				</div>
			</div>
      </div>


</div>
	);
};









