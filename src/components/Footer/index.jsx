import { Col, Row, Icon, Input, Button, Tag, List, Skeleton } from 'antd';
import Link from 'next/link'
import { asserts } from '../../utils/config';
import { formatCommentReplyTime } from '../../utils/utils';

export default function Footer({ categories, newestList }) {
  return (
    <footer className="site-footer">
      <Row className="site-footer__wrapper">
        <Col sm={24} xl={8} md={24} className="footer_col">
          <h4 className="title_footer">
            <span>Về chúng tôi</span>
            <i className="icon ion-ios-bulb"/>
          </h4>
          <hr />
          <p><strong>Megga News </strong>- Website tổng hợp tin và cá nhân hoá cho mỗi người theo sở thích</p>
          <br />
          <br />
          <h4 className="title_footer">
            <img className="title_footer__image" src="/static/img/megganews-whitelogo.png"/>
            <span>Megga News</span>
          </h4>
          <section className="megga_info">
            <p>
              <i className="icon ion-ios-home"/>
              Trường Đại học Công nghệ thông tin - Đại học Quốc gia Thành phố Hồ Chí Minh
            </p>
            <p>
              <i className="icon ion-ios-compass"/>
              Khu phố 6, P.Linh Trung, Q.Thủ Đức, Tp.Hồ Chí Minh.
            </p>
            <p>
              <i className="icon ion-ios-call"/>
              (028) 372 52002
            </p>
            <p>
              <i className="icon ion-ios-mail-open"/>
              info@uit.edu.vn
            </p>
          </section>
        </Col>
        <Col sm={24} xl={8} md={24} className="footer_col">
          <h4 className="title_footer">
            <span>Tin mới nhất</span>
            <i className="icon ion-ios-send"/>
          </h4>
          <hr />
          <section className="footer__lasted-news">
            <List
              itemLayout="horizontal"
              dataSource={newestList.slice(0,5) || []}
              loading={newestList.length < 1}
              locale=""
              renderItem={item => (
                <List.Item className="footer__lasted-news__item" style={{ borderBottom: 'none' }}>
                  <Skeleton avatar title={false} active={false} loading={false}>
                    <List.Item.Meta
                      avatar={
                        <div
                          className="news__image"
                          style={{
                            backgroundImage: `url(${item.picture ||asserts.noImage})`,
                            backgroundSize: item.picture ? "contain" : "contain",
                          }}
                        />
                      }
                      title={
                        <Link href={`/article?id=${item.id}`}>
                          <a className="has-text-weight-bold">{item.title}</a>
                        </Link>
                      }
                      description={
                        item.date ? (
                          <div className="has-text-white">
                            <Icon
                              type="clock-circle"
                              theme="outlined"
                              style={{ marginRight: 8 }}
                            />
                            <span style={{ marginRight: 10 }}>
                              {formatCommentReplyTime(+item.date / 1000)}
                            </span>
                          </div>
                        ) : null
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </section>
        </Col>
        <Col sm={24} xl={8} md={24} className="footer_col">
          <h4 className="title_footer">
            <span>Đăng kí nhận tin</span>
            <i className="icon ion-ios-send"/>
          </h4>
          <hr />
          <section className="footer__sendmail">
            <Input placeholder="Email..." />
            <br /> <br />
            <Button className="has-background-danger has-text-white" type="danger">Đăng kí</Button>
          </section>
          <br />
          <br />
          <h4 className="title_footer">
            <span>Danh mục</span>
            <i className="icon ion-ios-apps"/>
          </h4>
          <hr />
          <section className="footer_categories">
            { categories && categories.map(item => (
                <Link
                  key={item.id}
                  href={{
                    pathname: '/category',
                    query: {
                      id: item.id,
                      code: item.code
                    }
                  }}
                >
                  <a>
                    <Tag color="#108ee9">{item.name}</Tag>
                  </a>
                </Link>
              ))
            }
          </section>
        </Col>
      </Row>
      <div className="site-footer__bottom">
        © Copyright 2018 Powered by <strong>Megga</strong>
      </div>
    </footer>
  );
};