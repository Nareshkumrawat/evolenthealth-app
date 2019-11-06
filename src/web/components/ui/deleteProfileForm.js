import React, { Component, Fragment } from "react";
import Helper from "../../../../utils/helper";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import Loader from "../../../components/general/loaders/loader";

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
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
  placeholder,
  readOnly,
  meta: { touched, error, warning }
}) => (
  <Fragment>
    <input
      {...input}
      placeholder={placeholder}
      readOnly={readOnly}
      className="form-control"
      type={type}
    />
    {touched &&
      ((error && <span className="errorMsg">{error}</span>) ||
        (warning && <span className="warningMsg">{warning}</span>))}
    <label>{label}</label>
  </Fragment>
);

class deleteProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      user: { imageData },
      change
    } = this.props;
    if (prevProps.user.imageData !== imageData) {
      let imageUrl =
        Helper.getValue(imageData, "model", "") +
        "/" +
        Helper.getValue(imageData, "fileName", "");
      change("ProfilePic", imageUrl);
    }
  }

  render() {
    const {
      handleSubmit,
      user: { imageIsLoading }
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          id="profile-pic"
          className="form-control"
          name="ProfilePic"
          component={renderField}
          type="hidden"
          value=""
          placeholder=""
          validate={false}
        />

        <div className="form-inputs clearfix">
          <div className="form-group">
            <Field
              id="first-name"
              className="form-control"
              name="FirstName"
              component={renderField}
              type="text"
              value=""
              placeholder="First Name"
              validate={[required]}
            />
            <i className="icon-50 edit"></i>
          </div>

          <div className="form-group">
            <Field
              id="last-name"
              className="form-control"
              name="LastName"
              component={renderField}
              type="text"
              value=""
              placeholder="Last Name"
              validate={[required]}
            />
            <i className="icon-50 edit"></i>
          </div>

          <div className="form-group">
            <Field
              id="email"
              className="form-control"
              name="Email"
              component={renderField}
              type="text"
              value=""
              placeholder="Email"
              validate={[required, email]}
            />
            <i className="icon-50 edit"></i>
          </div>

          <div className="form-group">
            <Field
              id="phone-no"
              className="form-control"
              name="Phone No."
              component={renderField}
              type="text"
              value=""
              readOnly={true}
              placeholder="Phone No."
              validate={[required, maxLength10, minValue10]}
            />
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
          <button type="submit" className="btn btn-primary">
            Delete
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      FirstName: Helper.getValue(ownProps.user.profileData[0], "FirstName", ""),
      LastName: Helper.getValue(ownProps.user.profileData[0], "LastName", ""),
      PhoneNo: Helper.getValue(ownProps.user.profileData[0], "PhoneNo", ""),
      Email: Helper.getValue(ownProps.user.profileData[0], "Email", ""),
      StatusMode: Helper.getValue(ownProps.user.deleteData[0], "StatusMode", "")
    }
  };
}

deleteProfileForm.propTypes = {};

deleteProfileForm.defaultProps = {};
export default connect(mapStateToProps)(
  reduxForm({
    form: "personalDetail",
    destroyOnUnmount: false, // <------ preserve form data
    enableReinitialize: true
  })(deleteProfileForm)
);
