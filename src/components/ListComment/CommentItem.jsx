import React, { PureComponent, Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty, map } from 'lodash'
import { List, Avatar, Skeleton, Popconfirm, Row, Modal } from 'antd'
import ListReplyComment from './ListReplyComment'
import FormReplyComment from '../FormReplyComment'
import { removeDataFirebase } from '../../lib/firebaseLib';
import { userSelector } from '../../user/userSelector';

class CommentItemContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isToggleReply: false,
			isToggleFormReply: false,
			comment: {}
		}
	}

	componentDidMount() {
		this.handleInitComment()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.comment.id !== this.props.comment.id) {
			this.handleInitComment()
		}
	}

	handleInitComment = () => {
		const { comment } = this.props
		if (comment) {
			if (!comment.reply_comments) {
				comment.reply_comments = []
			} else {
				comment.reply_comments = map(comment.reply_comments, reply => reply)
			}
			this.setState({ comment })
		}
	}

	handleToggleReply = () => {
		this.setState(prevState => ({ isToggleReply: !prevState.isToggleReply }))
	}

	handleToggleFormReply = () => {
		const { user } = this.props;
		if(!user || !(+user.id) || user.isAnonymous){
			Modal.error({
				title: 'Bạn cần đăng nhập để phản hồi về bình luận này!',
				okText: "Đóng"
			});
			return;
		}
		this.setState(prevState => ({
			isToggleFormReply: !prevState.isToggleFormReply
		}))
	}

	onRemoveComment = comment_id => () => {
		if (comment_id) {
			typeof this.props.onDeleteCommentSuccess === 'function' &&
				this.props.onDeleteCommentSuccess(comment_id)
		}
	}

	onRemoveReplyComment = (reply_id) => async () => {
		const { comment } = this.state;
		const { article_id } = this.props;

		if (reply_id && comment.comment_id && article_id) {
			try {
        const nodePath = `articles/${article_id}/article_comments/${comment.comment_id}/reply_comments/${reply_id}`;
				await removeDataFirebase(nodePath);
				const newList = comment.reply_comments.filter(reply => reply.reply_id !== reply_id);
				this.setState(prevState => ({
					comment: {
						...prevState.comment,
						isToggleFormReply: false,
						reply_comments: newList
				}}));
			} catch (error) {
				console.log(error)
			}
		}
	}

	onSubmitReplyCommentSuccess = replyComment => {
		if (replyComment && replyComment.reply_id) {
			this.setState(prevState => ({
				isToggleFormReply: false,
				isToggleReply: true, 
				comment: {
					...prevState.comment,
					reply_comments: [...prevState.comment.reply_comments, replyComment]
			}}))
		}
	}

	render() {
		const { user, article_id } = this.props
		const { isToggleReply, isToggleFormReply, comment } = this.state

		return (
			<div className="comment_item-container">
				<Row type="flex" className="comment_item">
					<div className="avatar_comment">
						<Avatar src={comment.picture} />
					</div>
					<div className="body_comment">
						<h4 className="user_comment">{comment.username}</h4>
						<div className="content_comment">{comment.comment_content}</div>
						<Row type="flex" justify="end" className="meta_comment">
							{comment.comment_date && (
								<div className="meta_comment__item">{comment.comment_date}</div>
							)}
							<div className="meta_comment__item">
								<span onClick={this.handleToggleFormReply}>
									<i
										className="icon ion-ios-share-alt"
										style={{
											fontSize: 20,
											position: 'relative',
											top: 2,
											marginRight: 10
										}}
									/>
									Phản hồi
								</span>
							</div>
							<div className="meta_comment__item">
								{	(user &&
									user.userFirebaseID &&
									user.id &&
									user.id === comment.user_id) && (
										<Popconfirm
											title="Bạn muốn xóa bình luận này ?"
											className="has-text-danger"
											onConfirm={this.onRemoveComment(comment.comment_id)}
											onCancel={this.onRemoveComment()}
											okText="Đồng ý"
											cancelText="Hủy bỏ"
										>
											<i
												className="icon ion-ios-trash"
												style={{
													fontSize: 20,
													position: 'relative',
													top: 2,
													marginRight: 10
												}}
											/>
											Xóa
										</Popconfirm>
									)}
							</div>
						</Row>
					</div>
				</Row>
				{isToggleFormReply && (
					<FormReplyComment
						article_id={article_id}
						comment_id={comment.comment_id}
						onSubmitReplyCommentSuccess={this.onSubmitReplyCommentSuccess}
					/>
				)}
				{comment.reply_comments &&
					!isEmpty(comment.reply_comments) &&
					(isToggleReply ? (
						<div style={{ marginLeft: 10 }}>
							<ListReplyComment
								reply_comments={comment.reply_comments}
								onRemoveReplyComment={this.onRemoveReplyComment}
							/>
							<div
								style={{ cursor: 'pointer' }}
								className="has-text-centered has-text-danger"
								onClick={this.handleToggleReply}
							>
								Ẩn phản hồi về bình luận ({comment.reply_comments.length})
							</div>
						</div>
					) : 
						<div
							className="has-text-centered has-text-danger"
							style={{ marginLeft: 10, cursor: 'pointer' }}
							onClick={this.handleToggleReply}
						>
							Xem phản hồi về bình luận ({comment.reply_comments.length})
						</div>
					)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: userSelector(state)
})

export default connect(mapStateToProps)(CommentItemContainer)
