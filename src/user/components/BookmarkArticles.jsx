import React, { PureComponent } from "react";
import { isEmpty } from "lodash";
import ContentLoader from "react-content-loader";
import ArticleCard from "../../components/ArticleCard/";
import ButtonLoadMore from "../../components/ButtonLoadmore";
import { Alert, Row, BackTop, Col } from "antd";
import { formatCommentReplyTime } from "../../utils/utils";

function ContentLoaderArticle() {
  return (
    <ContentLoader
      style={{ height: 200 }}
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
}

class BookmarkArticles extends PureComponent {
  componentDidMount() {
    const user = this.props.user || null;
    if (user && user.id) {
      this.props.getBookmarkArticles({ limit: 12, page: 1 });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user &&
      this.props.user &&
      this.props.user.id
    ) {
      this.props.getBookmarkArticles({ limit: 12, page: 1 });
    }
  }

  onHandleLoadMore = () => {
    const { limit, page } = this.props.bookmarkArticles;
    this.props.getMoreBookmarkArticles({ limit, page: page + 1 });
  }

  handleBookmarkSuccess = () => {
    this.props.getBookmarkArticles({ limit: 12, page: 1 });
  }

  render() {
    const { isPending, list, isLoadingMore, hasLoadMore } = this.props.bookmarkArticles;
    if (isPending) {
      return (
        <Row type="flex" justify="start" className="overflow-hidden">
          {[1, 2, 3, 4].map(item => (
            <Col
              key={item}
              sm={6}
              md={6}
              lg={6}
              style={{ padding: "1rem 1rem 1rem 0" }}
            >
              <ContentLoaderArticle />
            </Col>
          ))}
        </Row>
      );
    }

    if (isEmpty(list)) {
      return null;
    }

    return (
      <>
        <Row type="flex" justify="start">
          {list.map((article, index) => {
            return (
              <ArticleCard
                type="vertical"
                article={{
                  ...article,
                  date: formatCommentReplyTime(article.date / 1000)
                }}
                onHandleBookmarkSuccess={this.handleBookmarkSuccess}
                key={article.id}
                // category={category && category.name ? category.name : null}
              />
            );
          })}
        </Row>
        { hasLoadMore && (
          <ButtonLoadMore
            onLoadMore={this.onHandleLoadMore}
            isLoadMore={isLoadingMore}
          />
        )}
        <BackTop />
      </>
    );
  }
}

export default BookmarkArticles;
