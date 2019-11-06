import React from "react";
import Helper from "../../../../utils/helper";
import PopUp from "../../general/popUp";
import UpdateProfileForm from "./updateProfileForm";
import $ from "jquery";
import { SiteConstants } from "../../../../constants";
import Loader from "../../general/loaders/loader";

export default class ProfileOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopUp: false
    };
  }

  componentDidMount() {
    $(window).scroll(function(e) {
      if (scrollHeight >= divHeight) {
        $(".search-header").removeClass("is-fixed");
      } else {
        $(".search-header").removeClass("is-fixed");
      }
      var divHeight = $(".profile-banner").outerHeight();
      var scrollHeight = e.currentTarget.scrollY;
      if (scrollHeight >= divHeight + 100) {
        $(".profile-tab")
          .addClass("is-fixed")
          .addClass("is-visible");
      } else {
        $(".profile-tab")
          .removeClass("is-fixed")
          .removeClass("is-visible");
      }
    });

    if ($(".profile-tab").length > 0) {
      var $cache = $(".profile-tab");
      var vTop =
        $cache.offset().top -
        parseFloat($cache.css("margin-top").replace(/auto/, 0));
      $(window).scroll(function(event) {
        var y = $(this).scrollTop();
        if (y >= vTop) {
          $cache.addClass("is-fixed is-visible");
        } else {
          $cache.removeClass("is-fixed is-visible");
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      user: { editProfileData }
    } = this.props;
    if (prevProps.user.editProfileData !== editProfileData) {
      const localStorageVal = JSON.parse(
        localStorage.getItem(SiteConstants.TOKEN_STORAGE_NAME)
      );
      let fullName = editProfileData[0].FullName
        ? editProfileData[0].FullName
        : localStorageVal.FullName;
      Helper.saveToken(
        localStorageVal.token,
        localStorageVal.expiry,
        localStorageVal.type,
        localStorageVal.mobile,
        fullName,
        "edit"
      );
      this.setState({ openPopUp: false });
    }
  }

  updateProfile = value => {
    this.props.updateSelectionStack({ Customer: value });
    //this.props.history.push('/mahindra-suv-test-drive/availability');
  };

  openEditPopup = () => {
    const { openPopUp } = this.state;
    // flush other form state
    this.setState({ openPopUp: !openPopUp });
  };

  getPopUpContent = () => {
    const {
      user,
      uploadUserImage,
      user: { profileData }
    } = this.props;
    let userImg = Helper.getValue(profileData[0], "ProfilePic", "");

    return (
      <div className="modal-content">
        {/* <a className="close ripplelink"><span className="ink animate"></span>
                            <i className="icon-57"></i>
                        </a> */}
        <div className="head-profile-top">
          <h3>Edit Profile </h3>

          <div className="image-file-upload-row clearfix">
            <div className="image-choose-ratio clearfix">
              <div className="image-put-wrap">
                {/* <input type="file" /> */}
                <span className="image-put">
                  {userImg ? (
                    // <Img src={userImg} alt="img" id="userprofileimgid" />
                    <img
                      src={process.env.REACT_APP_IMAGE_UPLOAD_URL + userImg}
                      alt="img"
                      id="userprofileimgid"
                    />
                  ) : (
                    <img
                      src="/images/placeholder.jpg"
                      alt="img"
                      id="userprofileimgid"
                    />
                  )}
                  {/* <img src="/images/placeholder.jpg" alt="img" id="userprofileimgid" /> */}
                </span>
              </div>
              <i
                style={{ cursor: "pointer" }}
                className="icon-50 edit"
                onClick={() => this.displayImageUpload()}
              ></i>
              {/* <i class="icon-57 edit close-upload"></i> */}
            </div>
          </div>
        </div>

        <UpdateProfileForm
          user={user}
          onSubmit={value => this.updateProfile(value)}
          uploadUserImage={(fileByte, picture) =>
            uploadUserImage(fileByte, picture)
          }
        />
      </div>
    );
  };

  render() {
    const {
      user: { profileData, isEditProLoading }
    } = this.props;
    const { openPopUp } = this.state;
    let userImg = Helper.getValue(profileData[0], "ProfilePic", "");
    return (
      <React.Fragment>
        <PopUp
          // key={new Date().getTime()}
          ref={PopUp => (this.PopUp = PopUp)}
          openPopUp={openPopUp}
          content={this.getPopUpContent()}
          classname="modal-dialog"
          parentClass="test-drive-popup edit-profile-popup"
          closeModal={() => this.openEditPopup()}
        />
        <div className="profile-detail">
          <div className="profile-img">
            {userImg ? (
              // <Img src={userImg} alt="img" className="p-img" />
              <img
                src={process.env.REACT_APP_IMAGE_UPLOAD_URL + userImg}
                alt="img"
                className="p-img"
              />
            ) : (
              <img src="/images/placeholder.jpg" alt="img" className="p-img" />
            )}
            {/* <img className="p-img" src="/images/placeholder.jpg" alt="profile" /> */}
          </div>
          <h1>{Helper.getValue(profileData[0], "FullName", "")} </h1>
          <ul>
            <li>
              <i className="icon-61"></i>{" "}
              {Helper.getValue(profileData[0], "Mobile", "")}
            </li>
            <li>
              <i className="icon-60"></i>{" "}
              {Helper.getValue(profileData[0], "Email", "")}
            </li>
            <li>
              <i className="icon-63"> </i>
              {Helper.getValue(profileData[0], "Address", "")}{" "}
            </li>
          </ul>
          {isEditProLoading ? <Loader loaderType="spinner" /> : ""}
          <a
            className="btn btn-primary profile-edit-btn ripplelink"
            title="Update User's Profile"
            onClick={() => this.openEditPopup()}
          >
            Edit
          </a>
        </div>
      </React.Fragment>
    );
  }
}
