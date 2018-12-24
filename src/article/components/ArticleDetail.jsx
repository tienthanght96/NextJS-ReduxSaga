import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "next/router";
import Link from 'next/link'
import { Row, Col, Spin } from "antd";

import BodyContentArticle from "./BodyContentArticle";
import ListComment from "../../components/ListComment";
import ButtonBookmark from "../../components/ButtonBookmark";
import { fetchArticle } from "../articleActions";
import { ArticleApi } from "../../api/ApiService";
import { articleDetailSelector, isPendingArticleDetailSelector, relativeArticlesSelector } from "../articleSelector";
import { formatCommentReplyTime } from "../../utils/utils";

class ArticleDetail extends Component {

  componentDidMount(){
    const { article_id } = this.props;
    this.props.getDetailArticle(article_id)
    this.updateView();
  }

  componentDidUpdate(prevProps) {
    if(this.props.article_id && (prevProps.article_id !== this.props.article_id)){
      this.props.getDetailArticle(this.props.article_id)
    }
  }

  updateView = async () => {
    const { article_id } = this.props;
    if (article_id) {
      try {
       await ArticleApi.updateViewArticle(article_id);
      } catch (error) {
        console.log("error update", error);
      }
    }
  };

  render() {
    const { isPending, articleDetail, relativeArticles } = this.props;
    
    if(isPending){
      return (
        <div className="loading-page">
          <Spin size="large" />
          <div className="loading-page__text">Đang tải...</div>
        </div>
      )
    }

    if(isEmpty(articleDetail)){
      return null;
    }

    return (
      <div className="article-detail-container" type="flex" justify="start">
        <article className="article-detail">
          <section className="article-detail__header">
            <h1 className="title">{articleDetail.title || ''}</h1>
            <h3 className="sapo has-text-weight-bold">{articleDetail.sapo || ''}</h3>
          </section>
          <section className="article-detail__info">
            <Row type="flex" justify="start">
              <Col>
                <i
                  className={`icon ion-ios-paper`}
                  style={{
                    fontSize: 18,
                    marginRight: 5,
                    position: "relative",
                    top: 2
                  }}
                />  
                <span className="article-detail__info__megazin" style={{ marginRight: 10 }}>
                  {"Theo: " + articleDetail.megazine}
                </span>
              </Col>
              <Col>
                <span className="article-detail__info__pushlish-date">
                  <i
                    className={`icon ion-ios-alarm`}
                    style={{
                      fontSize: 18,
                      marginRight: 5,
                      position: "relative",
                      top: 2
                    }}
                  />  
                  {formatCommentReplyTime(articleDetail.date / 1000) || null}
                </span>
              </Col>
              <Col>
                <Link
                   href={{
                    pathname: '/category',
                    query: {
                      id: articleDetail.category.id,
                      code: articleDetail.category.code
                    }
                  }}
                >
                  <a style={{ margin: '0 10px' }} className="has-text-danger">
                    <i
                      className={`icon ion-ios-${articleDetail.category.icon}`}
                      style={{
                        fontSize: 18,
                        marginRight: 5,
                        position: "relative",
                        top: 2
                      }}
                    />  
                    <span className="article-detail__info__category">
                      {articleDetail.category.name}
                    </span>
                  </a>
                </Link>
              </Col>
              
              <Col>
                <ButtonBookmark
                  article_id={articleDetail.id}
                  checkBookmark={articleDetail.bookmarked}
                />
              </Col>
            </Row>
          </section>
          <section className="article-detail__content">
              <BodyContentArticle
                imagesArticle={articleDetail.pictures}
                bodyHtml={articleDetail.content || ''}
                relativeArticles={relativeArticles}
                article_id={articleDetail.id}
              />
              {   articleDetail.author &&
                  <section className="">
                    <Row type="flex" justify="end">
                      <Col><span className="has-text-weight-bold has-text-danger">{articleDetail.author}</span></Col>
                    </Row>
                  </section>
              }
          </section>
        </article>
        <ListComment article_id={articleDetail.id}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  articleDetail: articleDetailSelector(state),
  isPending: isPendingArticleDetailSelector(state),
  relativeArticles: relativeArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getDetailArticle: (article_id) => dispatch(fetchArticle(article_id)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetail));
