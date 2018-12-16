import React, { Component } from "react";
import Head from "../src/components/head";
import Layout from "../src/components/Layout";
import UserIndex from "../src/user/components/UserIndex";

class Profile extends Component {

  render() {
    return (
      <Layout>
        <Head title="Tài khoản" />
        <UserIndex />
      </Layout>
    );
  }
}

export default Profile;
