import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { Row, BackTop, Col } from 'antd';
import { tagsArticlesSelector } from '../tagsSelector';
import { fetchTagsArticles, fetchMoreTagsArticles } from '../tagsActions';
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

class TagsIndex extends Component {
  componentDidMount() {
    const { tag } = this.props;
    this.props.getTagsArticles({ limit: 16, page: 1, tag });
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.tag !== this.props.tag && this.props.tag) {
      const { tag } = this.props;
      this.props.getTagsArticles({ limit: 16, page: 1, tag });
    }
  }

  onHandleLoadMore = () => {
    const { tag } = this.props;
    const { limit, page } = this.props.tagsArticles;
    this.props.getMoreTagsArticles({ tag, limit, page: page + 1 });
  }

  render() {
    const { tagsArticles, tag } = this.props;
    const { isPending, list, hasLoadMore, isLoadingMore } = tagsArticles;
    return (
      <div>
        <Head title={tag ? tag : "Megga News - Website tổng hợp và cá nhân hoá đọc báo" }/>
        <div className="box-title">
          {tag &&
            <h2 className="title-left">{tag}</h2>
          }
        </div>
        <Row type="flex" justify="start" className="overflow-hidden">
          { isPending
            ? Array.from(Array(16).keys()).map((item) => (
                <Col key={item} sm={12} md={6} lg={6}  style={{padding: '1rem 1rem 1rem 0'}}>
                    <Loader/>
                </Col>
              ))
            : <>
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
                <BackTop />
              </>
          }
        </Row>
        {/* { hasLoadMore &&
            <ButtonLoadMore
              onLoadMore={this.onHandleLoadMore}
              isLoadMore={isLoadingMore}
            />
        } */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tagsArticles: tagsArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getTagsArticles: ({ limit, page, tag }) => dispatch(fetchTagsArticles({ limit, page, tag })),
  getMoreTagsArticles: ({ limit, page, tag }) => dispatch(fetchMoreTagsArticles({ limit, page, tag }))
})

export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(TagsIndex));