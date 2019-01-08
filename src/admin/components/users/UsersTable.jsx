import React, { Component } from "react";
import { Table, Divider, Tag , Input, Button, Icon} from "antd";

class UsersTable extends Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => <a href="javascript:;">{text}</a>,
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  getColumns = () => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        // render: text => <a href="javascript:;">{text}</a>
        ...this.getColumnSearchProps('name'),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address"
      },
      {
        title: "User type",
        key: "user_type",
        dataIndex: "user_type",
        render: user_type => (
          <span>
            <Tag color={user_type === 1 ? "blue" : "magenta"}>
              {user_type === 1 ? "Facebook" : "Anonymous"}
            </Tag>
          </span>
        )
      },
      {
        title: "",
        key: "action",
        render: (dataCell, record) => (
          <span>
            <a href="javascript:;">
              <Icon type="eye" />
            </a>
            <Divider type="vertical" />
            <span className="button has-text-danger">
              <Icon type="delete" />
            </span>
          </span>
        )
      }
    ];
  };

  getData = () => {
    return [
      {
        key: "1",
        name: "John Brown",
        email: 'thangtran@gmail.com',
        address: "New York No. 1 Lake Park",
        user_type: 1
      },
      {
        key: "2",
        name: "Jim Green",
        email: '',
        address: "London No. 1 Lake Park",
        user_type: 2
      },
      {
        key: "3",
        name: "Joe Black",
        email: '',
        address: "Sidney No. 1 Lake Park",
        user_type: 2
      }
    ];
  };
  
  render() {
    const columns = this.getColumns();
    const data = this.getData();

    return (
      <React.Fragment>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          className="table"
          pagination={false}
        />
      </React.Fragment>
    );
  }
}

export default UsersTable;
