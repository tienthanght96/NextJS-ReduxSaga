import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";

import { formatCommentReplyTime } from "../../utils/utils";
import ArticleCard from "../../components/ArticleCard";
import ButtonLoadMore from "../../components/ButtonLoadmore";
import { fetchNewest, fetchMoreNewest } from "../homeActions";
import { getNewestSeletor } from "../homeSelector";
import { userFavoriteCategoriesSelector } from "../../user/userSelector";

const Loader = props => (
  <ContentLoader
    style={{ height: 200 }}
    height={160}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="8.5" y="17.27" rx="0" ry="0" width="95.76" height="98.44" />
    <rect x="45.5" y="87.27" rx="0" ry="0" width="0" height="0" />
    <rect x="41.5" y="67.27" rx="0" ry="0" width="5" height="24" />
    <rect x="118.5" y="19.27" rx="0" ry="0" width="48.45" height="11.534" />
    <rect x="118.5" y="42.27" rx="0" ry="0" width="297.44" height="8.2" />
    <rect x="119.5" y="65.27" rx="0" ry="0" width="95" height="8" />
    <rect x="118.5" y="89.27" rx="0" ry="0" width="292.3" height="8.16" />
  </ContentLoader>
);

class HomeNewest extends Component {
  componentDidMount() {
    this.props.getNewest({ limit: 6, page: 1 });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.getNewest({ limit: 6, page: 1 });
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
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="col-md-9">
          <div className="box-title">
            <h2 className="title-left">Tin Mới nhất</h2>
          </div>
          {isPending
            ? Array.from(Array(6).keys()).map(item => (
                <div key={item}>
                  <Loader key={item} />
                </div>
              ))
            : list.map(article => {
                return (
                  <ArticleCard
                    key={article.id}
                    type="horizontal"
                    article={{
                      ...article,
                      date: formatCommentReplyTime(article.date / 1000)
                    }}
                  />
                );
              })}
        </div>
        {hasLoadMore && (
          <ButtonLoadMore
            onLoadMore={this.handleLoadMore}
            isLoadMore={isLoadingMore}
          />
        )}
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeNewest);
