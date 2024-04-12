import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/wdashboard.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";

export const WSchedule = () => {

  const { store, actions } = useContext(Context);

  const { currentUser, myProperties, setMyProperties, workerListings, setWorkerListings, myListings, setMyListings, setCurrentUser, token, setToken, role, setRole,
    display, setDisplay, menu, setMenu
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [mySchedule, setMySchedule] = useState([]);


  useEffect(() => {

    fetch(process.env.BACKEND_URL + "api/worker/" + currentUser.id + "/schedule/all")
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => {
        console.log('this is the  schedule we got')
        console.log(response)

        setMySchedule(response);

      })

      .catch(error => console.log(error));

  }, []);


  function cancel_schedule_function(schedule_id, listing_id) {
    fetch(process.env.BACKEND_URL + "api/worker/schedule/" + schedule_id + "/cancel/" + listing_id,
      {
        method: 'PUT'
      })
      .then(res => {
        if (!res.ok) console.log(res.statusText);
        return res.json();
      })
      .then(response => {
        let test = mySchedule.filter((el) => el.id != schedule_id);
        setMySchedule(test);

      })

      .catch(error => console.log(error));

  }

  function complete_schedule_function(schedule_id, listing_id) {
    fetch(process.env.BACKEND_URL + "api/worker/schedule/" + schedule_id + "/complete/" + listing_id,
      {
        method: 'PUT'
      })
      .then(res => {
        if (!res.ok) console.log(res.statusText);
        return res.json();
      })
      .then(response => {
        let test = mySchedule.filter((el) => el.id != schedule_id);
        setMySchedule(test);

      })

      .catch(error => console.log(error));

  }


  return (
    <div>
      <div>

        <ul>
          {mySchedule.map((element) =>

            <li>

              <div className="listing_div">

                <div className="d-flex  justify-content-between ">

                  <div className="city_address_div mx-2 mr-2 pt-2 ">
                    <h4>{element.city}</h4>
                    <span> {element.address}</span>
                  </div>

                  <div className="mx-4 mr-4 ">
                    <span>{element.date_needed}</span>
                  </div>
                  <div className="mx-4 mr-4 ">
                    <span>{element.special_note}</span>
                  </div>

                  <div className="mx-4 mr-4">
                    <span>Quote : {element.rate}$</span>
                  </div>

                </div>

                <div className="accept_div">
                <button className="test" onClick={() => complete_schedule_function(element.id, element.listing_id)}>Complete</button>
                  <button className="test" onClick={() => cancel_schedule_function(element.id, element.listing_id)}>Cancel</button>
                </div>

              </div>

            </li>
          )}

        </ul>

      </div>

    </div>
  );
};









