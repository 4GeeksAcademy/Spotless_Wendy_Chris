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
    const [city, setCity] = useState("")
    const { contacts, setcontacts } = useContext(AppContext);
    const { store, actions } = useContext(Context);


    const handleSave = () => {
        var newProp = {
            "User Link": "",
            "Name": name,
            "State": state,
            "city": city,
            "beds": bed,
            "bath": bath,
            "img": img,
            "Address": address,



        }

        fetch(process.env.BACKEND_URL + "api/property/new/load", {
            method: 'POST',
            body: JSON.stringify(newProp), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.JSON)
            .then(data => fetchMethod())
            .catch(error => console.error(error));
    }

    return (
        <form>
            <div>
                <h1 className="display">Add property</h1>
                <p className="lead"></p>
                <p>Get your property cleaned hassle-free! Submit your details below and we'll pair you with the perfect house cleaner. Experience convenience like never before!</p>
                <div className="row">
                    <div className="col">
                        <input type="text" onChange={(e) => setState(e.target.value)} className="form-control" placeholder="State" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setCity(e.target.value)} className="form-control" placeholder="City" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setBed(e.target.value)} className="form-control" placeholder="Bed" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" onChange={(e) => setBATH(e.target.value)} className="form-control" placeholder="Bath" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setImg(e.target.value)} className="form-control" placeholder="img" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="address" />
                    </div>
                </div>
            </div>
            <br />
            <button type="submit" onClick={handleSave} className="btn btn-primary">save</button>

        </form>


    );
};