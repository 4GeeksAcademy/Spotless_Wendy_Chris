import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";


export const History = () => {

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
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src=".../100px180/?text=Image cap" alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>


            <button className="mb-3 button-24 mt-1"
                type="submit" onClick={(event) => {
                    event.preventDefault();
                    handleSave()
                    setDisplayAddProperty(!displayAddProperty)
                }} >Save New Property</button>

        </div>


    );
};