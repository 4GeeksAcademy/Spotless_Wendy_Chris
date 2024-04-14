import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { MyListings } from "../component/mylistings";
import { Ratings } from "../component/ratings";

export const WDashboard = () => {

  const { store, actions } = useContext(Context);

  const { currentUser, myProperties, setMyProperties, workerListings, setWorkerListings, setCurrentUser, token, setToken, role, setRole,
    display, setDisplay, menu, setMenu, mySchedule, setMySchedule

  } = useContext(AppContext);
  const [eachCity, setEachCity] = useState([]);
  const navigate = useNavigate();

  // Fetch all listings for worker 
  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {

        let newArray = [...response];
        let formatted_Listing = [];

        newArray.forEach((el) => {
          let each_listing = {};
          each_listing = el;
          let all_img = el.img.split(" ");
          each_listing.image1 = all_img[0];
          formatted_Listing.push(each_listing);

        })

        setWorkerListings(formatted_Listing);
        console.log("Worker Dashboard  listing below : ")
        console.log(formatted_Listing);

      })

      .catch(error => console.log(error));


  }, []);



  const sortCity = (a, b) => {
    let cityA = a.city.toUpperCase();
    let cityB = b.city.toUpperCase();
    if (cityA < cityB) return -1;
    if (cityA > cityB) return 1;
  }

  const sortDate = (a, b) => {
    let dateA = a.date_needed.toUpperCase();
    let dateB = b.date_needed.toUpperCase();
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
  }

  const sortPrice = (a, b) => b.rate - a.rate;

  function filter_listing_function(val) {

    if (val == 1) {
      let test = [...workerListings];
      let final = test.toSorted(sortCity);
      setWorkerListings(final);

    }
    else if (val == 2) {
      let test = [...workerListings];
      let final = test.toSorted(sortPrice);
      setWorkerListings(final);
    }
    else {

      let test = [...workerListings];
      let final = test.toSorted(sortDate);
      setWorkerListings(final);
    }

  }



  function accept_offer_function(id) {
    let new_schedule = { listing_id: id, worker_id: currentUser.id };
    console.log('Accept offer function was called');
    fetch(process.env.BACKEND_URL + `/api/worker/${currentUser.id}/schedule/new`,
      {
        method: 'POST',
        body: JSON.stringify(new_schedule),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (!res.ok) console.log(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log("Successfully accepted listing, work schedule is:", response)
        setMySchedule(response.worker_schedule);
        setWorkerListings(response.available_listings)

      })

      .catch(error => console.log(error));

  }



  return (
    <div>

      <div className="go_back_div">
        <button className="test button-24"
          onClick={() => {
            setDisplay("mySchedule")
            setMenu("mySchedule")
          }}
        >My Schedule</button>
      </div>


      <div className="dropdown mb-3 text-start">
        <button
          className="btn btn-secondary mb-2 dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-sliders fa-2xl"></i>
        </button>
        <ul className="dropdown-menu text-lg" role='button' aria-labelledby="dropdownMenuButton">
          <li><span className="dropdown-item" onClick={() => filter_listing_function(1)}>City (A-Z)</span></li>
          <li><span className="dropdown-item" onClick={() => filter_listing_function(2)}>Price: (High to Low)</span></li>
          <li><span className="dropdown-item" onClick={() => filter_listing_function(3)}>Date</span></li>
          <li><span className="dropdown-item" >All cities</span></li>
        </ul>
      </div>

      <div>

        <ul>
          {workerListings.length < 1 ? <div className="mb-5">There are no Active Listings for your Search</div>

            :

            workerListings.map((element) =>

              <li key={element.id}>

                <div className="listing_div">

                  <div className="d-flex  justify-content-between ">

                    <img src={element.image1} className="img_listing" />

                    <div className="city_address_div mx-2 mr-2 pt-2 ">
                      <h4>{element.city}</h4>
                      <span> {element.address}</span>
                    </div>

                    <div className="mx-4 mr-4 ">
                      <span>{element.date_needed}</span>
                    </div>

                    <div className="mx-4 mr-4">
                      <span>Quote : {element.rate}$</span>
                    </div>

                  </div>

                  <div className="accept_div">

                    <button className="test" onClick={() => accept_offer_function(element.id)}>Accept</button>
                  </div>

                </div>

              </li>
            )
          }

        </ul>

      </div>

    </div>
  );
};









