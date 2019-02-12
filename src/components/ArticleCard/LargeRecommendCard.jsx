import React from 'react';
import Link from 'next/link';
import { Col, Row, Icon } from 'antd';
import TotalCommentArticle from '../TotalComment';
// import ButtonBookmark from '../ButtonBookmark';

export const LargeRecommendCard = ({ article }) => {
  return (
    <Col sm={24} md={10} lg={10} style={{ padding: '1rem 1rem 1rem 0' }}>
      <div className="large-card">
        <Link href={`/article?id=${article.id}`}>
          <a className="large-card__image" >
            <img src={(article.picture) || '/static/img/no_image_available.jpg'}/>
          </a>
        </Link>
        <div className="large-card__content">
          <h3 className="title">
            <Link href={`/article?id=${article.id}`}>
              <a>{article.title || '...'}</a>
            </Link>
          </h3>
          <Row type="flex" style={{ alignItems: 'center' }}>
            <div className="date">
              <span className="right-article-meta vertical">
                <Icon
                  type="clock-circle"
                  theme="outlined"
                  style={{ marginRight: 5 }}
                />
                <span className="fz-14">{article.date}</span>
              </span>
            </div>
            <div style={{ marginLeft: 10 }}>
              <TotalCommentArticle article_id={article.id} />
              {/* <ButtonBookmark
                article_id={article.id}
                checkBookmark={article.checkBookmark}
                // onHandleBookmarkSuccess={onHandleBookmarkSuccess}
              /> */}
            </div>
          </Row>
        </div>
      </div>
    </Col>
  )
};