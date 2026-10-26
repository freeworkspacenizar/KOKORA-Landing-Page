import React, { Component, ErrorInfo } from 'react';
import { FallbackPoster } from './FallbackPoster';

interface CanvasErrorBoundaryProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

interface CanvasErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  constructor(props: CanvasErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): CanvasErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error cleanly for telemetry without crashing the page
    if (import.meta.env.DEV) {
      console.warn('Canvas 3D Error Caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`w-full h-full flex items-center justify-center p-6 ${this.props.className || ''}`}>
          <FallbackPoster title={this.props.title || 'Visual Kelapa Alami'} />
        </div>
      );
    }

    return this.props.children;
  }
}
