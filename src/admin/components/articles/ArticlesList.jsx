import React, { Component } from 'react';
import ArticlesTable from './ArticlesTable';
import ArticlesTableFilter from './ArticlesTableFilter';
import PaginationList from '../PaginationList';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import { ApiJavaService, isSuccessRequest } from '../../../api/ApiService';

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isLoading: false,
      type: 'week'
    };
  }

  componentDidMount() {
    const parsedParams = queryString.parse(window.location.search);
    if(parsedParams.type) {
      this.setState({ type: parsedParams.type });
      this.fetchArticles(parsedParams.type);
      return;
    } else {
      this.fetchArticles(parsedParams.type);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.router && prevProps.router && (this.props.router.query !== prevProps.router.query) && this.props.router.query.type) {
      this.fetchArticles(query.type);
    }
  }

  fetchArticles = async (type = this.state.type) => {
    try {
      this.setState({ isLoading: true })
      const { data, status } = await ApiJavaService.get(`category/listCategoryWithView?type=${type}`);
      if(data && isSuccessRequest(status) && Array.isArray(data)) {
        const categories = data.sort((first, second) => second.view - first.view ).map(item => ({ view: item.view, ...item.category }))
        this.setState({ categories , isLoading: false });
        return;
      }
      throw data;
    } catch (error) {
      this.setState({ isLoading: false, categories: [] });
    }
  }

  onChange = (value) => {
    this.setState({ type: value });
  }

  handleSubmit = () => {
    this.fetchArticles();
  }

  handleReset = () => {
    this.setState({ type: 'week' });
    this.fetchArticles("week");
  }
  render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <BreadcrumbAdmin breadcrumbs={['admin', 'articles' ]}/>
        <div className="contentInner">
          <h4 className="title is-5">Articles</h4>
          <ArticlesTableFilter />
          <ArticlesTable categories={[]}/>
          <PaginationList total={fake_data_articles.length} current={1}/>
        </div>
      </React.Fragment>
    );
  }
}

export default ArticlesList;