import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import FacebookLoginButton from "../components/FacebookLoginButton";
import { toggleModalLogin } from "./modalActions";
import { modalLoginSelector } from "./modalSelector";

class ModalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeHandler = () => {
    this.props.toggleModalLogin({ isOpenModal: false, dataModal: {} });
  };

  submitHandler = () => {};

  render() {
    const { modalLogin } = this.props;
    return (
      <Modal
        title="Đăng nhập"
        centered
        cancelText="Đóng"
        cancelButtonProps={{
          type: "danger"
        }}
        visible={modalLogin.isOpenModal}
        onCancel={this.closeHandler}
        footer={null}
      >
        <div
          className="container-personalize text-left p-3"
          style={{ paddingBottom: "1.5rem" }}
        >
          <div className="content-personalize">
            {/* <h3 style={{ margin: "1.5rem 0", textAlign: "center" }}>
              Hãy đăng nhập để trải nghiệm tốt hơn
            </h3> */}
            <FacebookLoginButton callbackLoginSuccess={this.closeHandler} />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalLogin: modalLoginSelector(state)
});

const mapDispatchToProps = dispatch => ({
  toggleModalLogin: data => dispatch(toggleModalLogin(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalLogin);
