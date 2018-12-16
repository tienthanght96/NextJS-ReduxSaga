import { withRouter } from 'next/router';
import HeaderContainer from "./Header";
import ModalOverflow from '../modal/ModalOverflow';
import ModalPersonalize from '../modal/ModalPersonalizeCategory';
import ModalLogin from '../modal/ModalLogin';
const Layout = props => (
  <div>
    <HeaderContainer router={props.router || {}} />
    <ModalOverflow />
    <ModalPersonalize />
    <ModalLogin />
    <div className={props.classNameContent || "container-layout"}>
      {props.children}
    </div>
  </div>
);

export default withRouter(Layout);
