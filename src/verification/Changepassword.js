import React, { useContext } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { useState } from "react";
import { UserContext } from "../UserContext";

function Chnagepassword() {
  const { setFailModal, setSuccessModal, displaymsg, setDisplaymsg } =
    useContext(UserContext);

  const [emailDiv, setEmailDiv] = useState(true);
  const [emailAlert, setEmailAlert] = useState(false);

  const [userPasswordDiv, setUserPasswordDiv] = useState(false);
  const [adminPasswordDiv, setAdminPasswordDiv] = useState(false);

  const [userPassId, setUserPassId] = useState("");
  const [adminPassId, setAdminPassId] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let error = {};

      if (values.email === "") {
        error.email = "please enter Email";
      }
      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
      ) {
        error.email = " please enter a valid email";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const server = await axios.post(`${config.api}/change`, values);

        if (server.data.message === "user_id finded") {
          setUserPassId(server.data.email);
          setEmailDiv(false);
          setUserPasswordDiv(true);
        }
        if (server.data.message === "admin_id finded") {
          setAdminPassId(server.data.email);
          setEmailDiv(false);
          setAdminPasswordDiv(true);
        }
        if (server.data.message === "Account not found in this email-Id") {
          setFailModal(true);
          setDisplaymsg(server.data.message);
        }
        if (server.data.message === "finded user & admin account") {
          setEmailDiv(false);
          setEmailAlert(true);
          setDisplaymsg(server.data.message);

          setUserPassId(server.data.user_email);
          setAdminPassId(server.data.admin_email);
        }
      } catch (error) {
        alert("error");
      }
    },
  });

  const back = () => {
    setEmailDiv(true);
    setUserPasswordDiv(false);
    setAdminPasswordDiv(false);
    setCheck(false);

    userformikpassword.resetForm();
    adminformikpassword.resetForm();
  };

  const userformikpassword = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.currentpassword) {
        error.currentpassword = "please enter current password";
      }

      if (
        values.currentpassword &&
        (values.currentpassword.length <= 7 ||
          values.currentpassword.length > 12)
      ) {
        error.currentpassword = "Password must be between 8 to 12 characters";
      }
      if (values.newpassword === "") {
        error.newpassword = "please enter New password";
      }

      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter New Password again";
      }

      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword &&
        (values.newpassword.length <= 7 || values.newpassword.length > 12)
      ) {
        error.newpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.newpassword.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.newpassword !== values.confirmpassword
      ) {
        error.newpassword = "Password not matching";
        error.confirmpassword = "Password not matching";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const server = await axios.put(
          `${config.api}/change/user/${userPassId}`,
          values
        );
        if (server.data.message === "User Password Changed Successfully") {
          setSuccessModal(true);
          setDisplaymsg(server.data.message);
          userformikpassword.resetForm();
        }
        if (server.data.message === "Current Password Incorrect") {
          setFailModal(true);
          setDisplaymsg(server.data.message);
        }
      } catch (error) {
        alert("error");
      }
    },
  });
  const adminformikpassword = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.currentpassword) {
        error.currentpassword = "please enter current password";
      }

      if (
        values.currentpassword &&
        (values.currentpassword.length <= 7 ||
          values.currentpassword.length > 12)
      ) {
        error.currentpassword = "Password must be between 8 to 12 characters";
      }
      if (values.newpassword === "") {
        error.newpassword = "please enter New password";
      }

      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter New Password again";
      }

      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword &&
        (values.newpassword.length <= 7 || values.newpassword.length > 12)
      ) {
        error.newpassword = "Password must be between 8 to 12 characters";
      }
      if (
        values.newpassword.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.newpassword.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.newpassword !== values.confirmpassword
      ) {
        error.newpassword = "Password not matching";
        error.confirmpassword = "Password not matching";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const server = await axios.put(
          `${config.api}/change/admin/${adminPassId}`,
          values
        );
        if (server.data.message === "Admin Password Changed Successfully") {
          setSuccessModal(true);
          setDisplaymsg(server.data.message);
          adminformikpassword.resetForm();
        }
        if (server.data.message === "Current Password Incorrect") {
          setFailModal(true);
          setDisplaymsg(server.data.message);
        }
      } catch (error) {
        alert("error");
      }
    },
  });

  const backfunction = () => {
    setEmailAlert(false);
    setEmailDiv(true);
    setCheck(false);
  };
  const [check, setCheck] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const checking = () => {
    setCheck(true);
  };
  const admin = () => {
    checking();
    setOpenAdmin(true);
    setOpenUser(false);
  };
  const user = () => {
    checking();
    setOpenUser(true);
    setOpenAdmin(false);
  };
  const forOpen = () => {
    setEmailAlert(false);
    setAdminPasswordDiv(openAdmin);
    setUserPasswordDiv(openUser);
  };

  return (
    <>
      <div className="verification_box">
        <form className="input_groups">
          {emailDiv ? (
            <>
              <h2>Change Password</h2>

              <p>
                Hi , please enter your registered <br /> mail id. Click the
                button below to <br />
                proceed.
              </p>

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                id="login_input"
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="login_err">{formik.errors.email} </span>
              ) : null}
              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="login_btn"
              >
                proceed
              </button>

              <Link to="/" className="back_btn">
                Back
              </Link>
            </>
          ) : null}

          {emailAlert ? (
            <>
              <div className="popup_alert">
                <div className="inside_popup_alert">
                  <div className="popup_top">
                    <h4 className="h4msg_alert">Alert!</h4>
                    <h4 className="h4close_alert" onClick={backfunction}>
                      X
                    </h4>
                  </div>
                  <hr></hr>

                  <div className="inside_popup_content">
                    <div className="msg_alert">
                      <h6 className="h4orange">
                        {displaymsg} in same email-id
                      </h6>
                    </div>
                    <hr></hr>

                    <h6>Select a account you need to change a password</h6>

                    <div className="popup_bottom_forgot_alert">
                      <div className="radio_alert">
                        <input
                          type="radio"
                          name="tick"
                          className="for_radio"
                          onClick={admin}
                        />
                        <label name="tick">Admin</label>
                      </div>
                      <div className="radio_alert">
                        <input
                          type="radio"
                          name="tick"
                          className="for_radio"
                          onClick={user}
                        />
                        <label name="tick">User</label>
                      </div>
                    </div>
                    {check ? (
                      <button
                        className="popup_btn_alert"
                        type="button"
                        onClick={forOpen}
                      >
                        proceed
                      </button>
                    ) : (
                      <div className="popup_btn_alert_low">proceed</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {userPasswordDiv ? (
            <>
              <h2>Update User Password</h2>

              <p>
                please enter your <br /> Current password & New password
              </p>

              <input
                type="text"
                placeholder="Current password"
                name="currentpassword"
                value={userformikpassword.values.currentpassword}
                onBlur={userformikpassword.handleBlur}
                onChange={userformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                userformikpassword.touched.currentpassword &&
                userformikpassword.errors.currentpassword
                  ? "error-box"
                  : ""
              }
							${
                userformikpassword.touched.currentpassword &&
                !userformikpassword.errors.currentpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {userformikpassword.touched.currentpassword &&
              userformikpassword.errors.currentpassword ? (
                <span className="login_err">
                  {userformikpassword.errors.currentpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="New password"
                name="newpassword"
                value={userformikpassword.values.newpassword}
                onBlur={userformikpassword.handleBlur}
                onChange={userformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                userformikpassword.touched.newpassword &&
                userformikpassword.errors.newpassword
                  ? "error-box"
                  : ""
              }
							${
                userformikpassword.touched.newpassword &&
                !userformikpassword.errors.newpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {userformikpassword.touched.newpassword &&
              userformikpassword.errors.newpassword ? (
                <span className="login_err">
                  {userformikpassword.errors.newpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="Confirm new password"
                name="confirmpassword"
                value={userformikpassword.values.confirmpassword}
                onBlur={userformikpassword.handleBlur}
                onChange={userformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                userformikpassword.touched.confirmpassword &&
                userformikpassword.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                userformikpassword.touched.confirmpassword &&
                !userformikpassword.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {userformikpassword.touched.confirmpassword &&
              userformikpassword.errors.confirmpassword ? (
                <span className="login_err">
                  {userformikpassword.errors.confirmpassword}{" "}
                </span>
              ) : null}

              <button
                onClick={userformikpassword.handleSubmit}
                type="submit"
                className="login_btn"
              >
                proceed
              </button>

              <Link onClick={back} className="back_btn">
                Back
              </Link>
            </>
          ) : null}

          {adminPasswordDiv ? (
            <>
              <h2>Update Admin Password</h2>

              <p>
                please enter your <br /> Current password & New password
              </p>

              <input
                type="text"
                placeholder="Current password"
                name="currentpassword"
                value={adminformikpassword.values.currentpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                adminformikpassword.touched.currentpassword &&
                adminformikpassword.errors.currentpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.currentpassword &&
                !adminformikpassword.errors.currentpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.currentpassword &&
              adminformikpassword.errors.currentpassword ? (
                <span className="login_err">
                  {adminformikpassword.errors.currentpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="New password"
                name="newpassword"
                value={adminformikpassword.values.newpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                adminformikpassword.touched.newpassword &&
                adminformikpassword.errors.newpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.newpassword &&
                !adminformikpassword.errors.newpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.newpassword &&
              adminformikpassword.errors.newpassword ? (
                <span className="login_err">
                  {adminformikpassword.errors.newpassword}{" "}
                </span>
              ) : null}

              <input
                type="text"
                placeholder="Confirm new password"
                name="confirmpassword"
                value={adminformikpassword.values.confirmpassword}
                onBlur={adminformikpassword.handleBlur}
                onChange={adminformikpassword.handleChange}
                required
                id="login_input"
                className={`
							${
                adminformikpassword.touched.confirmpassword &&
                adminformikpassword.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                adminformikpassword.touched.confirmpassword &&
                !adminformikpassword.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              />
              {adminformikpassword.touched.confirmpassword &&
              adminformikpassword.errors.confirmpassword ? (
                <span className="login_err">
                  {adminformikpassword.errors.confirmpassword}{" "}
                </span>
              ) : null}

              <button
                onClick={adminformikpassword.handleSubmit}
                type="submit"
                className="login_btn"
              >
                proceed
              </button>

              <Link onClick={back} className="back_btn">
                Back
              </Link>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Chnagepassword;
