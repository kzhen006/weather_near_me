import logo from './logo.svg';
import React from 'react';
import Weather from './Weather'; // importing the Weather component
import './App.css';
import NavScrollExample from './NavScrollExample';

function App() {
  return (
    <div className="App">
      <div className="App">
      
      </div>

     {/* Bootstrap Navbar */}
     <NavScrollExample />
      
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <h1>Welcome to the Weather Near Me App!</h1>
        <p>This is the main content area.</p> */}
        <Weather />  {/* Render the Weather component */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>

      

      {/* Footer */}
      <footer className="App-footer">
        <p>&copy; Weather Near Me 2024. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
