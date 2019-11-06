import React, { Fragment, Component } from "react";
import Loader from "../../general/loaders/loader";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.min.css";
import { Field, reduxForm } from "redux-form";
import Helper from "../../../../utils/helper";
import { connect } from "react-redux";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters` : undefined;
const maxLength10 = maxLength(10);
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue10 = minValue(10);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="group">
    <input {...input} type={type} />
    {touched &&
      ((error && <span className="errorMsg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
    <label>{label}</label>
  </div>
);

class addUserDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExistingStatusMode: false
    };
  }

  componentDidMount() {
    const { selectionStack } = this.props;
    if (
      !Helper.isObjectEmpty(selectionStack) &&
      !Helper.isObjectEmpty(selectionStack["Customer"])
    ) {
      let checkx = Helper.getValue(selectionStack["Customer"], "chex");
      if (checkx) {
        this.setState({ selectedStatusMode: true });
      } else {
        this.setState({ selectedStatusMode: false });
      }
    }
  }

  componentDidUpdate(prevProps) {}

  existingStatus = () => {
    const { selectedStatusMode } = this.state;
    this.setState({ selectedStatusMode: !selectedStatusMode });
  };

  renderSelect({
    value,
    input,
    label,
    type,
    id,
    data,
    meta: { touched, error }
  }) {
    id = id || input.name;
    return (
      <div className="group">
        <Select2
          multiple={false}
          onChange={value => input.onChange(value)}
          value={input.value}
          data={data}
          name={input.name}
          data-minimum-results-for-search="Infinity"
          options={{
            placeholder: "Please Select"
          }}
        />
        {touched && error && (
          <div className="errorMsg bg-warning x">{error}</div>
        )}
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }

  render() {
    const { handleSubmit, isUserLeadLoading } = this.props;

    return (
      <Fragment>
        <div className="clearfix btd-form your-details-btd">
          <h2> Your details </h2>
          {isUserLeadLoading ? <Loader loaderType="spinner" /> : ""}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <Field
                  id="first-name"
                  name="FirstName"
                  component={renderField}
                  type="text"
                  label="First Name*"
                  validate={[required]}
                />
              </div>
              <div className="col-sm-6">
                <Field
                  id="last-name"
                  name="LastName"
                  type="text"
                  component={renderField}
                  label="Last Name*"
                  validate={[required]}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <Field
                id="email"
                name="Email"
                component={renderField}
                label="Email*"
                type="text"
                validate={[required, email]}
              />
            </div>
            <div className="row">
              <div className="col-sm-6">
                <Field
                  id="phone-no"
                  name="UserContact"
                  component={renderField}
                  label="Phone No.*"
                  type="text"
                  validate={[required, number, maxLength10, minValue10]}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 clearfix">
                <div className="group existing-vehicle clearfix">
                  <p className="valuept">StatusMode </p>
                  <div className="exisv clearfix">
                    <div className="switch">
                      <Field
                        id="checkbx"
                        name="chex"
                        component="input"
                        type="checkbox"
                        value={selectedExistingStatusMode}
                        onChange={() => this.existingStatusMode()}
                      />
                      <span className="toogle"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="btd-action clearfix">
              <div className="float-right">
                <button
                  type="submit"
                  className="btn btn-primary btd-btn-next ripplelink"
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      FirstName: Helper.getValue(
        ownProps.selectionStack.Customer,
        "FirstName",
        ""
      ),
      LastName: Helper.getValue(
        ownProps.selectionStack.Customer,
        "LastName",
        ""
      ),
      UserEmail: Helper.getValue(ownProps.selectionStack.Customer, "Email", ""),
      UserContact: Helper.getValue(
        ownProps.selectionStack.Customer,
        "Mobile",
        ""
      )
    }
  };
}
export default connect(mapStateToProps)(
  reduxForm({
    form: "personalDetail",
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: false // <------ unregister fields on unmount
  })(PersonalDetailForm)
);
