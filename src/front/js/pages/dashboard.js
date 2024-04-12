import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import rigoImage from "../../img/how-to.png";
import "../../styles/home.css";
import { AppContext } from "../layout";
import { Link, useNavigate } from "react-router-dom";


export const Dashboard = () => {

  const { store, actions } = useContext(Context);
  const { currentUser, myProperties, setMyProperties, setCurrentUser, token, setToken,
    role, setRole, setMyListings, setMenu, setFilterListings
  } = useContext(AppContext);


  const navigate = useNavigate();
  const [listingNote, setListingNote] = useState('');
  const [listingDate, setListingDate] = useState('');
  const [listingId, setListingId] = useState({});
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

          each_property = { ...el };
          each_property.image1 = all_img[0];
          each_property.image2 = all_img[1];
          each_property.image3 = all_img[2];
          finalProperty.push(each_property);

        })
        setMyProperties(finalProperty);
      })

      .catch(error => console.log(error));

  }, []);






  const ComparedDate = () => {
    const today = new Date()
    if (listingDate <= today) { //first date is in future, or it is today
      return false
    }

    return true
  }

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
          let all_img = el.img.split("  ");
          each_property = el;
          each_property.image1 = all_img[0];
          each_property.image2 = all_img[1];
          each_property.image3 = all_img[2];
          finalProperty.push(each_property);


        })
        setMyProperties(finalProperty);
      })

      .catch(error => console.log(error));
  }


  function pop_modal_function(property_obj) {

    const dialog = document.getElementById('modal_dialog');
    dialog.showModal();
    setListingId(property_obj);
  }

  function close_modal_function() {
    const dialog = document.getElementById('modal_dialog');
    setListingDate('');
    setListingNote('');
    setListingId({});
    dialog.close();
  }


  function save_modal_function(id) {

    let format_date = listingDate.replace("T", " ");
    let today = new Date();
    console.log("check today :" + today)
    console.log("check if the date was formatted :" + format_date)

    let test = ComparedDate();
    console.log('Check if the date is in the past : ' + test);


    if (listingDate.length > 5) {

      let price_for_listing = (listingId.bath * 15) + (listingId.beds * 10);
      let new_listing = { property_id: listingId.id, special_note: listingNote, date_needed: listingDate, rate: price_for_listing, user_id: currentUser.id };

      var fetchedListings = []

      fetch(process.env.BACKEND_URL + "/api/user/property/listing/new",
        {
          method: 'POST',
          body: JSON.stringify(new_listing),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (!res.ok) console.log(res.statusText);
          return res.json();
        })
        .then(responseAsJson => {
          console.log('Success:', responseAsJson),
            responseAsJson.map((elm) => fetchedListings.push(elm))
        }
        )
        .then(() => setMyListings(fetchedListings))
        .then(() => {
          setMenu("listings")
          setFilterListings("Active")
        }
        )

        .catch(error => console.log(error));
      setListingDate('');
      setListingNote('');
      const dialog = document.getElementById('modal_dialog');
      dialog.close();

    }
    else {
      const dialog = document.getElementById('modal_dialog');
      dialog.close();
    }

  }

  return (

    <div>

      <div class="product-list-container">

        {myProperties.map((element, index) =>

          <div class="card text-secondary" style={{ width: "18rem" }} key={element.id}>

            <div id="slideshow">
              <div className="jump_div">
                <Link to={`/demo`} state={element}>

                  <span><i class="fa-solid fa-arrow-up-right-from-square fa-fade fa-xl"></i></span>
                </Link>
              </div>

              <div class="slide-wrapper">
                <div class="slide"><img src={element.image1} class="slide-number w-100" /></div>
                <div class="slide"><img src={element.image2} class="slide-number w-100" /></div>
                <div class="slide"><img src={element.image3} class="slide-number w-100" /></div>
                <div class="slide"><img src={element.image1} class="slide-number w-100" /></div>
              </div>
            </div>

            <div class="card-body">
              <h5 class="card-title">{element.name}</h5>
              <p class="card-text">Address: {element.address}<br />
                City: {element.city}</p>
              <div className="d-flex justify-content-between">
                <button class="button-24" role="button" onClick={() => pop_modal_function(element)}>Add to Listing</button>
                <button className="btn" onClick={() => delete_property(element.id)}>
                  <i className="fas fa-trash-alt fa-bounce fa-xl" />
                </button>
              </div>

            </div>
          </div>

        )}


      </div>


      <dialog id="modal_dialog" class=" rounded">

        <div class="row gx-3 mb-3">
          <div class="col-2 d-flex align-items-center">
            <label class="medium mb-1" for="inputdate">Date</label>
          </div>

          <div class="col-10">
            <input type="datetime-local" value={listingDate} id="Test_DatetimeLocal" onChange={(e) => { setListingDate(e.target.value) }} />
          </div>

        </div>

        <div className="row mb-3">

          <div class="col-2 d-flex align-items-center">
            <label class="medium mb-1" for="inputnote">Note</label>
          </div>

          <div class="col-10">

            <textarea class="form-control" id="inputnote" type="text" onChange={(e) => { setListingNote(e.target.value) }} placeholder="Enter your note" value={listingNote} />
          </div>

        </div>

        <div className="row mb-3">
          <div class="col d-flex align-items-center">
            <button className="btn btn-secondary text-md" onClick={() => close_modal_function()}>Close</button>

          </div>
          <div className="col"></div>

          <div class="col">
            <button className="button-24" onClick={() => save_modal_function()}>Save </button>
          </div>
        </div>

      </dialog>


    </div>

  );
};
