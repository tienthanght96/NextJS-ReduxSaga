import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from "react-content-loader";
import { withAppLoaded } from '../src/hocs/withAppLoaded';
import Layout from "../src/components/Layout";
import { userFavoriteCategoriesSelector } from '../src/user/userSelector';
import { formatCommentReplyTime } from '../src/utils/utils';
import ButtonLoadMore from "../src/components/ButtonLoadmore";
import ArticleCard from '../src/components/ArticleCard';
import Head from "../src/components/head";
import { Row, Col } from 'antd';
import { getMostViewSeletor } from '../src/home/homeSelector';
import { fetchMostView } from '../src/home/homeActions';


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

class IndexMostViewsArticles extends Component {
  componentDidMount() {
    this.props.getHomeMostView({ limit: 32 });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.getHomeMostView({ limit: 32 });
    }
  }
  render() {
    const { mostViewsArticles } = this.props;
    const { isPending, list } = mostViewsArticles;
    
    return (
      <Layout>
        <Head title="Đọc nhiều nhất" />
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="col-md-9">
            <div className="box-title">
              <h2 className="title-left">Đọc nhiều nhất</h2>
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
          {/* {hasLoadMore && (
            <ButtonLoadMore
              onLoadMore={this.handleLoadMore}
              isLoadMore={isLoadingMore}
            />
          )} */}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  mostViewsArticles: getMostViewSeletor(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getHomeMostView: ({ limit }) => dispatch(fetchMostView({ limit }))
});


export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(IndexMostViewsArticles));