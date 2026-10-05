import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import "./App.css";

function App() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    async function getQuests() {
      const { data, error } = await supabase
        .from("quests")
        .select("*");

      if (error) {
        console.error("Error getting quests:", error);
      } else {
        console.log("Quests:", data);
        setQuests(data);
      }
    }

    getQuests();
  }, []);

  return (
    <div>
      <h1>SLAP</h1>
      <p>Supabase connection test</p>
      <p>Number of quests: {quests.length}</p>
    </div>
  );
}

export default App;
