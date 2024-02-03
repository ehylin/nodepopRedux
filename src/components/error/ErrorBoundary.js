import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;

    if (error) {
      return (
        <div>
          <h1>Ooops! There was an error</h1>
          <div>
            <code>{error.message}</code>
          </div>
          <div>
            <code>{JSON.stringify(info)}</code>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
