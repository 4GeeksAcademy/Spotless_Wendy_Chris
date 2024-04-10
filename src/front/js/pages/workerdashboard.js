import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const WDashboard = () => {
<<<<<<< HEAD
  const { currentUser, myListings, setMyListings } = useContext(AppContext);
=======

  const { store, actions } = useContext(Context);

  const { currentUser, myProperties, setMyProperties, workerListings, setWorkerListings, setCurrentUser, token, setToken, role, setRole,
    display, setDisplay, menu, setMenu

  } = useContext(AppContext);
>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
<<<<<<< HEAD
        let formattedListings = response.map(listing => ({
          ...listing,
          image1: listing.img.split(" ")[0]
        }));
        setMyListings(formattedListings);
=======

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

>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
      })
      .catch(error => console.log(error));
  }, []);

<<<<<<< HEAD
  function acceptOfferFunction(id) {
    let newSchedule = { listing_id: id, worker_id: currentUser.id };
    fetch(process.env.BACKEND_URL + "/api/worker/schedule/new", {
      method: 'POST',
      body: JSON.stringify(newSchedule),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) console.log(res.statusText);
        return res.json();
=======
  const sortCity = (a, b) => {
    let cityA = a.city.toUpperCase();
    let cityB = b.city.toUpperCase();
    if (cityA < cityB) return -1;
    if (cityA > cityB) return 1;
  }

  const sortPrice = (a, b) => b.rate - a.rate;

  function filter_listing_function(val) {

    let which_filter = val.currentTarget.innerText;
    if (which_filter == 'City (A-Z)') {
      let test = [...workerListings];
      let final = test.toSorted(sortCity);
      setWorkerListings(final);

    }
    else if (which_filter == 'Price: (High to Low)') {
      let test = [...workerListings];
      let final = test.toSorted(sortPrice);
      setWorkerListings(final);
    }
    else {
      console.log('Nothing to do yet')

    }

  }



  function accept_offer_function(id) {
    let new_schedule = { listing_id: id, worker_id: currentUser.id };
    console.log('Accept offer function was called');
    fetch(process.env.BACKEND_URL + "/api/worker/schedule/new",
      {
        method: 'POST',
        body: JSON.stringify(new_schedule),
        headers: {
          'Content-Type': 'application/json'
        }
>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  function completeJob(id) {
    fetch(process.env.BACKEND_URL + `/api/worker/job/complete/${id}`, {
      method: 'POST',
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
        fetch(process.env.BACKEND_URL + "api/worker/listing/all")
          .then(res => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then(response => {
            setMyListings(response);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }

  function filterListingFunction(val) {
    let whichFilter = val.currentTarget.innerText;
    if (whichFilter === 'City (A-Z)') {
      let sortedListings = [...myListings].sort((a, b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0));
      setMyListings(sortedListings);
    } else if (whichFilter === 'Price: (High to Low)') {
      let sortedListings = [...myListings].sort((a, b) => b.rate - a.rate);
      setMyListings(sortedListings);
    }
  }

  return (
    <div>
      <div className="add_property_class_div">
<<<<<<< HEAD
        <button className="test button-24" onClick={() => navigate("/")}>My Schedule</button>
      </div>
      <div className="dropdown mb-3">
        <button className="btn btn-secondary mb-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-sliders-alt fa-2x"></i>
=======
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
>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
        </button>
        <ul className="dropdown-menu text-lg" aria-labelledby="dropdownMenuButton">
          <li><span className="dropdown-item" onClick={(e) => filterListingFunction(e)}>City (A-Z)</span></li>
          <li><span className="dropdown-item" onClick={(e) => filterListingFunction(e)}>Price: (High to Low)</span></li>
          { }
        </ul>
      </div>
<<<<<<< HEAD
=======

>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
      <div>
        <ul>
          {myListings.map((element) => (
            <li key={element.id}>
              <div className="listing_div">
                <div className="d-flex justify-content-between">
                  <img src={element.image1} className="img_listing" alt={element.city} />
                  <div className="city_address_div mx-2 mr-2 pt-2">
                    <h4>{element.city}</h4>
                    <span>{element.address}</span>
                  </div>
                  <div className="mx-4 mr-4">
                    <span>{element.date_needed}</span>
                  </div>
                  <div className="mx-4 mr-4">
                    <span>Quote: {element.rate}$</span>
                  </div>
                </div>
                <div className="accept_div">
                  <button className="test" onClick={() => acceptOfferFunction(element.id)}>Accept</button>
                  <button className="test" onClick={() => completeJob(element.id)}>Complete Job</button>
                </div>
              </div>
<<<<<<< HEAD
=======

>>>>>>> 21c85593a37dba67a99e220d99a9bed3f3039673
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
