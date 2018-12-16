import React, { PureComponent } from "react";
import { Tabs, Icon } from "antd";
import BookmarkArticles from "./BookmarkArticles";
import ReadArticles from "./ReadArticles";
import FavoriteCategories from "./FavoriteCategories";

class TabsProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabActive: 1
    };
  }
  render() {
    const { tabActive } = this.state;
    return (
      <Tabs defaultActiveKey={`${tabActive}`}>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="book" theme="filled" />
              Tin đã đánh dấu
            </span>
          }
          key="1"
        >
          <BookmarkArticles {...this.props}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="heart" theme="filled" />
              Danh mục yêu thích
            </span>
          }
          key={"2"}
        >
          <FavoriteCategories {...this.props}/>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <i
                className="icon ion-ios-book"
                style={{
                  fontSize: 20,
                  marginRight: 10,
                  position: "relative",
                  top: 2
                }}
              />
              Các bài viết vừa đọc
            </span>
          }
          key={"3"}
        >
          <div>
            <ReadArticles {...this.props}/>
          </div>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default TabsProfile;
