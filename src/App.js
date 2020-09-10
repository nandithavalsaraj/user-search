import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><i>Search the Repo!</i></h1>
      </header>
      <div className="Search-bar-container">
        <input className="Search-bar" placeholder="Enter user info" width="300px"></input> 
      </div>
      <div className="Search-result-container">
      </div>
    </div>
  );
}

export default App;
