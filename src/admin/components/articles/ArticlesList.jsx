import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticlesTable from './ArticlesTable';
import ArticlesTableFilter from './ArticlesTableFilter';
import PaginationList from '../PaginationList';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import { fake_data_articles } from '../../../utils/config';
import { allCategoriesSelector } from '../../../root/rootSelector';
import { fetchCategories } from '../../../root/rootActions';

class ArticlesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <BreadcrumbAdmin breadcrumbs={['admin', 'articles' ]}/>
        <div className="contentInner">
          <h4 className="title is-5">Articles</h4>
          <ArticlesTableFilter />
          <ArticlesTable categories={categories}/>
          <PaginationList total={fake_data_articles.length} current={1}/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: allCategoriesSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);