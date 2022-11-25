import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UploadListing from "./pages/UploadListing";
import CatalogPage from "./pages/CatalogPage";
import NotFound from "./pages/NotFound";

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
						<Route path="catalog" element={<CatalogPage />}>
							{/* <Route path="/:id"></Route> */}
						</Route>
						<Route path="*" element={<NotFound />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
