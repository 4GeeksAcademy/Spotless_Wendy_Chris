import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const WDashboard = () => {
  const { currentUser, myListings, setMyListings } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "api/worker/listing/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        let formattedListings = response.map(listing => ({
          ...listing,
          image1: listing.img.split(" ")[0]
        }));
        setMyListings(formattedListings);
      })
      .catch(error => console.log(error));
  }, []);

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
        <button className="test button-24" onClick={() => navigate("/")}>My Schedule</button>
      </div>
      <div className="dropdown mb-3">
        <button className="btn btn-secondary mb-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
          <i className="fas fa-sliders-alt fa-2x"></i>
        </button>
        <ul className="dropdown-menu text-lg" aria-labelledby="dropdownMenuButton">
          <li><span className="dropdown-item" onClick={(e) => filterListingFunction(e)}>City (A-Z)</span></li>
          <li><span className="dropdown-item" onClick={(e) => filterListingFunction(e)}>Price: (High to Low)</span></li>
          { }
        </ul>
      </div>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
