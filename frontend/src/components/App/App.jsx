import React, { useEffect } from 'react';
import logo from '../../assets/logo.svg';
import './App.scss';
import { initializeApp } from '../../lib/Firebase';

const App = () => {
  useEffect(() => {
    // Initialize the firebase app
    initializeApp();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/components/App/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
