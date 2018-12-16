import React from "react";
import Layout from "../src/components/Layout";
import Head from "../src/components/head";
import HomeIndex from "../src/home/components/HomeIndex";
import { fetchingNewest, fetchingMostView } from "../src/home/homeActions";

class Home extends React.Component {
  static async getInitialProps({ store }) {
    if(store) {
      store.dispatch(fetchingNewest());
      store.dispatch(fetchingMostView());
    }
  }
  render() {
    return (
      <Layout>
        <Head title="Trang chủ" />
        <HomeIndex />
      </Layout>
    );
  }
}

export default Home;
