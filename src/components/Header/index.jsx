import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import Link from 'next/link';
import { Menu, Dropdown, Affix, Icon, Avatar} from 'antd';
import queryString from 'query-string';
import { isEmpty, isEqual } from 'lodash';
import { toggleModalPersonalize, toggleModalOverflow, toggleModalLogin } from "../../modal/modalActions";
import { userLogout, userLogin } from "../../user/userActions";
import { anonymousLogin } from '../../lib/firebaseLib';
import { dataServerForAnonymousUser } from "../../utils/utils";
// import SearchInput from "./SearchInput";
// import { UPDATE_MODAL_PESONALIZE, UPDATE_MODAL_LOGIN, UPDATE_MODAL_OVERLAY, UPDATE_USER_LOG_OUT, UPDATE_FAVORITE_CATEGORY, UPDATE_USER_LOGIN_SUCCESS } from "../../actions";
// import { anonymousLogin, saveDataFirebase } from "../../utils/firebase";
// import { dataServerForAnonymousUser, formatInfoUserToSaveLocal } from "../../utils/utils";
// import { apiUser } from "../../api";


class HeaderContainer extends PureComponent {

  constructor(props){
    super(props);
    this.refNavItems = {};
    this.refComponent = {
      searchKeyword: null
    };
    this.refHeaderContainer = {};
    this.categories = [
    ];
    this.state = {
      openSearch : false,
      keyword : '',
      categories : props.categories || [],
      favorite_categories: props.categories || [],
      others_category: [],
      openOthersLink: false,
      currentCodeCategory: ''
    }
  }
  componentDidMount() {
    // window.addEventListener("scroll", this.handleScroll, { passive: true });
    // this.handleScroll();
    this._handleGetCategoryMenu();
    this.getActiveClassLink();
  }
  componentDidUpdate(prevProps) {
    if(this.props.categories && this.props.categories !== prevProps.categories){
      this._handleGetCategoryMenu();
    }
    if(!isEqual(this.props.favorite_categories,prevProps.favorite_categories)){
      this._handleGetCategoryMenu();
    }
    if(window.location.search) {
      this.getActiveClassLink();
    }
  }

  getActiveClassLink = () => {
    const { search } = window.location;
    const paramsParsed = queryString.parse(search);
    if(paramsParsed && paramsParsed.code) {
      this.setState({ currentCodeCategory: paramsParsed.code });
    }
  }

