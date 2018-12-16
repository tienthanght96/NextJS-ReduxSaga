import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Row, Button, message, Card } from "antd";
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

class FormComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmiiting: false,
      commentValue: ""
    };
  }

  handleChangeInput = event => {
    const commentValue = event.target.value;
    this.setState({ commentValue });
  };

  handleSubmitComment = async () => {
    const { commentValue } = this.state;
    const { article_id, user, onSubmitCommentSuccess } = this.props;
    const { userFirebaseID } = user;
    if (
      !commentValue ||
      commentValue.length < 1 ||
      !userFirebaseID ||
      !article_id
    )
      return;
    const currentUnixTime = getUnixTime();
    const nodePath = `articles/${article_id}/article_comments/comment_${article_id}_${currentUnixTime}`;
    this.setState({ isSubmiiting: true });

    try {
      const dataComment = {
        user_id: user.id,
        picture: user.picture || "",
        username: user.username || "",
        comment_content: commentValue,
        comment_id: `comment_${article_id}_${currentUnixTime}`,
        comment_date: formatCurrentUnixTime(currentUnixTime)
      };
      await saveDataFirebase(nodePath, dataComment);
      this.setState({ isSubmiiting: false, commentValue: "" });
      typeof onSubmitCommentSuccess === "function" &&
        onSubmitCommentSuccess(dataComment);
    } catch (error) {
      console.log("error", error);

      this.setState({ isSubmiiting: false });
      message.error("Chưa thể thêm bình luận ! Vui lòng thử lại");
    }
  };

  handleOnKeyDown = event => {
    if (event.keyCode == 13) {
      this.handleSubmitComment();
    }
  };

  render() {
    const { user } = this.props;
    const { isSubmiiting, commentValue } = this.state;
    if (user && (user.isAnonymous === false || user.type == 1)) {
      return (
        <Row>
          <br />
          <FormItem {...formItemLayout}>
            <Input.TextArea
              placeholder="Thêm bình luận của bạn..."
              rows={4}
              value={commentValue}
              onChange={this.handleChangeInput}
              disabled={isSubmiiting}
              onKeyDown={this.handleOnKeyDown}
            />
          </FormItem>
          <div className="has-text-right">
            <Button
              onClick={this.handleSubmitComment}
              type="danger"
              disabled={!commentValue || commentValue.length < 1}
              loading={isSubmiiting}
              style={{
                opacity: !commentValue || commentValue.length < 1 ? 0.7 : 1
              }}
              className="has-text-white has-background-danger"
            >
              Gửi bình luận
            </Button>
          </div>
        </Row>
      );
    }

    return (
      <Card style={{ marginTop: 30 }}>
        <FacebookLoginButton />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelector(state)
});

export default connect(mapStateToProps)(FormComment);
