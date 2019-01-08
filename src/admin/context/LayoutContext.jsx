import React from 'react';
const defaultContextValue = {
  collapsed: false,
  onCollapseChange : () => {},
};
const { Provider, Consumer } = React.createContext(defaultContextValue);

class LayoutContext extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      onCollapseChange : this.onCollapseChange,
    }
  }

  onCollapseChange = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  render() {

    const value = {...this.state};
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }
}

export { LayoutContext as LayoutContextProvider, Consumer as LayoutContextConsumer };