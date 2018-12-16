import React, { Component } from "react";
import { Row, Col } from "antd";
class QuoteOtherArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="quote-other">
        <div className="quote-other__title">
          Trung ương xem xét giới thiệu nhân sự để Quốc hội bầu Chủ tịch nước
        </div>
        <Row type="flex" justify="start">
          <Col xs={10} sm={10}>
            <div className="quote-other__image">
              <img src="https://i-vnexpress.vnecdn.net/2018/10/02/TBTphatbieukhaimac2-1538452745-1785-1538453280_140x84.jpg" />
            </div>
          </Col>
          <Col xs={14} sm={14}>
            <p className="quote-other__sapo">
              TPO - Tại Hội nghị Trung ương 8, Bộ Chính trị trình Trung ương xem
              xét, quyết định việc giới thiệu nhân sự để Quốc hội bầu Chủ tịch
              nước; bầu bổ sung Ủy viên Ủy ban Kiểm tra Trung ương khoá XII và
              xem xét, quyết định thi hành kỷ luật cán bộ theo quy định của
              Đảng.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default QuoteOtherArticle;
