import "./FriendsTab.css";
import { useState } from "react";

export function FriendsTab({ isOpen, onClose}){
    const[activeSection, setActiveSection]= useState(null);
    if (!isOpen){
        return null;
    }
    async function handleAddFriendsClick(){
    }
    async function handleFriendsClick(){

    }
    return (
        <div className="friends-overlay">
            <div className="overlay-Bg">
                <div className="friends-container">
                    <div className="friends-header">
                        <h2>Questers</h2>  
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                    <div className="friends-search-field">
                        <form>
                            <label htmlFor="search" className="friend-search"/>
                            <input
                                type="text"
                                id="search"
                                name="friend-search"
                                placeholder="Discover other questers"
                            />
                        </form>
                    </div>
                    <div className="friend-nav">
                        <div>
                            <button
                                className="addFriends"
                                type="button" 
                                onClick={() => setActiveSection("add")}>
                                Add Questers
                            </button>
                        </div>

                        <div>
                            <button onClick={ () => setActiveSection("friends") }>
                                Fellow Questers
                            </button>
                        </div>
                    </div>
                    <hr className="custom-line"/>
                    <div className="buttons">
                            {activeSection === "add" && <p>Search for Questers.</p>}
                            {activeSection === "friends" && <p>Your fellow Questers will appear here.</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendsTab; 