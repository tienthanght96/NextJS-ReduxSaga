import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, message, Card } from 'antd';
import { loginFaceBook, getProfileFaceBook } from '../../lib/facebook';
import { firebaseAuth } from '../../lib/firebaseLib';
import { toggleModalOverflow } from '../../modal/modalActions';
import { userLogin } from '../../user/userActions';

class FacebookLoginButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	loginHandler = async () => {
		try {
			this.props.toggleModal({ isOpenModal: true, dataModal: {} });
			loginFaceBook(response => {
				if(response && response.status === 'connected'){
					const { authResponse } = response;
					getProfileFaceBook(async profile => {
						if(profile){
							firebaseAuth(authResponse.accessToken, async (firebaseUser) => {
								const { email, displayName, photoURL, uid } = firebaseUser;
								const paramsLogin = {
									email,
									username: displayName,
									picture: photoURL,
									token: uid || authResponse.userID,
									type: 1
								};
								const dataLogin = {
									paramsLogin,
									firebaseUser,
									authResponseFb: authResponse,
									callbackLoginSuccess: this.props.callbackLoginSuccess || null,
								};
								this.props.userLogin(dataLogin);
							});
						}
					});
					return;
				} else {
					console.log('error login', response)
					this.props.toggleModal({ isOpenModal: false, dataModal: {} });
				}
			})
		} catch (error) {
			this.props.toggleModal({ isOpenModal: false, dataModal: {} });
			console.log('eror', error);
		}
	}

	render() {
		return (
			<div className="has-text-center">
				<h2 className="has-text-danger">Bạn chưa đăng nhập. Đăng nhập ngay !</h2>
				<Button onClick={this.loginHandler} size="large" type="primary">
					<Icon type="facebook" theme="outlined" />
					Đăng nhập với Facebook
				</Button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	userLogin: (data) => dispatch(userLogin(data)),
	toggleModal: ({ isOpenModal, dataModal }) => dispatch(toggleModalOverflow({ isOpenModal, dataModal }))
})

export default connect(null, mapDispatchToProps)(FacebookLoginButton);