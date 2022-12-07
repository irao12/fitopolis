import React, { useContext } from "react";
import NoAuthenticationPage from "../pages/NoAuthenticationPage";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
	const auth = useContext(AuthContext);
	if (!auth.isAuthenticated) {
		return <NoAuthenticationPage />;
	}

	return children;
}
