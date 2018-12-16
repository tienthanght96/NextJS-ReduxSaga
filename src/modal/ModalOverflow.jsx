import { Spin, Alert, Modal } from "antd";
import { connect } from "react-redux";
import { modalOverflowSelector } from "./modalSelector";

const mapStateToProps = state => ({ modalOverflow: modalOverflowSelector(state) });

export default connect(mapStateToProps)(({ modalOverflow }) => {
  if (modalOverflow && modalOverflow.isOpenModal) {
    return (
      <div id="overlay">
        <div style={{ minWidth: 520, backgroundColor: "#f5f5f5" }}>
          <Spin>
            <Alert
              message="Đang thực hiện"
              description="Vui lòng đợi trong giây lát !."
              type="warning"
            />
          </Spin>
        </div>
      </div>
    );
  }
  return null;
});
