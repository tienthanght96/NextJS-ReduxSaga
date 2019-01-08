import React, { Component } from 'react';
import { Layout, Icon, Menu, Avatar } from "antd";
const { Header } = Layout;

class HeaderAdmin extends Component {
  onCollapseChange = () => {

  }
  handleClickMenu = () => {

  }
  
  render() {
    const { collapsed, onCollapseChange } = this.props;
    return (
      <Header className={`header-admin fixed ${collapsed ? 'collapsed' : ''}`}>
        <div
          className="button-collapse"
          onClick={onCollapseChange}
        >
          <Icon
            type={`${ collapsed ? 'menu-unfold': 'menu-fold'}`}
          />
        </div>
        <div className="rightContainer">
          <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
            <Menu.SubMenu
              title={
                <React.Fragment>
                  <span style={{ color: '#999', marginRight: 4 }}>
                    Hi
                  </span>
                  <span>admin</span>
                  <Avatar style={{ marginLeft: 8 }} src="https://pbs.twimg.com/profile_images/584098247641300992/N25WgvW_.png" />
                </React.Fragment>
              }
            >
              <Menu.Item key="SignOut">
                Log out
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
    );
  }
}

export default HeaderAdmin;