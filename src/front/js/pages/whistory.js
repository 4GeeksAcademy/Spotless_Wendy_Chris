import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { StaticRating } from "../component/staticrating";
import { HHistory } from "../component/hhistory";

export const WHistory = () => {

  const { store, actions } = useContext(Context);

  const { currentUser, myProperties, setMyProperties, workerListings, setWorkerListings, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole, myWHistory, setMyWHistory } = useContext(AppContext);
  const navigate = useNavigate();



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

  const sortReview = (a, b) => b.review - a.review;

  function filter_listing_function(val) {


    if (val == 1) {
      let test = [...myWHistory];
      let final = test.toSorted(sortDate);
      setMyWHistory(final);

    }
    else {

      let test = [...myWHistory];
      let final = test.toSorted(sortReview);
      setMyWHistory(final);
    }


  }





  return (
    <div>
      <div>
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
          <ul className="dropdown-menu text-lg" aria-labelledby="dropdownMenuButton">
            <li><span className="dropdown-item " onClick={() => filter_listing_function(1)}>By date</span></li>
            <li><span className="dropdown-item" onClick={() => filter_listing_function(2)}>By review</span></li>
          </ul>
        </div>


        <ul>

          {myWHistory.map((element, index) =>

            <li key={index}>

              <div className="history_div">

                <div className=" d-flex  justify-content-between pt-2 ">

                  <div className="px-4  ">
                    <h4>{element.city}</h4>
                    <span> {element.address}</span>
                  </div>

                  <div className="px-4">
                    <span>{element.date_needed}</span>
                  </div>

                  <div className="px-4">
                    <span>Recieved : {element.rate}$</span>
                  </div>
                  <div className="row">
                    <div className="col px-4">
                      {element.review > 0 ?
                        <StaticRating
                          rating={element.review} />
                        :
                        <span className="ms-3">Not Reviewed Yet</span>
                      }
                    </div>
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









