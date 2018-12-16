import React from "react";
import { connect } from "react-redux";
import { Avatar, Row, Popconfirm } from "antd";
import { formatCommentReplyTime } from "../../utils/utils";
import { userSelector } from "../../user/userSelector";

const ListReplyComment = ({ user, reply_comments, onRemoveReplyComment }) => {
  return (
    <div className="reply-comments">
      {!reply_comments ||
      !Array.isArray(reply_comments) ||
      reply_comments.length < 1 ? (
        <div className="has-text-centered" />
      ) : (
        reply_comments.map(reply => {
          return (
            <div key={reply.reply_id} className="comment_item-container">
              <Row type="flex" className="comment_item">
                <div className="avatar_comment">
                  <Avatar src={reply.picture} />
                </div>
                <div className="body_comment">
                  <h4 className="user_comment">{reply.username}</h4>
                  <div className="content_comment">{reply.reply_content}</div>
                  <Row type="flex" justify="end" className="meta_comment">
                    {reply.reply_date && (
                      <div className="meta_comment__item">
                        {formatCommentReplyTime(reply.reply_date) || ""}
                      </div>
                    )}
                    <div className="meta_comment__item">
                      {	(user &&
                        user.userFirebaseID &&
                        user.id &&
                        user.id === reply.user_id) && (
                          <Popconfirm
                            title="Bạn muốn xóa phản hồi này ?"
                            className="has-text-danger"
                            onConfirm={onRemoveReplyComment(reply.reply_id)}
                            onCancel={onRemoveReplyComment()}
                            okText="Đồng ý"
                            cancelText="Hủy bỏ"
                          >
                            Xóa
                          </Popconfirm>
                        )}
                    </div>
                  </Row>
                </div>
              </Row>
            </div>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: userSelector(state)
});
export default connect(mapStateToProps)(ListReplyComment);
