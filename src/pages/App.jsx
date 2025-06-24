// src/pages/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RafflePage from './RafflePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/raffle" element={<RafflePage />} />
        <Route
          path="*"
          element={
            <div style={{
              backgroundColor: 'black',
              color: 'white',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h1 style={{ fontSize: '2rem', color: '#3b82f6' }}>👋 Welcome to MycoMystic</h1>
              <p>Visit <code>/raffle</code> to check your NFT eligibility.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
