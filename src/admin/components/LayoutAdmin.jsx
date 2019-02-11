import React, { Component } from 'react';
import { Layout } from "antd";
import { withRouter } from 'next/router';
import SidebarAdmin from './Sidebar';
import HeaderAdmin from './HeaderAdmin';
import { LayoutContextProvider } from '../context/LayoutContext';
const { Content } = Layout;

class LayoutAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      theme: 'light',
    }
  }

  onCollapseChange = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }

  render() {
    const { collapsed, theme } = this.state;
    return (
      <LayoutContextProvider>
        <Layout>
          <SidebarAdmin collapsed={collapsed} theme={theme} changeTheme={this.changeTheme}/>
          <Layout style={{ paddingTop: 72, height: '100vh' }}>
            <HeaderAdmin collapsed={collapsed} onCollapseChange={this.onCollapseChange}/>
            <Content
              style={{
                background: "#f0f2f5",
                padding: 24,
                margin: 0,
                minHeight: 'calc(100% - 72px)'
              }}
            >
              { this.props.children({...this.props}) }
            </Content>
          </Layout>
        </Layout>
      </LayoutContextProvider>
    );
  }
}

export default withRouter(LayoutAdmin);
