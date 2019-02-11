import React, { PureComponent } from 'react';
import { Form, Button, Row, Col, Input, Select } from 'antd'
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

class CategoriesTableFilter extends PureComponent {

  handleSubmit = () => {
    
  }

  handleReset = () => {
    this.props.handleReset();
  }
  
  handleSubmit = () => {
    this.props.handleSubmit();
  }

  onChange = (value) => {
    this.props.onChange(value);
  }

  render() {
    const { type } = this.props;
    return (
      <Row gutter={24} type="flex" align="middle">
        <Col
          {...ColProps}
          xl={{ span: 12 }}
          md={{ span: 12 }}
        >
          <div>Top categories: </div>
          <Select defaultValue="week" style={{ minWidth: 200 }} onChange={this.onChange}>
            <Select.Option value="week">Top views of week</Select.Option>
            <Select.Option value="month">Top views of month</Select.Option>
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

export default CategoriesTableFilter;