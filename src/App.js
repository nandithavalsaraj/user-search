import React from 'react'
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Search the Repo!</h1>
            </header>
            <div className="Search-bar-container">
                <input
                    className="Search-bar"
                    placeholder="Enter user information"
                    width="300px"
                ></input>
            </div>
            <div className="Search-result-container">
                <div className="cards">
                    <div className="display-card">
                        <div className="card-title">global-nuclear-console</div>
                        <div className="card-description">
                            global nuclear console for the destruction of world
                            using python
                        </div>
                        <div className="card-update-date">
                            Last update on date1
                        </div>
                    </div>
                    <div className="display-card">
                        <div className="card-title">
                            spontaneous-spider-analysis
                        </div>
                        <div className="card-description">
                            spontaneous analysis of spider venom using machine
                            learning
                        </div>
                        <div className="card-update-date">
                            Last update on date2
                        </div>
                    </div>
                    <div className="display-card">
                        <div className="card-title">
                            newbie-paintball-master
                        </div>
                        <div className="card-description">
                            npm is a package manager
                        </div>
                        <div className="card-update-date">
                            Last update on date3
                        </div>
                    </div>
                    <div className="display-card">
                        <div className="card-title">
                            nonviolent-pirate-monster
                        </div>
                        <div className="card-description">
                            npm is a package manager
                        </div>
                        <div className="card-update-date">
                            Last update on date4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
