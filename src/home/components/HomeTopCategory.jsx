import React, { Component } from "react";
import { connect } from "react-redux";
import { map } from 'lodash'
import ContentLoader from "react-content-loader";
import { formatCommentReplyTime } from "../../utils/utils";
import ArticleCard from "../../components/ArticleCard";
import { fetchTopCategory } from "../homeActions";
import { getTopCategorySelector } from "../homeSelector";
import HomeHeaderTopCategory from './HomeHeaderTopCategory';
import { Row, Col } from "antd";
import { userFavoriteCategoriesSelector } from "../../user/userSelector";
import { allCategoriesSelector } from "../../root/rootSelector";

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

const HomeTopCategoryListItem = ({ isPending, list, ...rest }) => {
  return (
    <div>
      <HomeHeaderTopCategory
        title={rest.name}
        linkProps={{
          as:`/category/${rest.code}`,
          href:`/category?code=${rest.code}`
        }}
      />
      { (isPending)
        ? <Row type="flex" justify="start" className="overflow-hidden">
            { [1,2,3,4].map((item) => (
                <Col key={item} sm={6} md={6} lg={6}  style={{padding: '1rem 1rem 1rem 0'}}>
                  <Loader/>
                </Col>
              ))
            }
          </Row>
        : <Row type="flex" justify="start" >
          {  list.map((article) => {
              return (
                <ArticleCard
                  type='vertical'
                  article={{
                    ...article,
                    date: formatCommentReplyTime(article.date  / 1000),
                    category: rest.category
                  }}
                  key={article.id}
                />
              );   
            })
          }
          </Row>
      }
    </div>
  );
}

class HomeTopCategory extends Component {
  componentDidMount() {
    this.props.fetchTopCategory();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.favoriteCategories.length !== this.props.favoriteCategories.length) {
      this.props.fetchTopCategory();
    }
  }
  render() {
    const { topCategoryArticles } = this.props;
    return map(topCategoryArticles, (category, key) => (
      <HomeTopCategoryListItem
        key={'c-'+key}
        {...category}
        isPending={category.isPending}
        list={category.list}
      />
    ));
  }
}

const mapStateToProps = (state) => ({
  topCategoryArticles: getTopCategorySelector(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTopCategory: () => dispatch(fetchTopCategory()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTopCategory);