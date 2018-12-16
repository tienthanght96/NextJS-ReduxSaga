import React, { Component } from 'react';
import { Spin } from 'antd';
import { withRouter } from 'next/router';
import { connect } from 'react-redux'
import { appLoadedSelector } from '../root/rootSelector'
import { appLoaded } from '../root/rootActions';

export const withAppLoaded = (ComposedComp) => {
  class AppLoadedWrapper extends React.Component {
    
    render(){
      const { appLoaded } = this.props;
      if(!appLoaded) {
        return (
          <div className="loading-page" style={{ paddingTop: 100 }}>
            <Spin size="large" />
            <div className="loading-page__text">Đang lấy thông tin...</div>
          </div>
        )
      }
      return <ComposedComp {...this.props}/>
    }
  }
  const mapStateToProps = (state) => ({
    appLoaded: appLoadedSelector(state)
  });
  const mapDispatchToProps = (dispatch) => ({
    appLoad: () => dispatch(appLoaded())
  })
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLoadedWrapper));
}