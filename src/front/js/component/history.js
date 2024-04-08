import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";


export const History = () => {

    const { currentUser, setMyProperties } = useContext(AppContext);

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState("")
    const [img, setImg] = useState("")

    const handleSave = () => {
        setIsLoading(true);
        var list = {
            "id": currentUser.id,
            "property_id": self.property_id,
            "date_needed": self.date_needed,
            "special_note": self.special_note,
            
        }

        const allListings = [...listings];

        fetch(process.env.BACKEND_URL + '/user/property/listing/new', {
            method: 'POST',
            body: JSON.stringify(allListings),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) console.log(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                console.log("This is the backend response");
                console.log(responseAsJson);
                setMyProperties(responseAsJson); // Assuming the response contains all properties after saving
            })
            .catch(error => console.error(error))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (

        <div>
            <button
                className="mb-3 button-24 mt-1"
                type="button"
                onClick={handleSave}
                disabled={isLoading || listings.length === 0}
            >
                {isLoading ? "Saving..." : "refresh"}
            </button>
            {listings.map((listing, index) => (
                <div key={index} className="card mb-3" style={{ width: '18rem' }}>
                    
                    <img className="card-img-top" src={listing.img} alt="Property Image" />

                    
                    <div className="card-body">
                        
                        <h5 className="card-title">{listing.name}</h5>

                       
                        <p className="card-text">Address: {listing.address}</p>
                        <p className="card-text">Date: {listing.date}</p>
                    </div>

                    
                    <div className="card-body">
                       
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            ))}



        </div >


    );
};