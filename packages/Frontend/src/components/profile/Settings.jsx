import { ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import "./Settings.css"; 

function Settings() {
	const navigate = useNavigate(); 

	return (
	  <div className="settings-page"> 
	     <button 
		className="settings-back-button" onClick={() => navigate("/profile")}> 
	        <ArrowLeft /> 
		 Back 
	     </button> 

	     <h1>Settings</h1>
	 </div>
	); 
}

export default Settings; 
