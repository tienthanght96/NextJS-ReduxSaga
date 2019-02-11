import React, { Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import HomeNewest from './HomeNewest';
import HomeMostViews from './HomeMostViews';
import HomeTopCategory from './HomeTopCategory';
import { withAppLoaded } from '../../hocs/withAppLoaded'
import HomeRecommendTopic from './HomeRecommendTopic';

class HomeIndex extends Component {
  render() {
    return (
      <div className="home">
        <BackTop />
        <Row type="flex" justify="start">
          <Col xs={24} sm={24}>
            <HomeRecommendTopic />
          </Col>
          <Col className="home__newsest" xs={24} sm={14}>
            <HomeNewest />
          </Col>
          <Col xs={24} sm={10}>
            <HomeMostViews />
          </Col>
          <Col xs={24} sm={24}>
            <HomeTopCategory />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAppLoaded(HomeIndex);