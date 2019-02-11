import React, { Component } from 'react';
import LayoutAdmin from '../../../src/admin/components/LayoutAdmin';
import ArticlesList from '../../../src/admin/components/articles/ArticlesList';

class IndexAdminArticles extends Component {
  render() {
    return (
      <LayoutAdmin>
        {props => <ArticlesList {...props}/>}
      </LayoutAdmin>
    );
  }
}

export default IndexAdminArticles;