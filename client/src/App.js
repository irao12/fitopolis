import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OrderHistory from "./pages/OrderHistory";
import UploadListing from "./pages/UploadListing";
import CatalogPage from "./pages/CatalogPage";
import ListingPage from "./pages/ListingPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { CartProvider } from "./context/CartContext";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<CartProvider>
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path="/">
								<Route index element={<HomePage />}></Route>
								<Route
									path="login"
									element={<LoginPage />}
								></Route>
								<Route
									path="signup"
									element={<SignUpPage />}
								></Route>

								<Route
									path="orders"
									element={<OrderHistory />}
								></Route>

								<Route
									path="create-listing"
									element={
										<PrivateRoute>
											<UploadListing />
										</PrivateRoute>
									}
								></Route>
								<Route
									path="catalog"
									element={<CatalogPage />}
								></Route>
								<Route
									path="catalog/:id"
									element={<ListingPage />}
								></Route>
								<Route
									path="/cart"
									element={<CartPage />}
								></Route>
								<Route path="*" element={<NotFound />}></Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</CartProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
