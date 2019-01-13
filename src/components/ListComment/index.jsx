import React, {Component} from 'react'
import { isEmpty, map, isEqual } from 'lodash';
import { message } from 'antd'
import { getDataFirebase, removeDataFirebase } from '../../lib/firebaseLib'
import FormComment from '../FormComment';
import CommentItem from './CommentItem'
import { Loading } from '../Loading';

const count = 3

class ListComment extends React.PureComponent {
	state = {
		initLoading: true,
		loading: false,
		data: [],
		list: [],
	}
	componentDidMount() {
		this.getCommentArticles(response => {

			if(this.isUnmounted) return;

			this.setState({
				initLoading: false,
				data: response,
				list: response
			})
		})
	}

	componentDidUpdate(prevProps) {
		if(!isEqual(this.props.article_id,prevProps.article_id)){
		//   this._handleInitFavotiteCategory();
			this.setState({ data: [], list: [] }, () => {
				this.getCommentArticles(response => {

					if(this.isUnmounted) return;
		
					this.setState({
						initLoading: false,
						data: response,
						list: response
					})
				})
			})
		}
	}

	componentWillUnmount(){
		this.isUnmounted = true;
	}

	getCommentArticles = async (callback) => {
		const { article_id } = this.props;
		
		if(!article_id) {
			this.setState({ initLoading: false });
			return
		};
		const pathNode = `articles/${article_id}/article_comments/`
		try {
			const response = await getDataFirebase(pathNode);
			if(response && !isEmpty(response)){
				const comments = map(response, (comment, comment_id) => ({ ...comment, comment_id }));
				callback(comments);
			} else {
				throw new response;
			}

		} catch (error) {
			callback([]);
		}
	}

	handleSubmitCommentSuccess = (dataComment) => {
		const list = this.state.list.concat(dataComment);
		this.setState({ list });
	}
	
	handleDeleteCommentSuccess = async (comment_id) => {
		if(comment_id){
			console.log('comment_id', comment_id)
			try {
				const pathNode = `articles/${this.props.article_id}/article_comments/${comment_id}`;
				await removeDataFirebase(pathNode)
				const list = [...this.state.list];
				const newList= list.filter(comment => comment.comment_id !== comment_id)
				this.setState({ list: newList });
			} catch (error){
				console.log('error', error)
				message.error("Chưa thể xóa bình luận này. Hãy thử lại");
			}
		}
	}

	render() {
		const { initLoading, list } = this.state
		const { article_id } = this.props;
		return (
			<div>
				<div className="box-title" style={{ marginTop: 20 }}>
					<h2 className="title-left">Bình luận({list.length})</h2>
				</div>
				{	initLoading
					? <div className="has-text-centered">
							<div><Loading /></div>
							<p className="has-text-danger">Đang tải...</p>
						</div>
					: list.length > 0
					?	list.map(comment =>
							<CommentItem
								key={comment.comment_id}
								article_id={article_id}
								comment={comment}
								onDeleteCommentSuccess={this.handleDeleteCommentSuccess}
							/>
						)
					: <div className="has-text-centered has-text-danger">Trở thành người bình luận đầu tiên !</div>
				}
				<FormComment article_id={article_id} onSubmitCommentSuccess={this.handleSubmitCommentSuccess}/>
			</div>
		)
	}
}
export default ListComment
