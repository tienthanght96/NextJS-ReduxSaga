import React, { Component } from 'react';
import { Pagination } from 'antd';
class PaginationList extends Component {

  onChange = (current, pageSize) => {
    console.log(current, pageSize);
  }
  
  render() {
    const { total, current } = this.props;
    return (
      <div style={{ margin: '20px 0' }}>
        <Pagination
          current={current || 1}
          onChange={this.onChange}
          total={total} />
      </div>
    );
  }
}

export default PaginationList;