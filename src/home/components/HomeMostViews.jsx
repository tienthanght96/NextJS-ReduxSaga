import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";
import Link from 'next/link'
import { asserts } from '../../utils/config';
import { List, Icon, Skeleton } from "antd";
import TotalCommentArticle from '../../components/TotalComment';
import ButtonBookmark from '../../components/ButtonBookmark';
import { formatCommentReplyTime } from "../../utils/utils";
import { fetchMostView } from "../homeActions";
import { getMostViewSeletor } from "../homeSelector";
import { userFavoriteCategoriesSelector } from "../../user/userSelector";

const Loader = props => (
  <ContentLoader
    style={{ height: 150 }}
    height={150}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

class HomeMostView extends Component {
  componentDidMount() {
    this.props.getHomeMostView({ limit: 10 });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.getHomeMostView({ limit: 10 });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const { mostViewsArticles } = this.props;
    const { isPending, list } = mostViewsArticles;
    return (
      <div>
        <div className="box-title flex-row-space-between">
          <h2 className="title-left">Đọc nhiều nhất</h2>
          <div className="right-box-title">
            {/* <div className="pin-category" 
              onClick={() =>{
              }}
            >
              <Icon type="pushpin-o" className="header-category-icon" />
            </div> */}
            <Link href="/mostviews">
              <a className="right-box-title-link" >
                <span>Xem tất cả</span>
                <Icon type="arrow-right" className="header-category-icon" style={{ marginLeft: 5 }}/>
              </a>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden">
          { isPending ? (
            Array.from(Array(10).keys()).map(item => (
              <div key={item}>
                <Loader key={item} />
              </div>
            ))
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={list || []}
              loading={list.length < 1}
              locale=""
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
                          <a className="has-text-weight-bold">{item.title}</a>
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
                            <span className="has-text-danger" style={{ marginRight: 10 }}>
                              {formatCommentReplyTime(+item.date / 1000)}
                            </span>
                            <TotalCommentArticle article_id={item.id} />
                            <ButtonBookmark article_id={item.id} checkBookmark={item.checkBookmark} />
                          </div>
                        ) : null
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          )}
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeMostView);
