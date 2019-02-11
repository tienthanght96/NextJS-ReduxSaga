import React, { Component } from "react";
import { Table, Divider, Tag , Input, Button, Icon} from "antd";

class CategoriesTable extends Component {
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
        title: "ID",
        dataIndex: "id",
        rowKey: "category_id",
      },
      {
        title: "Name",
        dataIndex: "name",
        rowKey: "category_name",
        // render: text => <a href="javascript:;">{text}</a>
        ...this.getColumnSearchProps('name'),
      },
      {
        title: "Code",
        dataIndex: "code",
        rowKey: "category_code"
      },
      {
        title: "Total views",
        dataIndex: "view",
        rowKey: "category_view"
      },
      {
        title: "Icon",
        dataIndex: "icon",
        rowKey: "category_icon",
        render: text => (
          <i
            className={`icon ion-ios-${text}`}
            style={{
              fontSize: 20,
              marginRight: 10,
              position: "relative",
              top: 2
            }}
          />
        )
      },
    ];
  };

  getData = () => {
    const { categories } = this.props;
    if(!categories || categories.length < 1) {
      return [];
    }
    return categories;
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
          loading={this.props.isLoading}
          pagination={{
            size: data.length,
            style: {
              display: "none"
            }
          }}

        />
      </React.Fragment>
    );
  }
}

export default CategoriesTable;