  handleScroll = () => {
    window.onscroll = function() {myFunction()};

    // Get the header
    const header = document.getElementById("my-header");

    // Get the offset position of the navbar
    const sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("container-header--fixed");
      } else {
        header.classList.remove("container-header--fixed");
      }
    }

    return;
    
  }

  formatOtherCategory = (others_category) => {
    if(!others_category || isEmpty(others_category)) return null;

    const { router } = this.props; 

    const menu = (
      <Menu>
        { others_category.map(category => {
            return (
              <Menu.Item key={'other' + category.id}>
                <Link 
                  href={{
                    pathname: '/category',
                    query: {
                      id: category.id,
                      code: category.code
                    }
                  }}
                  // as={`/category/${category.code}`} href={`/category?code=${category.code}`}
                >
                  <a
                    className={`btn-others-link ${
                        (router.query && router.query.code && router.query.code == category.code)
                        ? "has-text-error"
                        : ""  
                      }`}
                    >
                    {category.name}
                  </a>
                </Link>
              </Menu.Item>
            )
          })

        }
      </Menu>
    )

    return menu;

  }

  toggleModalLogin = () => {
    this.props.toggleModalLogin({ isOpenModal: true, dataModal: {} })
    // this.props.dispatch({
    //   type: UPDATE_MODAL_LOGIN,
    //   data: { isOpen: true }
    // });
  }
  
  _handleGetCategoryMenu = () =>{
    const { categories, favorite_categories } = this.props;
    const others_category = [];
    if(!isEmpty(favorite_categories) && !isEmpty(categories)){
      const favorite_ids = favorite_categories.map(ele => ele.id);
      categories.forEach((category) =>{
        if(favorite_ids.indexOf(category.id) < 0){
          others_category.push(category);
        }
      });
    }
    this.setState((precState) => (
      {
        categories,
        favorite_categories,
        others_category
      }
    ));
  }

  onHandleSearch = (e) =>{
    const keyword = e.target.value;
    this.setState({ keyword });
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.props.userLogout();
    this.toggleModalOverlay(true, {});
    anonymousLogin(firebaseData => {
      const firebaseUser = firebaseData.user; 
      const paramsLogin = {
        email: dataServerForAnonymousUser.email,
        username: dataServerForAnonymousUser.username,
        picture: dataServerForAnonymousUser.picture,
        token: firebaseUser.uid,
        type: 2
      };
      const dataLogin = {
        paramsLogin,
        firebaseUser,
        authResponseFb: {},
        callbackLoginSuccess: null,
      };
      this.props.userLogin(dataLogin);
    });
  }

  toggleModalOverlay = (isOpenModal, dataModal = {}) => {
    this.props.toggleModalOverflow({ isOpenModal, dataModal });
  }

  toggleModalPersonalize = () => {
    this.props.toggleModalPersonalize({ isOpenModal: true, dataModal: {} });
  }
  
  render() {
    const { favorite_categories, categories, others_category, currentCodeCategory } = this.state;
    const router = this.props.router || {};
    const { isLogin, user } = this.props;
    return(
      <Affix offsetTop={0}>
        <div className="container-header"
        id="my-header"
        ref={ref => this.refHeaderContainer = ref}
        >
          <div className="top-header">
            <div className="leftNav">
              <Link  href="/" >
                <a>
                  <img style={{ maxWidth: 40, marginRight: 10, position: 'relative', top: -5 }} src="/static/img/bold-news-logo-red.png"/>
                </a>
              </Link>
              {
                isLogin && 
                <button className="button-none"
                  onClick={this.toggleModalPersonalize}
                >
                Danh mục của bạn
              </button> 
              }
            </div>
            <div className="rightNav">
              <nav className="nav_links">
                {/* <SearchInput {...this.props}/> */}
                {
                  (isLogin && user && !user.isAnonymous) 
                  ? <>
                      <Link href='/profile'>
                        <a>
                        { !isEmpty(user) && user.picture 
                          ? <Avatar src={user.picture} shape="square"/>
                          : <Avatar src="http://dummyimage.com/100x100/a3f279/757575.png&text=a" shape="square" />
                        }
                        </a>
                      </Link>
                       <span style={{ cursor:'pointer' }} onClick={this.handleLogout}>
                          <i className="icon ion-md-log-out" style={{ fontSize: 20, margin: '0 10px', position: 'relative', top: 2 }} />
                       </span>
                    </>
                  : <button
                      className="button-none"
                      onClick={this.toggleModalLogin}
                    >
                    Đăng nhập
                  </button>  
                }
              </nav>
            </div>
          </div>
          <div className="bottom-header-container">
            <div
              ref={navItems => (this.refNavItems = navItems)}
              className="navItems"
              onScroll={() => {
                window.scrollY;
              }}
            >

            {
              (!isEmpty(favorite_categories) && isLogin)
              ? favorite_categories.map((menu, index) =>(
                  <Link
                    key={`menu-item-${index}`}
                    href={{
                      pathname: '/category',
                      query: {
                        id: menu.id,
                        code: menu.code
                      }
                    }}
                  >
                    <a
                      className={`menu-link-header ${
                          (currentCodeCategory == menu.code)
                          ? "has-text-error"
                          : ""  
                        }`}
                      >
                      {menu.name}
                    </a>
                  </Link>
                ))
              : !isEmpty(categories) 
              ? categories.map((menu) =>(
                <Link 
                  key={`menu-item-${menu.id}`}
                  href={{
                    pathname: '/category',
                    query: {
                      id: menu.id,
                      code: menu.code
                    }
                  }}
                >
                  <a
                    className={`menu-link-header ${
                        (currentCodeCategory == menu.code)
                        ? "has-text-error"
                        : ""  
                      }`}
                    >
                    {menu.name}
                  </a>
                </Link>
              ))
              : null 
            }
            { (!isEmpty(others_category) && isLogin) && 
                <Dropdown overlay={this.formatOtherCategory(others_category)} trigger={['click']}>
                  <a className="ant-dropdown-link btn-others-link" href="#">
                    Danh mục khác <Icon style={{ marginLeft: 10}} type="down" />
                  </a>
                </Dropdown>
            }
            </div>
          </div>
        </div>
      </Affix>
    );                  
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.root.categories,
    favorite_categories: state.user.favorite_categories,
    user: state.user.user,
    isLogin: state.user.isLogin,
  }
}
const mapDispatchToProps = dispatch => ({
  toggleModalPersonalize: ({ isOpenModal, dataModal }) => 
    dispatch(toggleModalPersonalize({ isOpenModal, dataModal })),
  toggleModalOverflow: ({ isOpenModal, dataModal }) =>
    dispatch(toggleModalOverflow({ isOpenModal, dataModal })),
  toggleModalLogin: ({ isOpenModal, dataModal }) =>
    dispatch(toggleModalLogin({ isOpenModal, dataModal })),
  userLogout: () => dispatch(userLogout()),
  userLogin: (data) => dispatch(userLogin(data))

})

export default (connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
