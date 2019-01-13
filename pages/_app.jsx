import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import App, { Container } from 'next/app'
import firebase from 'firebase';
import Router from 'next/router';
import Nprogress from 'nprogress';
import '../styles/index.scss';
import createStore from '../src/store'
import clientCredentials from '../credentials/client';
import { dataServerForAnonymousUser } from '../src/utils/utils'
import { appLoading, appLoaded, fetchCategories } from '../src/root/rootActions';
import { anonymousLogin } from '../src/lib/firebaseLib';
import { userLoginSuccess, userLogout, userLogin } from '../src/user/userActions';
import Footer from '../src/components/Footer';
import { ArticleApi } from '../src/api/ApiService';

Router.events.on('routeChangeStart', (url) => {
  Nprogress.start();
})
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

class MyApp extends App {
  
  static async getInitialProps({ Component, ctx }) {
    if(ctx.store) {
      // ctx.store.dispatch(appLoading());
      const userState = ctx.store.getState().user;
      // console.log('userState', userState );
      const userId = (userState && userState.user && userState.user.id)
        ? userState.user.id
        : null;
      ctx.store.dispatch(fetchCategories({ userId }));
    }
    try {
      const newestList = await ArticleApi.getNewestListArticle(1, 5, null);
      return {
        pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        },
        newestList
      };
    } catch (error) {
      return {
        pageProps: {
          // Call page-level getInitialProps
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {})
        }
      };
    }
    // return {
    //   pageProps: {
    //     // Call page-level getInitialProps
    //     ...(Component.getInitialProps
    //       ? await Component.getInitialProps(ctx)
    //       : {})
    //   }
    // }
  }

  async componentWillMount(){
    if (firebase && firebase.apps && firebase.apps.length) {
    } else {
      firebase.initializeApp(clientCredentials);
      // this.handleLoginUser();
    }
  }

  async componentDidMount() {
    this.props.store.dispatch(appLoading());
    // this.props.store.dispatch(appLoaded());
    this.initFaceBook();
    if (firebase && firebase.apps && firebase.apps.length) {
      // this.handleLoginUser();
      this.autoLogin();
    } else {
      firebase.initializeApp(clientCredentials);
      this.autoLogin();
    }
  }

  initFaceBook = () => {
    window.fbAsyncInit = function() {
      // console.log('FB',FB)
      window.FB = FB;
      FB.init({
      appId            : 285553035545495,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.1'
      });
    };
    
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  autoLogin = () => {
    if(typeof localStorage !== 'undefined') {
      const userLocal = localStorage.getItem("user");
      if(userLocal && JSON.parse(userLocal)) {
        this.autoLoginUserFacebook(userLocal);
        return;
      } else {
        this.autoLoginAnonymousUser();
      }
    }
  }

  autoLoginUserFacebook = (userLocal) => {
    if(userLocal && JSON.parse(userLocal) && this.props.store){
      const user = JSON.parse(userLocal, user);
      this.props.store.dispatch(userLoginSuccess(user));
    }
  }

  autoLoginAnonymousUser = () => {
    this.props.store && this.props.store.dispatch(userLogout());
    localStorage.removeItem("user");
    anonymousLogin(firebaseData => {
      const firebaseUser = firebaseData.user; 
      const paramsLogin = {
        email: dataServerForAnonymousUser.email,
        username: dataServerForAnonymousUser.username,
        picture: dataServerForAnonymousUser.picture,
        token: firebaseUser.uid,
        type: 2
      };
      const dataLogin = {
        paramsLogin,
        firebaseUser,
        authResponseFb: {},
        callbackLoginSuccess: null,
      };
      this.props.store.dispatch(userLogin(dataLogin));
    });
  }

  render() {
    const { Component, pageProps, store, newestList } = this.props;
    const state = store.getState();
    const { root } = state;
    return (
      <Container>
        <Head>
          <title>Megga News - Website tổng hợp và cá nhân hoá đọc báo</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
          <Footer
            categories={root.categories || []}
            newestList={newestList}
          />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
