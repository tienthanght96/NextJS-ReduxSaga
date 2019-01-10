import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, Input, Select } from 'antd'
import { fake_data_categories } from '../../../utils/config';
const { Search } = Input

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

class ArticlesTableFilter extends PureComponent {

  handleSubmit = () => {
    
  }

  handleReset = () => {

  }
  
  handleSubmit = () => {

  }

  onChange = () => {

  }

  render() {
    return (
      <Row gutter={24} type="flex" align="middle">
        <Col
          {...ColProps}
          xl={{ span: 12 }}
          md={{ span: 12 }}
        >
          <div>Top articles: </div>
          <Select defaultValue="" style={{ minWidth: 200 }} onChange={this.onChange}>
            <Select.Option value="">All</Select.Option>
            <Select.Option value="0">Top views of week</Select.Option>
            <Select.Option value="1">Top views of month</Select.Option>
          </Select>
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 12 }}
          md={{ span: 12 }}
        >
          <div>Category: </div>
          <Select defaultValue="" style={{ minWidth: 200 }} onChange={this.onChange}>
            <Select.Option value="">All</Select.Option>
            { fake_data_categories.map(category => (
              <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
            ))}
          </Select>
        </Col>
       
        <Col
          {...TwoColProps}
          xl={{ span: 24 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="end">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
              <Button onClick={this.handleReset}>
                Reset
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ArticlesTableFilter;