import React, { Component } from "react";
import { Row, Col, BackTop } from "antd";
import ListMostPopularArticles from "../../home/components/HomeMostViews";
import ListNewestArticles from "./NewestArticles";
import RelativeArticles from "./RelativeArticles";
import ArticleDetail from "./ArticleDetail";

class ArticleIndex extends Component {
  render() {
    return(
      <div>
        <Row className="article-detail-container" type="flex" justify="start">
          <Col xs={24} sm={14} lg={14}>
            <ArticleDetail article_id={this.props.article_id}/>
          </Col>
          <Col xs={24} sm={10} className="article-detail__top-articles" style={{ padding: '0 1.2rem' }}>
            <ListNewestArticles />
            <ListMostPopularArticles />
          </Col>
          <Col xs={24} sm={24} style={{ marginTop: '1rem' }}>
            <RelativeArticles />
          </Col>
        </Row>
        <BackTop />
      </div>
    )
  }
}

export default ArticleIndex;
