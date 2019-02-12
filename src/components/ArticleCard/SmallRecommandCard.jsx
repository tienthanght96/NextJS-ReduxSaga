import React from 'react';
import Link from 'next/link';
import { Col, Row, Icon, List, Skeleton } from 'antd';
import TotalCommentArticle from '../TotalComment';
import ButtonBookmark from '../ButtonBookmark';
import { replaceSizeImage } from '../../utils/utils';

export const SmallRecommendCard = ({ articles }) => {
  return (
    <Col sm={24} md={14} lg={14} style={{ padding: '1rem 1rem 1rem 0' }} className="list-small">
     {/* {  articles.map(article => (
          <div style={{ display: "block" }} className="small-card">
            <div className="small-card__image">
              <img src={(article.picture) || '/static/img/no_image_available.jpg'}/>
            </div>
            <div className="small-card__content">
              <h3 className="title">
                <Link href={`/article?id=${article.id}`}>
                  <a>{article.title || '...'}</a>
                </Link>
              </h3>
              <Row type="flex" justify="space-between" style={{ alignItems: 'center' }}>
                <div className="date">
                  <span className="right-article-meta vertical">
                    <Icon
                      type="clock-circle"
                      theme="outlined"
                      style={{ marginRight: 5 }}
                    />
                    <span>{article.date}</span>
                  </span>
                </div>
                <div>
                  <TotalCommentArticle article_id={article.id} />
                  <ButtonBookmark
                    article_id={article.id}
                    checkBookmark={article.checkBookmark}
                  />
                </div>
              </Row>
            </div>
          </div>
        ))
     } */}
      <List
        itemLayout="horizontal"
        dataSource={articles || []}
        loading={!articles}
        locale={{
          emptyText: ""
        }}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      backgroundImage: `url(${item.picture ||'/static/img/no_image_available.jpg'})`,
                      backgroundSize: item.picture ? "contain" : "contain",
                      width: 150,
                      height: 85,
                      borderRadius: 3
                    }}
                  />
                }
                title={
                  <Link href={`/article?id=${item.id}`}>
                    <a className="has-text-weight-bold title-article" title={item.title}>{item.title}</a>
                  </Link>
                }
                description={
                  item.date ? (
                    <div>
                      <Icon
                        type="clock-circle"
                        theme="outlined"
                        style={{ marginRight: 8 }}
                      />
                      <span className="has-text-danger fz-14" style={{ marginRight: 10 }}>
                        {item.date}
                      </span>
                      <TotalCommentArticle article_id={item.id} />
                      {/* <ButtonBookmark article_id={item.id} checkBookmark={item.checkBookmark} /> */}
                    </div>
                  ) : null
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Col>
  )
};