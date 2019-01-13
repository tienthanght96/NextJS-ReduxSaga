import React, { Component } from 'react';
import { Spin } from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux'
import { appLoadedSelector } from '../root/rootSelector'
import { appLoaded } from '../root/rootActions';
import { userSelector, isFetchedFavoriteCategoriesSelector } from '../user/userSelector';
import { Loading } from '../components/Loading';

export const withAppLoaded = (ComposedComp) => {
  class AppLoadedWrapper extends React.Component {
    
    render(){
      const { appLoaded, user, isFetchedFavoriteCategories } = this.props;
      
      if(appLoaded && user && user.id && isFetchedFavoriteCategories){
        return <ComposedComp {...this.props}/>
      }

      return (
        <div className="loading-page has-text-centered" style={{ padding: '100px 0' }}>
          {/* <Spin size="large" /> */}
          <Loading />
          <div className="loading-page__text">Đang lấy thông tin...</div>
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    appLoaded: appLoadedSelector(state),
    user: userSelector(state),
    isFetchedFavoriteCategories: isFetchedFavoriteCategoriesSelector(state)
  });
  const mapDispatchToProps = (dispatch) => ({
    appLoad: () => dispatch(appLoaded())
  })
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLoadedWrapper));
}