import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoriesTable from './CategoriesTable';
import CategoriesTableFilter from './CategoriesTableFilter';
import PaginationList from '../PaginationList';
import BreadcrumbAdmin from '../BreadcrumbAdmin';
import { allCategoriesSelector } from '../../../root/rootSelector';
import { fetchCategories } from '../../../root/rootActions';
import { fake_data_categories } from '../../../utils/config';

class CategoriesList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <BreadcrumbAdmin breadcrumbs={['admin', 'categories' ]}/>
        <div className="contentInner">
          <h4 className="title is-5">Categories</h4>
          <CategoriesTableFilter />
          <CategoriesTable categories={fake_data_categories}/>
          <PaginationList total={fake_data_categories.length} current={1}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);