import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      countdown: 10,
    };
    this.timer = null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Campus Verse ErrorBoundary] Caught error:', error, errorInfo);
    this.startAutoReset();
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  startAutoReset = () => {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState((prev) => {
        if (prev.countdown <= 1) {
          clearInterval(this.timer);
          this.handleReset();
          return { countdown: 0 };
        }
        return { countdown: prev.countdown - 1 };
      });
    }, 1000);
  };

  handleReset = () => {
    if (this.timer) clearInterval(this.timer);
    window.location.hash = '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 min-h-screen bg-[#020510] flex flex-col items-center justify-center p-6 text-center font-sans select-none">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 sm:p-12 backdrop-blur-2xl max-w-lg w-full shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
            {/* Top accent glow */}
            <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <AlertTriangle size={32} />
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-[0.2em] text-white uppercase mb-2">
              Something Went Wrong
            </h1>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              We encountered an unexpected error while running the kiosk experience. 
              The system will automatically recover and return to the main hub.
            </p>

            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-sm tracking-wider text-cyan-300">
                Returning to home in <strong className="font-bold text-white text-base">{this.state.countdown}s</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-[#020510] font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all transform hover:scale-105 cursor-pointer active:scale-95"
            >
              <RotateCcw size={15} />
              Return to Home Now
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
