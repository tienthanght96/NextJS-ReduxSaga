import React, { Component } from "react";
import { Row, Col, Card } from "antd";

export default function ListFavoriteCategories({ favoriteCategories, toggleModalPersonalize }){
  return (
    <Row type="flex" justify="center" align="middle">
      { (favoriteCategories &&
        favoriteCategories.length > 0) &&
        favoriteCategories.map(category => {
          return (
            <Col
              key={category.id}
              sm={5}
              md={5}
              lg={5}
              style={{ padding: "1rem 1rem 1rem 0" }}
            >
              <Card hoverable>
                <div className="has-text-center">
                  <i className="icon ion-ios-book" style={{ fontSize: 45 }} />
                </div>
                <Card.Meta
                  title={category.name}
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textTransform: "uppercase"
                  }}
                />
              </Card>
            </Col>
          );
        })}
      <Col sm={5} md={5} lg={5} style={{ padding: "1rem 1rem 1rem 0" }}>
        <Card hoverable onClick={() => {
          toggleModalPersonalize({ isOpenModal: true, dataModal: {} })
        }}
        >
          <div className="has-text-center has-text-danger">
            <i className="icon ion-ios-add" style={{ fontSize: 45 }} />
          </div>
          <Card.Meta title="THÊM DANH MỤC" />
        </Card>
      </Col>
    </Row>
  );
};
