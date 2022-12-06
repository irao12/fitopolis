import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);

	useEffect(() => {
		fetch("/api/auth/login")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unauthenticated");
				}

				return response.json();
			})
			.then((body) => setUser(body))
			.catch((error) => setUser(false));
	}, []);

	const authenticate = (email, password) => {
		return fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Login Failed");
				}

				return response.json();
			})
			.then((body) => {
				setUser(body);
				return body;
			});
	};

	const signout = () => {
		return fetch("api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.log(response);
					throw new Error("Logout Failed");
				}

				return response.json();
			})
			.then((body) => {
				setUser(false);
				return body;
			});
	};

	return (
		<Provider
			value={{
				authenticate,
				signout,
				user,
				isAuthenticated: user ? true : false,
			}}
		>
			{children}
		</Provider>
	);
};

//Create our own hook for accessing the context from any functional component
function useAuth() {
	return React.useContext(AuthContext);
}

export { AuthContext, AuthProvider };
