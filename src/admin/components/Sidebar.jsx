import React, { PureComponent } from "react";
import { withRouter } from "next/router";
import Link from 'next/link';
import { Icon, Layout, Menu, Switch } from "antd";
const { SubMenu } = Menu;

class SidebarAdmin extends PureComponent {
  state = {
    selectedKeys: ['']
  }

  componentDidMount() {
    this.getSelectedKeys();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.router.pathname !== this.props.router.pathname) {
      this.getSelectedKeys();
    }
  }
  

  getSelectedKeys = () => {
    const { pathname } = this.props.router;
    const arrayKeys = [ 'users', 'categories', 'articles' ];
    let isExist = false;
    let selectedKeys = [ '' ] 
    arrayKeys.forEach(key => {
      if(isExist) return;
      if(pathname.includes(`admin/${key}`)) {
        selectedKeys = [key];
        isExist = true;
        return;
      }
    });
    this.setState({ selectedKeys });
  }

  render() {
    const { collapsed, theme, changeTheme } = this.props;
    const { selectedKeys } = this.state;
    return (
      <Layout.Sider
        width={256}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider-admin"
      >
        <div className="brand">
          <div className="logo" onClick={() => console.log(collapsed)}>
            <img alt="logo" src="https://antd-admin.zuiidea.com/logo.svg" />
            {collapsed ? null : <h1>News Admin</h1>}
          </div>
        </div>

        <div className="menuContainer">
          <Menu
            mode="inline"
            theme={theme}
            // defaultSelectedKeys={["users"]}
            selectedKeys={selectedKeys}

            inlineCollapsed={collapsed}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="users">
              <Link href="/admin/users">
                <a>
                  <Icon type="user" />
                  <span>Users</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link href="/admin/categories">
                <a>
                  <Icon type="inbox" />
                  <span>Categories</span>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="articles">
              <Link href="/admin/articles">
                <a>
                  <Icon type="read" />
                  <span>Articles</span>
                </a>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
          { collapsed
            ? null
            : (
              <div className="switchTheme" style={{ color: theme === 'dark' ? '#fff' : '#666' }}>
                <span>
                  <Icon type="bulb" />
                  Switch Theme
                </span>
                <Switch
                  onChange={changeTheme}
                  defaultChecked={theme === 'dark'}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                />
              </div>
            )
        }
      </Layout.Sider>
    );
  }
}

export default withRouter(SidebarAdmin);
