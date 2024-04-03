import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";


export const AddProperty = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [state, setState] = useState("")
    const [img, setImg] = useState("")
    const [bath, setBATH] = useState("")
    const [bed, setBed] = useState("")
    const [address, setAddress] = useState("")
    const [Listing, setListing] = useState("")
    const [city, setCity] = useState("")
    const { contacts, setcontacts } = useContext(AppContext);
    const { store, actions } = useContext(Context);


    const handleSave = () => {
        var newContact = {
            "User Link": "",
            "Name": name,
            "State": state,
            "city": city,
            "bed": bed,
            "bath": bath,
            "img": img,
            "Address": address,
            "Listing": Listing


        }
        fetch('', {
            method: 'POST',
            body: JSON.stringify(newContact), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.JSON)
            .then(data => fetchMethod())
            .catch(error => console.error(error));
    }

    return (
        <div className="container">
            <div>
                <h1 className="text-center mt-5">Add a new property</h1>
                <form>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Full Name" />
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" onChange={(e) => setState(e.target.value)} placeholder="state" />
                    </div>
                    <div className="form-group">
                        <label>city</label>
                        <input type="phone" className="form-control" onChange={(e) => setCity(e.target.value)} placeholder="Enter phone" />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                    </div>
                    <div className="form-group">
                        <label>Beds</label>
                        <input type="text" className="form-control" onChange={(e) => setBed(e.target.value)} placeholder="Enter how many beds" />
                    </div>
                    <div className="form-group">
                        <label>Baths</label>
                        <input type="text" className="form-control" onChange={(e) => setBATH(e.target.value)} placeholder="Enter how many beds" />
                    </div>
                    <div className="form-group">
                        <label>Upload pictures</label>
                        <input type="text" className="form-control" onChange={(e) => setImg(e.target.value)} placeholder="upload pictures" />
                    </div>
                    <button type="button" className="btn btn-primary form-control" onClick={handleSave}>
                        save
                    </button>
                    <Link className="mt-3 w-100 text-center" to="/landing">
                        or get back to landing
                    </Link>
                </form>
            </div>
        </div>
    );
};