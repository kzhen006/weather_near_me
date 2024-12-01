import logo from './logo.svg';
import './App.css';
import NavScrollExample from './NavScrollExample';
import ThemeToggle from './ThemeToggle';

function App() {
  return (
    <div className="App">

     {/* Bootstrap Navbar */}
     <NavScrollExample />

    {/* Bootstrap Toggle */}  
     <ThemeToggle />
      
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Welcome to the Weather Near Me App!</h1>
        <p>This is the main content area.</p>
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
