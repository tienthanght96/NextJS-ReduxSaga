import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Row, Button, message } from "antd";
import FacebookLoginButton from "../FacebookLoginButton";
import { saveDataFirebase } from "../../lib/firebaseLib";
import { getUnixTime, formatCurrentUnixTime } from "../../utils/utils";
import { userSelector } from "../../user/userSelector";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
};

class FormReplyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmiiting: false,
      replyCommentValue: ""
    };
  }

  handleChangeInput = event => {
    const replyCommentValue = event.target.value;
    this.setState({ replyCommentValue });
  };

  handleSubmitReplyComment = async () => {
    const { replyCommentValue } = this.state;
    const {
      article_id,
      user,
      comment_id,
      onSubmitReplyCommentSuccess
    } = this.props;
    const { userFirebaseID } = user;
    if (
      !replyCommentValue ||
      replyCommentValue.length < 1 ||
      !userFirebaseID ||
      !article_id
    )
      return;
    const currentUnixTime = getUnixTime();
    const nodePath = `articles/${article_id}/article_comments/${comment_id}/reply_comments/reply_${comment_id}_${currentUnixTime}`;
    this.setState({ isSubmiiting: true });

    try {
      const dataReplyComment = {
        user_id: user.id,
        picture: user.picture || "",
        username: user.username || "",
        reply_content: replyCommentValue,
        reply_id: `reply_${comment_id}_${currentUnixTime}`,
        reply_date: currentUnixTime
      };
      // console.log('dataReplyComment', { dataReplyComment, nodePath, props: this.props })
      await saveDataFirebase(nodePath, dataReplyComment);
      this.setState({ isSubmiiting: false, replyCommentValue: "" });
      typeof onSubmitReplyCommentSuccess === "function" &&
        onSubmitReplyCommentSuccess(dataReplyComment);
    } catch (error) {
      console.log("error", error);

      this.setState({ isSubmiiting: false });
      message.error("Chưa thể thêm phản hồi cho bình luận ! Vui lòng thử lại");
    }
  };

  handleOnKeyDown = event => {
    if (event.keyCode == 13) {
      this.handleSubmitReplyComment();
    }
  };

  render() {
    const { user } = this.props;
    const { isSubmiiting, replyCommentValue } = this.state;
    if (user && (user.isAnonymous === false || user.type == 1)) {
      return (
        <Row>
          <br />
          <FormItem {...formItemLayout}>
            <Input
              placeholder="Thêm phản hồi của bạn về bình luận..."
              value={replyCommentValue}
              onChange={this.handleChangeInput}
              disabled={isSubmiiting}
              onKeyDown={this.handleOnKeyDown}
              multiple
            />
          </FormItem>
          <div className="has-text-right">
            <Button
              onClick={this.handleSubmitReplyComment}
              type="danger"
              disabled={!replyCommentValue || replyCommentValue.length < 1}
              loading={isSubmiiting}
              style={{
                opacity:
                  !replyCommentValue || replyCommentValue.length < 1 ? 0.7 : 1
              }}
              className="has-text-white has-background-danger"
            >
              Gửi phản hồi
            </Button>
          </div>
        </Row>
      );
    }

    return (
      <Row>
        <FacebookLoginButton />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state)
});

export default connect(mapStateToProps)(FormReplyComment);
