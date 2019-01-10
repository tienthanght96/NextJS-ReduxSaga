import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from "react-content-loader";
import { withAppLoaded } from '../src/hocs/withAppLoaded';
import Layout from "../src/components/Layout";
import Head from "../src/components/head";
import { fetchNewest, fetchMoreNewest } from '../src/home/homeActions';
import { userFavoriteCategoriesSelector } from '../src/user/userSelector';
import { getNewestSeletor } from '../src/home/homeSelector';
import { formatCommentReplyTime } from '../src/utils/utils';
import ButtonLoadMore from "../src/components/ButtonLoadmore";
import ArticleCard from '../src/components/ArticleCard';
import { Row, Col } from 'antd';


const Loader = props => (
<ContentLoader 
    style={{height: 200}}
    height={160}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="7.5" y="3.27" rx="0" ry="0" width="180.0288" height="100" /> 
    <rect x="45.5" y="87.27" rx="0" ry="0" width="0" height="0" /> 
    <rect x="41.5" y="67.27" rx="0" ry="0" width="5" height="25" /> 
    <rect x="6.5" y="114.27" rx="0" ry="0" width="45" height="10" /> 
    <rect x="6.5" y="133.27" rx="0" ry="0" width="186" height="10" /> 
    <rect x="6.5" y="151.27" rx="0" ry="0" width="103" height="10" />
  </ContentLoader>
);

class IndexNewestArticles extends Component {
  componentDidMount() {
    this.props.getNewest({ limit: 16, page: 1 });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.getNewest({ limit: 16, page: 1 });
    }
  }
  
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleLoadMore = () => {
    const { newestArticles } = this.props;
    const { page } = newestArticles;
    this.props.getMoreNewest({ page: page + 1 });
  };
  render() {
    const { newestArticles } = this.props;
    const { isPending, list, isLoadingMore, hasLoadMore } = newestArticles;
    
    return (
      <Layout>
        <Head title="Tin mới nhất" />
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="col-md-9">
            <div className="box-title">
              <h2 className="title-left">Tin mới nhất</h2>
            </div>
            <Row type={"flex"} className="overflow-hidden">
            {isPending
              ? Array.from(Array(16).keys()).map(item => (
                  <Col key={item} sm={12} md={6} lg={6}  style={{padding: '1rem 1rem 1rem 0'}}>
                    <Loader/>
                  </Col>
                ))
              : list.map(article => {
                  return (
                    <ArticleCard
                      key={article.id}
                      type="vertical"
                      article={{
                        ...article,
                        date: formatCommentReplyTime(article.date / 1000)
                      }}
                    />
                  );
                })}
            </Row>
          </div>
          {hasLoadMore && (
            <ButtonLoadMore
              onLoadMore={this.handleLoadMore}
              isLoadMore={isLoadingMore}
            />
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  newestArticles: getNewestSeletor(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getNewest: ({ limit, page }) => dispatch(fetchNewest({ limit, page })),
  getMoreNewest: ({ page }) => dispatch(fetchMoreNewest({ page }))
});


export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(IndexNewestArticles));