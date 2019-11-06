import React from "react";
import Helmet from "react-helmet";
import "../../styles/landing.css";

export default class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTimeCall: false
    };
  }

  componentDidMount() {
    const {
      actions,
      crud: {
        getAllUserDetails,
        getUserDetailsById,
        updateUserDetailsById,
        deleteUserDetailsById,
        addUserDetails
      }
    } = this.props;
  }
}
