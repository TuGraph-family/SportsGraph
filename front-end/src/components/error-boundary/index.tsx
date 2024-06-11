import React from "react";

interface ErrorBoundaryPorps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryPorps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryPorps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  render() {
    console.log(this.state);

    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>出错了，请稍后刷新页面尝试</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
