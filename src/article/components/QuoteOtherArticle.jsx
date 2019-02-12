import React, { Component } from "react";
import { Row, Col } from "antd";
import Link from 'next/link'

class QuoteOtherArticle extends Component {
  render() {
    const { firstRelativeArticle } = this.props;
    if(!firstRelativeArticle) return <div />
    return (
      <div className="quote-other">
        <div className="quote-other__title">
          <Link href={`/article?id=${firstRelativeArticle.id}`}>
            <a target="_blank">
              {firstRelativeArticle.title}
            </a>
          </Link>
        </div>
        <Row type="flex" justify="start">
          <Col xs={10} sm={10}>
            <div className="quote-other__image">
              <img src={firstRelativeArticle.picture || `/static/img/no_image_available.jpg`}/>
            </div>
          </Col>
          <Col xs={14} sm={14}>
            <p className="quote-other__sapo">{firstRelativeArticle.sapo}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default QuoteOtherArticle;
