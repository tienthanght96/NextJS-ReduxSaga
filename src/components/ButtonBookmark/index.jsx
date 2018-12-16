import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, message, Modal } from 'antd';
import { ArticleApi } from '../../api/ApiService'

class BookmarkArticleContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHandleAPI: false,
			isBookmark: false
		};
	}

	componentDidMount() {
		this._handleInitBookmarkStatus();
	}
    
	componentDidUpdate(prevProps){
		if(prevProps.checkBookmark !== this.props.checkBookmark){
			this._handleInitBookmarkStatus();
		}
	}
  
	_handleInitBookmarkStatus = () => {
		const { checkBookmark } = this.props;
		if (typeof checkBookmark === "boolean") {
			this.setState({ isBookmark: checkBookmark });
			return;
		}
	}
  
	handleClickBookmark =  async () => {
		const { article_id, user, onHandleBookmarkSuccess } = this.props;
		
		if(!article_id ||!user || !(+user.id) || user.isAnonymous){
				// message.error("Bạn cần đăng nhập !");
				Modal.error({
					title: 'Bạn cần đăng nhập để đánh dấu bài viết này!',
					okText: "Đóng"
				})
				return;
		}
		this.setState({ isHandleAPI: true });

		try {
			const response = await ArticleApi.bookmarkArticle(user.id, article_id);
			if(response){
				this.setState(prevState => ({ isBookmark: !prevState.isBookmark, isHandleAPI: false }));
				typeof onHandleBookmarkSuccess === 'function' && onHandleBookmarkSuccess(article_id);
				return;
			}
			throw response;
		} catch (error) {
			this.setState({ isHandleAPI: false });
		}
	}
    
	render() {
		const { isBookmark, isHandleAPI } = this.state;
		const { style, title, classNameContainer } = this.props;
		const bookmarkedClassName = isBookmark ? 'has-text-danger' : '';
		return (
			<span
				className={`${classNameContainer || ''}`}
				style={{
						padding: '0 10px',
						cursor: 'pointer'
				}}
			>
			{	(isHandleAPI)
				? <Icon type="loading" style={style ? style : { }} />
				: <span onClick={this.handleClickBookmark} style={style ? style : { width: 20 }}>
						<i className={`icon ion-ios-bookmark ${bookmarkedClassName}`} style={{ fontSize: 20, position: 'relative', top: 2 }} />
					</span>
			}
			{	title &&
					<span style={{ marginLeft: 8 }}>Đánh dấu</span>
			}
			</span>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user.user,
	}
}
export default connect(mapStateToProps)(BookmarkArticleContainer);