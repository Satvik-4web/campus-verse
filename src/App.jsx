import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Faculty from './pages/Faculty';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
