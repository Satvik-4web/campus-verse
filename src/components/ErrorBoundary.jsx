import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service securely
    // Avoid console.error in production unless necessary, but we log here for basic tracking.
    if (process.env.NODE_ENV !== 'production') {
      console.error("Uncaught runtime error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Professional fallback UI for production WebGL/React crashes
      return (
        <div className="min-h-screen bg-[#020510] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white/[0.05] border border-white/10 p-10 rounded-[2rem] backdrop-blur-xl max-w-md w-full shadow-2xl">
            <h1 className="text-[#00d2ff] font-bold tracking-[0.2em] mb-4">SYSTEM ERROR</h1>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              We encountered an unexpected issue while loading the spatial experience. This can sometimes happen if hardware acceleration is disabled or your device does not fully support WebGL.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#00d2ff] hover:bg-white text-[#040a18] font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all"
            >
              Restart System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
