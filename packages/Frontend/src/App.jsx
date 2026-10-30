import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestMap from "./components/QuestMap.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import SignUp from "./components/SignUp";
import { getQuests } from "./services/questService";
import LogIn from "./components/LogIn";
import UserProfile from "./components/UserProfile"; 

// chooses and arranges the current page
function App() {
const [quests, setQuests] = useState([]);

   useEffect(() => {
    getQuests()
    .then((data) => setQuests(data))
    .catch((error) => console.error("Error fetching quests:", error.message));
  }, []);


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
    <Route path="/login" element={<LogIn />} />
	      </Routes>
	   </BrowserRouter>
	);
}

export default App; 
