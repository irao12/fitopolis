import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UploadListing from "./pages/UploadListing";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/">
						<Route index element={<HomePage />}></Route>
						<Route path="login" element={<LoginPage />}></Route>
						<Route path="signup" element={<SignUpPage />}></Route>
						<Route
							path="create-listing"
							element={<UploadListing />}
						></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
