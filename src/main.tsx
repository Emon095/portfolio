import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight: '100vh', background: '#080808', color: '#e5e5e5', display: 'grid', placeItems: 'center', padding: '24px'}}>
          <div style={{border: '1px solid rgba(255,255,255,0.12)', padding: '20px', maxWidth: '560px', width: '100%', background: '#111111'}}>
            <h1 style={{margin: '0 0 8px 0', fontSize: '20px'}}>Portfolio temporarily unavailable</h1>
            <p style={{margin: 0, opacity: 0.8}}>A rendering error occurred. Please refresh this page.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
