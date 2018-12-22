import React, { Component } from "react";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter } from "next/router";
import { Row, Col, Spin } from "antd";

import BodyContentArticle from "./BodyContentArticle";
import ListComment from "../../components/ListComment";
import ButtonBookmark from "../../components/ButtonBookmark";
import { fetchArticle } from "../articleActions";
import { ArticleApi } from "../../api/ApiService";
import { articleDetailSelector, isPendingArticleDetailSelector } from "../articleSelector";

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
    const { isPending, articleDetail } = this.props;
    
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
              <Col><span className="article-detail__info__megazin" style={{ marginRight: 10 }}>{"Theo: " + articleDetail.megazine}</span></Col>
              <Col><span className="article-detail__info__pushlish-date">{articleDetail.date ? moment(articleDetail.date).format("DD:MM:YYYY"): null}</span></Col>
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
  isPending: isPendingArticleDetailSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getDetailArticle: (article_id) => dispatch(fetchArticle(article_id)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleDetail));
