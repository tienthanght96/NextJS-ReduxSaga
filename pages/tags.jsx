import React, { Component } from "react";
import Layout from "../src/components/Layout";
import TagsIndex from "../src/tags/components/TagsIndex";
import queryString from 'query-string';

class Article extends Component {
  
  static async getInitialProps({ query, store }) {
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
    const { tag } = this.props.query;
    const { parsedParams } = this.state;
    return (
      <Layout>
        {/* <Head title="Bài viết" /> */}
        <TagsIndex tag={tag || parsedParams.tag}/>
      </Layout>
    );
  }
}

export default Article;
