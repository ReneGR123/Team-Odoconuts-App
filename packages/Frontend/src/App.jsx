import QuestMap from "./components/QuestMap.jsx";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

// chooses and arranges the current page
function App() {
	return (
	   <div className="home-page">
		<QuestMap />
		<TopBar />
		<SideBar />
	   </div>
	);
}

export default App; 
