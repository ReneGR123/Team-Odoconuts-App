import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestMap from "./components/homepage/QuestMap.jsx";
import TopBar from "./components/homepage/TopBar";
import SideBar from "./components/homepage/SideBar";
import SignUp from "./components/userauth/SignUp";
import LogIn from "./components/userauth/LogIn";
import UserProfile from "./components/profile/UserProfile";
import Settings from "./components/profile/Settings"; 


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
		<Route path="/profile" element={<UserProfile />} /> 
		<Route path="/settings" element={<Settings />} />
    <Route path="/login" element={<LogIn />} />
	      </Routes>
	   </BrowserRouter>
	);
}

export default App; 
