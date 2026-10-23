import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestMap from "./components/QuestMap.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import SignUp from "./components/SignUp";

// chooses and arranges the current page
function App() {
	return (
	  <BrowserRouter> 
	     <Routes>
		<Route
		  path="/"
		  element={
		    <div className="home-page">
			<QuestMap />
			<TopBar />
			<SideBar />
		    </div>
		  }
		/>

		<Route path="/signup" element={<SignUp />} />
	      </Routes>
	   </BrowserRouter>
	);
}

export default App; 
