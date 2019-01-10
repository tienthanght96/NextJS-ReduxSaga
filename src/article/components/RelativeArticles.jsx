import React, { Component } from 'react';
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader';
import { Row, BackTop, Col } from 'antd';
import ButtonLoadMore from '../../components/ButtonLoadmore';
import { relativeArticlesSelector } from '../articleSelector';
import { fetchRelativeArticles, fetchMoreRelativeArticles } from '../articleActions';
import { formatCommentReplyTime } from '../../utils/utils';
import ArticleCard from '../../components/ArticleCard';

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

class RelativeArticles extends Component {
  
  componentDidMount() {
    const { article_id } = this.props;
    this.props.getRelativeArticles({ article_id });
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.article_id !== this.props.article_id && this.props.article_id) {
      const { article_id } = this.props;
      this.props.getRelativeArticles({ article_id });
    }
  }

  onHandleLoadMore = () => {
    const { article_id } = this.props;
    this.props.getMoreRelativeArticles({ article_id });
  }

  render() {
    const { isPending, list, hasLoadMore, isLoadingMore } = this.props.relativeArticles;
    return (
      <div>
        <div className="box-title">
          <h2 className="title-left">Tin liên quan </h2>
        </div>
        <Row type="flex" justify="start" className="overflow-hidden">
          { isPending
            ? Array.from(Array(16).keys()).map((item) => (
                <Col key={item} sm={12} md={6} lg={6}  style={{padding: '1rem 1rem 1rem 0'}}>
                    <Loader/>
                </Col>
              ))
            : <>
                <Row type="flex" justify="start">
                { list.map((article, index) => {
                    if(index !== 0){
                      return (
                        <ArticleCard
                          type='vertical'
                          article={{
                            ...article,
                            // date: formatCommentReplyTime(article.date / 1000),
                            // category
                          }}
                          key={article.id}
                        />
                      )
                    };
                    return null;
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
  relativeArticles: relativeArticlesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getRelativeArticles: ({ article_id }) => dispatch(fetchRelativeArticles({ article_id })),
  getMoreRelativeArticles: ({ article_id }) => dispatch(fetchMoreRelativeArticles({ article_id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RelativeArticles);