import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './app/ErrorBoundary';
import LoadingScreen from './shared/components/LoadingScreen';

// Lazy-loaded routes for code splitting
const Home = lazy(() => import('./features/landing/LandingPage'));
const About = lazy(() => import('./features/about/AboutPage'));
const AboutElc = lazy(() => import('./features/about-elc/AboutElcPage'));
const Dashboard = lazy(() => import('./features/dashboard/DashboardPage'));
const Faculty = lazy(() => import('./features/faculty/FacultyPage'));

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen message="LOADING CAMPUS VERSE..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-elc" element={<AboutElc />} />
            <Route path="/elc" element={<AboutElc />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faculty" element={<Faculty />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
