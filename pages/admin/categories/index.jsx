import React, { Component } from 'react';
import LayoutAdmin from '../../../src/admin/components/LayoutAdmin';
import CategoriesList from '../../../src/admin/components/categories/CategoriesList';

class IndexAdminCategories extends Component {
  render() {
    return (
      <LayoutAdmin>
        {(props) => <CategoriesList {...props}/>}
      </LayoutAdmin>
    );
  }
}

export default IndexAdminCategories;