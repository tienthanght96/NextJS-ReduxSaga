import React from "react";
import { Spin, Icon } from "antd";

const ButtonLoadMore = props => (
  <div>
    <span
      onClick={typeof props.onLoadMore === "function" && props.onLoadMore}
      className={`button-load-more`}
    >
      { (props.isLoadMore)
       ? (
          <React.Fragment>
            <Spin />
            <span style={{ marginLeft: "1rem" }}>Đang tải</span>
          </React.Fragment>
        ) :
        (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span style={{ marginRight: "1rem" }}>Xem thêm</span>
            <Icon style={{ fontSize: "1.1rem" }} type="arrow-down" />
          </span>
        )
      }
    </span>
  </div>
);
export default ButtonLoadMore;
