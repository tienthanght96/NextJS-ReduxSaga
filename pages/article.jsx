import React, { Component } from "react";
// import Head from "../src/components/head";
import Layout from "../src/components/Layout";
import ArticleIndex from "../src/article/components/ArticleIndex";
import queryString from 'query-string';

class Article extends Component {
  
  static async getInitialProps({ query, store }) {
    // if(store) {
    //   store.dispatch(fetchingArticle());
    //  }
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
        {/* <Head title="Bài viết" /> */}
        <ArticleIndex article_id={id || parsedParams.id}/>
      </Layout>
    );
  }
}

export default Article;
