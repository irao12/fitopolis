import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
	const auth = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Navigate
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}
