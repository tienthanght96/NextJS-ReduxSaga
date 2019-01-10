import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, isEqual } from "lodash";

import { Modal, Button, Icon, message } from "antd";
import { allCategoriesSelector } from "../root/rootSelector";
import {
  userFavoriteCategoriesSelector,
  userSelector,
  isUpdatingFavoriteCategoriesSelector
} from "../user/userSelector";
import { modalPersonalizeSelector } from "./modalSelector";
import { toggleModalPersonalize } from "./modalActions";
import { updateFavoriteCategory } from "../user/userActions";

class IndexPersonalizeCategory extends Component {
  constructor(props) {
    super(props);
    this.refField = {};
    this.allCategories = [];
    this.state = {
      categories: [],
      filterValue: ""
    };
  }
  componentDidMount() {
    this._handleInitFavotiteCategory(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.favorite_categories, prevProps.favorite_categories)
    ) {
      this._handleInitFavotiteCategory();
    }
  }

  _handleInitFavotiteCategory = (props = this.props) => {
    const { categories, favorite_categories } = props;
    if (!isEmpty(categories)) {
      const categorieFavoriteIds = favorite_categories.map(cate => cate.id);
      const tempCategories = [];

      categories.forEach(category => {
        if (categorieFavoriteIds.indexOf(category.id) > -1) {
          tempCategories.push({ ...category, selected: true });
        } else {
          tempCategories.push({ ...category, selected: false });
        }
      });
      this.allCategories = [...tempCategories];
      this.setState({ categories: tempCategories });
    }
  };

  _handleSelectFavoriteCategory = categoryId => {
    // const { categories } = this.state;
    const newCategories = this.allCategories.map((category, i) => {
      if (category) {
        if (categoryId === category.id)
          return { ...category, selected: category.selected ? false : true };
        return category;
      }
    });
    this.allCategories = [...newCategories];
    this.setState({ categories: newCategories });
  };

  submitHandler = async () => {
    const { categories } = this.state;
    const favorite_categories = [];

    categories.forEach(category => {
      if (category && category.selected) {
        favorite_categories.push(category);
      }
      return;
    });
    const user = this.props.user || null;

    if (!user) return;

    const categorieIds = favorite_categories.map(cate => cate.id);
    this.props.updateFavoriteCategory({
      categorieIds,
      favorite_categories,
      callback: this.callbackUpdateFavoriteCategories
    });
  };

  callbackUpdateFavoriteCategories = (type) => {
    this.closeHandler();
    if(type === 'success') {
      Modal.success({
        title: "Cập nhật danh mục thành công",
        okText: "Đóng"
      });
      return;
    }
    Modal.error({
      title: "Đã có lỗi cập nhật danh mục ! Vui lòng thử lại.",
      okText: "Đóng"
    });
  }

  closeHandler = () => {
    this.props.toggleModal({ isOpenModal: false, dataModal: {} });
  };

  filterCategory = event => {
    clearTimeout(this.timeoutFilter);

    const filterValue = event.target.value;
    if (!filterValue || filterValue.lenght < 1) {
      this.setState({
        categories: [...this.allCategories],
        filterValue: ""
      });
      return;
    } else {
      this.setState({ filterValue });

      this.timeoutFilter = setTimeout(() => {
        const categories = this.allCategories.filter(
          category =>
            category &&
            category.name &&
            category.name.toLowerCase().match(filterValue.toLowerCase())
        );
        this.setState({ categories });
      }, 400);
    }
  };

  resetFilter = () => {
    this.setState({ categories: [...this.allCategories], filterValue: "" });
  };

  render() {
    const { categories, filterValue } = this.state;
    const { modalPersonalize, isUpdatingFavoriteCategories } = this.props;
    return (
      <Modal
        title="Danh mục yêu thích của bạn"
        centered
        cancelText="Đóng"
        confirmLoading={isUpdatingFavoriteCategories}
        cancelButtonDisabled={isUpdatingFavoriteCategories}
        closable={isUpdatingFavoriteCategories}
        okText="Hoàn tất"
        cancelButtonProps={{
          type: "danger"
        }}
        visible={modalPersonalize.isOpenModal}
        onOk={this.submitHandler}
        onCancel={this.closeHandler}
      >
        <div className="container-personalize text-left p-3">
          <div className="content-personalize">
            {/* <div className="container-button-skip">
              <Button
                type="danger"
                className="skip-now"
                onClick={this.closeHandler}
              >
                Bỏ qua
              </Button>
            </div> */}
            <h3 className="title">Cá nhân hóa sở thích</h3>
            <p>Chúng tôi sẽ chọn những bài viết theo chủ đề mà bạn chọn</p>
            <div className="container-search">
              <span className="icon-search">
                <Icon type="search" theme="outlined" />
              </span>
              <input
                className="input-search-personalize"
                value={filterValue}
                onChange={this.filterCategory}
                autoFocus
              />
              {filterValue.length > 1 && (
                <span
                  style={{ right: 0, left: "auto", cursor: "pointer" }}
                  className="icon-search"
                  onClick={this.resetFilter}
                >
                  <Icon type="delete" theme="outlined" />
                </span>
              )}
            </div>
            {!isEmpty(categories) && (
              <div className="list-personalize-category">
                {categories.map((category, index) => {
                  return (
                    <div
                      className={`item-list ${
                        category.selected ? "selected" : ""
                      }`}
                      key={"category-" + category.id}
                      onClick={() =>
                        this._handleSelectFavoriteCategory(category.id)
                      }
                    >
                      {category.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: allCategoriesSelector(state),
    favorite_categories: userFavoriteCategoriesSelector(state),
    modalPersonalize: modalPersonalizeSelector(state),
    user: userSelector(state),
    isUpdatingFavoriteCategories: isUpdatingFavoriteCategoriesSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  toggleModal: ({ isOpenModal, dataModal }) =>
    dispatch(toggleModalPersonalize({ isOpenModal, dataModal })),
  updateFavoriteCategory: (data) =>
    dispatch(updateFavoriteCategory(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPersonalizeCategory);
