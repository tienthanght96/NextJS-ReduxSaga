import React, { PureComponent } from "react";
import { getDataFirebase } from '../../lib/firebaseLib';

class TotalCommentArticle extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalComment: 0
    };
  }

  componentDidMount() {
    this.handleLoadTotalComment();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.article_id &&
      this.props.article_id !== prevProps.article_id
    ) {
      this.handleLoadTotalComment();
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleLoadTotalComment = async () => {
    const { article_id } = this.props;
    if (article_id && +article_id > 0) {
      const response =
        (await getDataFirebase(`articles/${article_id}/article_comments`)) || 0;
      if (!this.isUnmounted && response && Object.keys(response).length > 0) {
        this.setState({ totalComment: Object.keys(response).length });
        return;
      }
    }
  };

  render() {
    const { totalComment } = this.state;
    const { isHideIcon } = this.props;
    return (
      <span>
        {!isHideIcon &&
          <i
            className="icon ion-ios-chatbubbles"
            style={{ fontSize: 20, marginRight: 5, position: "relative", top: 2 }}
          />
        }
        {totalComment || 0}
      </span>
    );
  }
}

export default TotalCommentArticle;
