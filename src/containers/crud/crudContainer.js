/**
 * Initial pay in Container
 *
 */
import { connect } from "react-redux";

// Actions
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

// The component we're mapping to
import crud from "../web/routes/crud/crud";
import * as crudAction from "../redux/crud/actions";

/**
 * What data from the store shall we send to the component?
 *
 * @method mapStateToProps
 * @description Sets the state properties to map to the Redux store instance
 *
 * @param state
 * @returns {{initialPayIn: state.initialPayIn}}
 */

const mapStateToProps = state => ({
  cruds: state.crud
});

/**
 * Any actions to map to the component?
 *
 * @method mapDispatchToProps
 * @description Sets the action properties to map to the Redux actions
 * @param dispatch {Function} dispatch function from react-redux
 * @returns {{actions: *}}
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

// Export the connected Redux-React component
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(crud)
);
