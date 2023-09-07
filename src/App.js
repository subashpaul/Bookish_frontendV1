import React, { useState } from 'react'
// import About from './components/About';
import Home from './components/Home';

import Navbar from './components/Navbar';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteState from './Context/notes/noteState';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <div style={{ height: "3rem" }}>
            <Alert alert={alert} />
          </div>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              {/* <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showAlert={showAlert} />} />
              <Route exact path='/signup' element={<Signup showAlert={showAlert} />} /> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
