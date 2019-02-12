import React, { Component } from "react";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";
import { formatCommentReplyTime, replaceSizeImage } from "../../utils/utils";
import { fetchRecommendTopic } from "../homeActions";
import { getRecommendTopicSelector } from "../homeSelector";
import HomeHeaderTopCategory from './HomeHeaderTopCategory';
import { Row, Col, List, Skeleton } from "antd";
import { userFavoriteCategoriesSelector } from "../../user/userSelector";
import { LargeRecommendCard } from "../../components/ArticleCard/LargeRecommendCard";
import { SmallRecommendCard } from "../../components/ArticleCard/SmallRecommandCard";

const Loader = () => (
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

const HomeRecommendTopicItem = ({ isPending, list, ...rest }) => {
  if(!Array.isArray(list) || list.length < 1) return null;
  const litsFormatTime = list.map(ele => ({
    ...ele,
    picture: replaceSizeImage(ele.picture),
    date: formatCommentReplyTime(new Date(ele.date).getTime() / 1000)
  }))
  
  const largeCard = litsFormatTime[0];
  const smallList = litsFormatTime.slice(1, 5);
  return (
    <div>
      <HomeHeaderTopCategory
        title={rest.tagName}
        linkProps={{
          // as:`/category/${rest.code}`,
          href:`/tags?tag=${rest.tagName}`
        }}
      />
      <Row type="flex" justify="start" >
        <LargeRecommendCard article={largeCard}/>
        <SmallRecommendCard articles={smallList}/>
      </Row>
    </div>
  );
}

class HomeTopCategory extends Component {
  componentDidMount() {
    this.props.fetchRecommendTopic();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.fetchRecommendTopic();
    }
  }
  render() {
    const { list, isPending } = this.props.recommendTopic;
    return (
      <div>
        <div className="recommend-alert">
          <img src="/static/img/icons8-prize-64.png"/>
          <span className="recommend__title">Đề xuất </span>
        </div>
        { (isPending)
          ? <Row type="flex" justify="start" className="overflow-hidden">
              <Col sm={24} md={10} lg={10} style={{ padding: '1rem 1rem 1rem 0' }}>
                <Loader/>
              </Col>
              <Col sm={24} md={14} lg={14} style={{ padding: '1rem 1rem 1rem 0' }} >
              <List
                itemLayout="horizontal"
                dataSource={[1, 2, 3, 4]}
                locale={{
                  emptyText: ""
                }}
                renderItem={item => (
                  <List.Item>
                    <Skeleton avatar title={true} loading={true} active>
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              // backgroundImage: `url(${item.picture ||'/static/img/no_image_available.jpg'})`,
                              // backgroundSize: item.picture ? "contain" : "contain",
                              width: 150,
                              height: 85,
                              borderRadius: 3
                            }}
                          />
                        }
                        title={
                          <a className="has-text-weight-bold title-article" />
                        }
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
              </Col>
            </Row>
          :  list.map((topic, index) => (
              <HomeRecommendTopicItem
                key={'recommend-'+index}
                isPending={isPending}
                tagName={topic.tagName}
                list={topic.relatedArticles}
              />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recommendTopic: getRecommendTopicSelector(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchRecommendTopic: () => dispatch(fetchRecommendTopic()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTopCategory);