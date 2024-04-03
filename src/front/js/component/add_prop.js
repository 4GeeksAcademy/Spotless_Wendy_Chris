import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";


export const AddProperty = () => {

    const { currentUser, setCurrentUser, role, setRole, myProperties, setMyProperties,
        displayAddProperty, setDisplayAddProperty
    } = useContext(AppContext);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [state, setState] = useState("")
    const [img, setImg] = useState("")
    const [bath, setBath] = useState(0)
    const [beds, setBeds] = useState(0)
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const { contacts, setcontacts } = useContext(AppContext);
    const { store, actions } = useContext(Context);

    const handleSave = () => {
        var newProp = {
            "user_id": currentUser.id,
            "name": name,
            "state": state,
            "city": city,
            "beds": beds,
            "bath": bath,
            "img": img,
            "address": address,
        }

        fetch(process.env.BACKEND_URL + "api/property/new/load", {
            method: 'POST',
            body: JSON.stringify(newProp), // data can be a 'string' or an {object} which comes from somewhere further above in our application
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) console.log(res.statusText);
                return res.json();
            })
            .then(responseAsJson => {
                console.log("This is the backend response"),
                    console.log(responseAsJson)

                let newArray = [...responseAsJson];
                let finalProperty = [];

                newArray.forEach((el) => {
                    let each_property = {};
                    let all_img = el.img.split("  ");
                    // console.log(all_img)
                    each_property = el;
                    each_property.image1 = all_img[0];
                    each_property.image2 = all_img[1];
                    each_property.image3 = all_img[2];
                    finalProperty.push(each_property);
                    console.log('test begins here')
                    console.log(finalProperty);
                })
                setMyProperties(finalProperty)
            })
            .catch(error => console.error(error));
    }

    return (
        <form>
            <div className="text-secondary pt-3 my-2">
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
                        <input type="text" onChange={(e) => setBeds(e.target.value)} className="form-control" placeholder="Bed" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" onChange={(e) => setBath(e.target.value)} className="form-control" placeholder="Bath" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setImg(e.target.value)} className="form-control" placeholder="img" />
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="address" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Give your property a brief descriptive name" />
                    </div>
                </div>
            </div>
            <button className="mb-3 button-24 mt-1"
                type="submit" onClick={(event) => {
                    event.preventDefault();
                    handleSave()
                    setDisplayAddProperty(!displayAddProperty)
                }} >Save New Property</button>

        </form>


    );
};