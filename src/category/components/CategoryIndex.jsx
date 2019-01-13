import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { Row, BackTop, Col } from 'antd';
import { categoryArticlesSelector } from '../categorySelector';
import { fetchCategoryArticles, fetchMoreCategoryArticles } from '../categoryActions';
import ButtonLoadMore from '../../components/ButtonLoadmore';
import ArticleCard from '../../components/ArticleCard';
import { formatCommentReplyTime } from '../../utils/utils';
import { withAppLoaded } from '../../hocs/withAppLoaded';
import Head from '../../components/head';
import { fake_data_categories } from '../../utils/config';

function Loader(){
	return (
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
}

class CategoryIndex extends Component {
  componentDidMount() {
    const { category_id } = this.props;
    this.props.getCategoryArticles({ limit: 16, page: 1, category_id });
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.category_id !== this.props.category_id && this.props.category_id) {
      const { category_id } = this.props;
      this.props.getCategoryArticles({ limit: 16, page: 1, category_id });
    }
  }

  onHandleLoadMore = () => {
    const { category_id } = this.props;
    const { limit, page } = this.props.categoryArticles;
    this.props.getMoreCategoryArticles({ category_id, limit, page: page + 1 });
  }

  render() {
    const { categoryArticles } = this.props;
    const { isPending, list, hasLoadMore, isLoadingMore } = categoryArticles;
    const category = fake_data_categories.find(c => c.id === +this.props.category_id );
    return (
      <div>
        <Head title={category ? category.name : "Danh mục" }/>
        <Row type="flex" justify="start" className="overflow-hidden">
          { isPending
            ? Array.from(Array(16).keys()).map((item) => (
                <Col key={item} sm={12} md={6} lg={6}  style={{padding: '1rem 1rem 1rem 0'}}>
                    <Loader/>
                </Col>
              ))
            : <>
                <Row type="flex" justify="start">
                { list.map((article) => {
                    return (
                      <ArticleCard
                        type='vertical'
                        article={{
                          ...article,
                          date: formatCommentReplyTime(article.date / 1000),
                          // category
                        }}
                        key={article.id}
                      />
                    )
                  })
                }
                </Row>
                <BackTop />
              </>
          }
        </Row>
        { hasLoadMore &&
            <ButtonLoadMore
              onLoadMore={this.onHandleLoadMore}
              isLoadMore={isLoadingMore}
            />
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categoryArticles: categoryArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getCategoryArticles: ({ limit, page, category_id }) => dispatch(fetchCategoryArticles({ limit, page, category_id })),
  getMoreCategoryArticles: ({ limit, page, category_id }) => dispatch(fetchMoreCategoryArticles({ limit, page, category_id }))
})

export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(CategoryIndex));