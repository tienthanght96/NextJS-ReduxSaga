import React, { Component } from "react";
import Link from 'next/link'
import moment from 'moment'
import { Table, Divider, Tag , Input, Button, Icon, Avatar } from "antd";
import { fake_data_articles } from "../../../utils/config";
import TotalCommentArticle from "../../../components/TotalComment";

class ArticlesTable extends Component {
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
    render: text => <a style={{ maxWidth: 200, overflow: 'hidden' }} href="javascript:;">{text}</a>,
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
        key: "id",
        render: text => (
          <Link
            href={{
              pathname: '/admin/article/',
              query: {
                id: text,
              }
            }}
          >
            <a>{text}</a>
          </Link>
          
        )
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 200,
        // render: text => <a href="javascript:;">{text}</a>
        ...this.getColumnSearchProps('title'),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "Views",
        dataIndex: "view",
        key: "view"
      },
      {
        title: "Comments",
        dataIndex: "id",
        key: "comment",
        render: text => <TotalCommentArticle article_id={text} isHideIcon={true}/>
      },
      {
        title: "",
        key: "action",
        render: (dataCell, record) => (
          <span>
            <Link
              href={{
                pathname: '/admin/article',
                query: {
                  id: dataCell.id,
                }
              }}
            >
              <a>
                <Icon type="eye" />
              </a>
            </Link>
            <Divider type="vertical" />
            <Link
              href={{
                pathname: '/admin/article/edit',
                query: {
                  id: dataCell.id,
                }
              }}
            >
              <a>
                <Icon type="edit" />
              </a>
            </Link>
            {/* <Divider type="vertical" />
            <span className="button has-text-danger">
              <Icon type="delete" />
            </span> */}
          </span>
        )
      }
    ];
  };

  getData = () => {
    return [];
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

export default ArticlesTable;
