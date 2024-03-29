

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>test Login!!</h1>
            <input placeholder="Username"/>
            <input placeholder="Password"/>
		
		</div>
	);
};
