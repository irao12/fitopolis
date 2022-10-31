import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/HomePage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/">
						<Route index element={<HomePage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
