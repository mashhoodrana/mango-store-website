import React from 'react';
import Navbar from './components/Navbar'; // <-- import Navbar
import MangoTypes from './components/MangoTypes'; // <-- import MangoTypes
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Navbar /> {/* <-- include Navbar */}
      <HomePage />
      {/* Include MangoTypes component here */}
      <MangoTypes />
    </>
  );
}

export default App;
