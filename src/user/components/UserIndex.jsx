import React, { Component } from "react";
import { connect } from 'react-redux';
import { withAppLoaded } from "../../hocs/withAppLoaded";
import { userSelector, userFavoriteCategoriesSelector, bookmarkArticlesSelector, historyArticlesSelector } from "../userSelector";
import { toggleModalPersonalize } from "../../modal/modalActions";
import { fetchBookmarkArticles, fetchMoreBookmarkArticles, fetchHistoryArticles } from "../userActions";
import TabsProfile from "./TabsProfile";
import { Card, Avatar } from "antd";
import FacebookLoginButton from "../../components/FacebookLoginButton";

class UserIndex extends Component {
  render() {
    const { user} = this.props;
    if (user && !user.isAnonymous) {
      return (
        <div className="user-detail has-text-centered">
          {user.picture && (
            <div className="user-detail__avatar">
              <Avatar size={50} src={user.picture} shape="circle" />
            </div>
          )}
          <h4 className="user-detail__name">{user.username}</h4>
          <h5 className="user-detail__email">{user.email}</h5>
          <div className="user-detail__tabs">
            <TabsProfile {...this.props}/>
          </div>
        </div>
      );
    }

    return (
      <Card style={{ marginTop: 30 }}>
        <FacebookLoginButton />
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({
  user: userSelector(state),
  favoriteCategories: userFavoriteCategoriesSelector(state),
  bookmarkArticles: bookmarkArticlesSelector(state),
  historyArticles: historyArticlesSelector(state),
})

const mapDispatchToProps = dispatch => ({
  toggleModalPersonalize: ({ isOpenModal, dataModal }) => 
    dispatch(toggleModalPersonalize({ isOpenModal, dataModal })),
  getBookmarkArticles: (data) => dispatch(fetchBookmarkArticles(data)),
  getMoreBookmarkArticles: ({ limit, page }) =>
    dispatch(fetchMoreBookmarkArticles({ limit, page })),
  getHistoryArticles: () =>
    dispatch(fetchHistoryArticles()),

})
export default withAppLoaded(connect(mapStateToProps, mapDispatchToProps)(UserIndex));
