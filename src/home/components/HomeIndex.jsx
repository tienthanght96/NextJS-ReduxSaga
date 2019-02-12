import React, { Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import HomeNewest from './HomeNewest';
import HomeMostViews from './HomeMostViews';
import HomeTopCategory from './HomeTopCategory';
import { withAppLoaded } from '../../hocs/withAppLoaded'
import HomeRecommendTopic from './HomeRecommendTopic';

class HomeIndex extends Component {
  componentDidMount() {
    // this.handleStick();
  }

  handleStick = () => {
    const topHome = document.getElementById("top_home");
    const bottomHome = document.getElementById("bottom_home");
    const asideHome = document.getElementById("aside-home");
    if(topHome) {
      window.addEventListener("scroll", () => {
        if(window.screenTop > topHome.offsetTop) {
          asideHome.classList.add("sticky")
        } else {
          asideHome.classList.remove("sticky")
        }
        if( topHome.clientHeight + 100 < bottomHome.offsetTop ) {
        }
      })
    }
  }
  
  render() {
    return (
      <div className="home">
        <BackTop />
        <Row type="flex" justify="start">
          {/* <Col xs={24} sm={24}>
            <HomeRecommendTopic />
          </Col> */}
          <Col className="home__newsest" xs={24} sm={14} id="top_home">
            <HomeRecommendTopic />
            <HomeNewest />
          </Col>
          <Col xs={24} sm={10} id="aside-home">
            <HomeMostViews />
          </Col>
          <Col xs={24} sm={24} id="bottom_home">
            <HomeTopCategory />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withAppLoaded(HomeIndex);