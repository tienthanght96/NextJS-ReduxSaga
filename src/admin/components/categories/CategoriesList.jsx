import React, { Component } from 'react';
import queryString from 'query-string'
import CategoriesTable from './CategoriesTable';
import CategoriesTableFilter from './CategoriesTableFilter';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import { ApiJavaService, isSuccessRequest } from '../../../api/ApiService';

class CategoriesList extends Component {
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
      this.fetchCategories(parsedParams.type);
      return;
    } else {
      this.fetchCategories(parsedParams.type);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.router && prevProps.router && (this.props.router.query !== prevProps.router.query) && this.props.router.query.type) {
      this.fetchCategories(query.type);
    }
  }

  fetchCategories = async (type = this.state.type) => {
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
    this.fetchCategories();
  }

  handleReset = () => {
    this.setState({ type: 'week' });
    this.fetchCategories("week");
  }

  render() {
    const { categories, isLoading, type } = this.state;
    return (
      <React.Fragment>
        <BreadcrumbAdmin breadcrumbs={['admin', 'categories' ]}/>
        <div className="contentInner">
          <h4 className="title is-5">Categories</h4>
          <CategoriesTableFilter
            type={type}
            onChange={this.onChange}
            handleSubmit={this.handleSubmit}
            handleReset={this.handleReset}
          />
          <CategoriesTable categories={categories} isLoading={isLoading}/>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoriesList;