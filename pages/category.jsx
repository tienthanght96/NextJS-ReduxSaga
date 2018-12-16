import React, { Component } from "react";
import Head from "../src/components/head";
import Layout from "../src/components/Layout";
import { fetchingCategoryArticles } from "../src/category/categoryActions";
import CategoryIndex from "../src/category/components/CategoryIndex";
import queryString from 'query-string';

class Category extends Component {
  
  static async getInitialProps({ query, store }) {
    if(store) {
      store.dispatch(fetchingCategoryArticles());
     }
    return {
      query,
    }
  }
  
  constructor(props){
    super(props);
    this.state = {
      parsedParams: {}
    };
  }

  componentDidMount() {
    const parsedParams = queryString.parse(window.location.search);
    this.setState({ parsedParams })
  }

  render() {
    const { id } = this.props.query;
    const { parsedParams } = this.state;
    return (
      <Layout>
        <Head title="Danh mục" />
        <CategoryIndex category_id={id || parsedParams.id}/>
      </Layout>
    );
  }
}

export default Category;
