import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { StaticRating } from "../component/staticrating";

export const WHistory = () => {

  const { store, actions } = useContext(Context);

  const { currentUser, myProperties, setMyProperties, workerListings, setWorkerListings, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole } = useContext(AppContext);
  const navigate = useNavigate();
  const [myWHistory, setMyWHistory] = useState([]);


  useEffect(() => {
    let worker_id = currentUser.id;

    fetch(process.env.BACKEND_URL + "api/worker/" + worker_id + "/schedule/history")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log('this is the history we got for this worker : ')
        console.log(response)
        setMyWHistory(response);

      })

      .catch(error => console.log(error));

  }, []);


  const sortDate = (a, b) => {
    let dateA = a.date_needed.toUpperCase();
    let dateB = b.date_needed.toUpperCase();
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;
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
      
      let test = [...workerListings];
      let final = test.toSorted(sortDate);
      setWorkerListings(final);
    }

  }





  return (
    <div>

      <div className="add_property_class_div">
        <button className="test button-24" onClick={() => navigate("/schedule")}>Schedule</button>
      </div>

      <div>
        <div className="d-flex justify-content-center">
          <h3>Activity</h3>
        </div>

        <ul>

          {myWHistory.map((element) =>

            <li>

              <div className="listing_div">

                <div className=" d-flex  justify-content-between pt-2 ">

                  <div className="city_address_div mx-4  ">
                    <h4>{element.city}</h4>
                    <span> {element.address}</span>
                  </div>

                  <div className="date_div mx-4 pr-4 ">
                    <span>{element.date_needed}</span>
                  </div>

                  <div className="note_rate_div mx-4 pr-2">
                    <span>Recieved : {element.rate}$</span>
                  </div>

                  <div className="d-flex align-items-center mx-4">
                    <span>Status: Completed</span>
                  </div>
                  <div className="row">
                    <div className="col">
                      <StaticRating
                        ratingValue={element.review}
                      /></div>
                  </div>

                </div>


              </div>


            </li>
          )}

        </ul>

      </div>

    </div>
  );
};









