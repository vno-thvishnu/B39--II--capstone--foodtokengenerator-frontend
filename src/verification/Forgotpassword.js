import React, { useContext } from 'react'
import { useFormik } from "formik";
import { config } from "../config";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../UserContext';

function Forgotpassword() {

    const {setFailModal,
        setSuccessModal,
        displaymsg,
        setDisplaymsg} = useContext(UserContext)

    const [emailDiv, setEmailDiv] = useState(true);

    const[emailAlert,setEmailAlert] = useState(false)

    const [userPassId, setUserPassId] = useState("");
    const [userOtpDiv, setUserOtpDiv] = useState(false);
    const [userPasswordDiv, setUserPasswordDiv] = useState(false);

    const [adminPassId, setAdminPassId] = useState("");
    const [adminOtpDiv, setAdminOtpDiv] = useState(false);
    const [adminPasswordDiv, setAdminPasswordDiv] = useState(false);
    // const [modal, setModal] = useState(false);
    // const [h3color, setH3color] = useState("");
    // const [modalmsg, setModalmsg] = useState("");
    // const [modalback, setModalback] = useState("");
  
    const formikEmail = useFormik({
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
          const server = await axios.post(`${config.api}/forgot`, values);
          // console.log(server)
  
          if (server.data.message === "user_id finded") {
            setUserPassId(server.data.email);
  
            setEmailDiv(false);
            setUserOtpDiv(true);
            setUserPasswordDiv(false);
          }
          if (server.data.message === "admin_id finded") {
            setAdminPassId(server.data.email);
  
            setEmailDiv(false);
            setAdminOtpDiv(true);
            setAdminPasswordDiv(false);
          }
          if (server.data.message === "Account not found in this email-Id") {
            setFailModal(true)
  setDisplaymsg(server.data.message)
          }
          if (server.data.message === "Finded User & Admin Account") {
            setEmailDiv(false)
           setEmailAlert(true)
  setDisplaymsg(server.data.message)

           setUserPassId(server.data.user_email);
           setAdminPassId(server.data.admin_email);


          }
          // formik.resetForm();
        } catch (error) {
          alert("error");
        }
      },
    });
  
    const UserformikOtp = useFormik({
      initialValues: {
        otp: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.otp === "") {
          error.otp = "please enter Otp";
        }
        
        if (values.otp.length>=1 && values.otp.length !=5) {
          error.otp = "please enter correct Otp";
        }
        
        return error;
      },
      onSubmit: async (values) => {
        try {
          const server = await axios.post(`${config.api}/forgot/user/otp/${userPassId}`, values);
          // console.log(server)
  
          if (server.data.message === "OTP correct") {
            setUserOtpDiv(false);
  
            setUserPasswordDiv(true);
          UserformikOtp.resetForm();
  
          }
          // setStoreOtp("");
          if (server.data.message === "OTP incorrect") {
            setFailModal(true)
  setDisplaymsg(server.data.message)
          }
          // formik.resetForm();
        } catch (error) {
          alert("error");
        }
      },
    });
  
    const UserformikPassword = useFormik({
      initialValues: {
        newpassword: "",
              confirmpassword: "",
              email: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.newpassword === "") {
          error.newpassword = "please enter new password";
        }
        
        if (values.confirmpassword === "") {
          error.confirmpassword = "please enter new password again";
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
          const server = await axios.post(`${config.api}/forgot/user/otp/new_password/${userPassId}`, values);
          // console.log(server)
  
          if (server.data.message === "User Password Created Successfully") {
            setSuccessModal(true)
  setDisplaymsg(server.data.message)
          UserformikPassword.resetForm();
  
          }
        } catch (error) {
          alert("error");
        }
      },
    });

    const AdminformikOtp = useFormik({
      initialValues: {
        otp: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.otp === "") {
          error.otp = "please enter Otp";
        }
        
        if (values.otp.length>=1 && values.otp.length !=5) {
          error.otp = "please enter correct Otp";
        }
        
        return error;
      },
      onSubmit: async (values) => {
        try {
          const server = await axios.post(`${config.api}/forgot/admin/otp/${adminPassId}`, values);
          // console.log(server)
  
          if (server.data.message === "OTP correct") {
            setAdminOtpDiv(false);
  
            setAdminPasswordDiv(true);
          AdminformikOtp.resetForm();
  
          }
          // setStoreOtp("");
          if (server.data.message === "OTP incorrect") {
            setFailModal(true)
  setDisplaymsg(server.data.message)
          }
          // formik.resetForm();
        } catch (error) {
          alert("error");
        }
      },
    });
  
    const AdminformikPassword = useFormik({
      initialValues: {
        newpassword: "",
              confirmpassword: "",
              email: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.newpassword === "") {
          error.newpassword = "please enter new password";
        }
        
        if (values.confirmpassword === "") {
          error.confirmpassword = "please enter new password again";
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
          const server = await axios.post(`${config.api}/forgot/admin/otp/new_password/${adminPassId}`, values);
          // console.log(server)
  
          if (server.data.message === "Admin Password Created Successfully") {
            setSuccessModal(true)
  setDisplaymsg(server.data.message)
          UserformikPassword.resetForm();
  
          }
        } catch (error) {
          alert("error");
        }
      },
    });
  
    const back = () => {
      setEmailDiv(true);
      setUserOtpDiv(false);
      setUserPasswordDiv(false);
      setAdminOtpDiv(false);
      setAdminPasswordDiv(false);
      setCheck(false)

    };
  
    // const btn = () => {
    //   setModal(false);
    // };
    const backfunction=()=>{
      setEmailAlert(false)
      setEmailDiv(true)
      setCheck(false)
    }
    const[check,setCheck]=useState(false)
    const[sendLink,setSendLink]=useState("")

    const checking=()=>{
      setCheck(true)
  }
  const admin=()=>{
    checking()
    setSendLink(`${config.api}/forgot/admin/${adminPassId}`)
  }
  const user=()=>{
    checking()
    setSendLink(`${config.api}/forgot/user/${userPassId}`)

  }

  const pushagain=async(e)=>{
    try {
      const server = await axios.get(`${sendLink}`);
      // console.log(server)

      if (server.data.message === "user_id finded") {

        setUserPassId(server.data.email);
      setEmailAlert(false)

        setEmailDiv(false);
        setUserOtpDiv(true);
        setUserPasswordDiv(false);
      }
      if (server.data.message === "admin_id finded") {
        setAdminPassId(server.data.email);
        setEmailAlert(false)

        setEmailDiv(false);
        setAdminOtpDiv(true);
        setAdminPasswordDiv(false);
      }
//       if (server.data.message === "Account not found in this email-Id") {
//         setFailModal(true)
// setDisplaymsg(server.data.message)
//       }
//       if (server.data.message === "Finded User & Admin Account") {
//         setEmailDiv(false)
//        setEmailAlert(true)
// setDisplaymsg(server.data.message)

//        setUserPassId(server.data.email);
//        setAdminPassId(server.data.email);


//       }
      // formik.resetForm();
    } catch (error) {
      alert("error");
    }
  }

  return (
<>
<div className='verification_box'>
<form className='input_groups'>
 {emailDiv ? (
        <>
          {/* <div className="content"> */}
            {/* <div className="inside-content"> */}
              {/* <div className="content-top"> */}
                {/* <div className="inside-content-top"> */}
                  <h2>Forgot Password</h2>

                  <p>
                    Hi , please enter your registered  mail id.<br /> Click the
                    button below to 
                    proceed , <br />OTP has been sended to email
                  </p>
                {/* </div> */}
              {/* </div> */}
              {/* <div className="content-bottom"> */}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                onBlur={formikEmail.handleBlur}
                value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                  required
                  id="login_input"
                  className={`
							${formikEmail.touched.email && formikEmail.errors.email ? "error-box" : ""}
							${formikEmail.touched.email && !formikEmail.errors.email ? "success-box" : ""}

							`}
                />
                {formikEmail.touched.email && formikEmail.errors.email ? (
                  <span className="login_err">
                    {formikEmail.errors.email}{" "}
                  </span>
                ) : null}
                <button
                  onClick={formikEmail.handleSubmit}
                  type="submit"
                  className="login_btn"
                >
                  proceed
                </button>
              {/* </div> */}
            {/* </div> */}

            <Link to="/" className="back_btn">
              Back
            </Link>
          {/* </div> */}
        </>
      ) : null}

      {emailAlert?(
   <>
   {/* <div className="forbg_alert" ></div> */}
   <div className="popup_alert" >
     <div className="inside_popup_alert">
      <div className='popup_top'>
      <h4 className="h4msg_alert">Alert!</h4>
       <h4 className='h4close_alert' onClick={backfunction}>X</h4>
      </div>
       <hr></hr>
 
       <div className="inside_popup_content">
         <div className="msg_alert">
           <h6 className="h4orange">{displaymsg} in same email-id</h6>
         </div>
         <hr></hr>
 {/* <div className='popup_bottom'>
 <input type="checkbox" onClick={checking} />
 <label >Anyway create Admin account also.</label>
 </div> */}
 <h6>Select a account you need to create a password</h6>

<div className='popup_bottom_forgot_alert'>
<div className='radio_alert'>
<input type="radio" name='tick' className='for_radio' onClick={admin} />
<label name='tick'>Admin</label>
</div>
<div className='radio_alert'>
<input type="radio" name='tick' className='for_radio' onClick={user} />
<label name='tick'>User</label>
</div>
</div>
        {check?(
           <button className='popup_btn_alert'type='button' onClick={pushagain}>
           proceed
         </button>
        ):
        <div className='popup_btn_alert_low'   >
        proceed
      </div>
        }
 
       </div>
     </div>
   </div>
 
 </>
      ):""}

{userOtpDiv ? (
        <>
          {/* <div className="content">
            <div className="inside-content">
              <div className="content-top-red">
                <div className="inside-content-top"> */}
                  

                  <h2>User-OTP</h2>

                  <p>
                    Hi , please enter your Received <br /> OTP. Click the button
                    below to <br />
                    proceed , to change your password
                  </p>
                {/* </div> */}
              {/* </div> */}
              {/* <div className="content-bottom"> */}
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  value={UserformikOtp.values.otp}
                  onChange={UserformikOtp.handleChange}
                onBlur={UserformikOtp.handleBlur}
                  required
                  id="login_input"
                  className={`
                  ${UserformikOtp.touched.otp && UserformikOtp.errors.otp ? "error-box" : ""}
                  ${UserformikOtp.touched.otp && !UserformikOtp.errors.otp ? "success-box" : ""}
    
                  `}
                />
               {UserformikOtp.touched.otp && UserformikOtp.errors.otp ? (
                  <span className="login_err">
                    {UserformikOtp.errors.otp}{" "}
                  </span>
                ) : null}

                <button
                  onClick={UserformikOtp.handleSubmit}
                  type="submit"
                  className="login_btn"
                >
                  proceed
                </button>
              {/* </div> */}
            {/* </div> */}

            <Link onClick={back} className="back_btn">
              Back
            </Link>
          {/* </div> */}
        </>
      ) : null}
 {userPasswordDiv ? (
        <>
          {/* <div className="content">
            <div className="inside-content">
              <div className="content-top-green">
                <div className="inside-content-top-green"> */}
                  <h2>Create User Password</h2>

                  <p>
                    Hi , please enter your New password. <br /> Click the button
                    below to proceed .
                  </p>
                {/* </div>
              </div>
              <div className="content-bottom-green"> */}
                <input
                  type="text"
                  placeholder="New Password"
                  name="newpassword"
                  value={UserformikPassword.values.newpassword}
                  onChange={UserformikPassword.handleChange}
                  // onChange={(e)=>touching(e)}
                  onBlur={UserformikPassword.handleBlur}
                  required
                  id="login_input"
                  className={`
							${UserformikPassword.touched.newpassword && UserformikPassword.errors.newpassword ? "error-box" : ""}
							${UserformikPassword.touched.newpassword && !UserformikPassword.errors.newpassword ? "success-box" : ""}

							`}
                />
                 {UserformikPassword.touched.newpassword && UserformikPassword.errors.newpassword ? (
                  <span className="login_err">
                    {UserformikPassword.errors.newpassword}{" "}
                  </span>
                ) : null}
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  name="confirmpassword"
                  value={UserformikPassword.values.confirmpassword}
                  onBlur={UserformikPassword.handleBlur}
                  onChange={UserformikPassword.handleChange}
                  required
                  id="login_input"
                  className={`
                  ${UserformikPassword.touched.confirmpassword && UserformikPassword.errors.confirmpassword ? "error-box" : ""}
                  ${UserformikPassword.touched.confirmpassword && !UserformikPassword.errors.confirmpassword ? "success-box" : ""}
    
                  `}
                />
                 {UserformikPassword.touched.confirmpassword && UserformikPassword.errors.confirmpassword ? (
                  <span className="login_err">
                    {UserformikPassword.errors.confirmpassword}{" "}
                  </span>
                ) : null}
                <button
                  onClick={UserformikPassword.handleSubmit}
                  type="submit"
                  className="login_btn"
                >
                  proceed
                </button>
              {/* </div>
            </div> */}

            <Link onClick={back} className="back_btn">
              Back
            </Link>
          {/* </div> */}
        </>
      ) : null}

{adminOtpDiv ? (
        <>
          {/* <div className="content">
            <div className="inside-content">
              <div className="content-top-red">
                <div className="inside-content-top"> */}
                  

                  <h2>Admin-OTP</h2>

                  <p>
                    Hi , please enter your Received <br /> OTP. Click the button
                    below to <br />
                    proceed , to change your password
                  </p>
                {/* </div> */}
              {/* </div> */}
              {/* <div className="content-bottom"> */}
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  value={AdminformikOtp.values.otp}
                  onChange={AdminformikOtp.handleChange}
                onBlur={AdminformikOtp.handleBlur}
                  required
                  id="login_input"
                  className={`
                  ${AdminformikOtp.touched.otp && AdminformikOtp.errors.otp ? "error-box" : ""}
                  ${AdminformikOtp.touched.otp && !AdminformikOtp.errors.otp ? "success-box" : ""}
    
                  `}
                />
               {AdminformikOtp.touched.otp && AdminformikOtp.errors.otp ? (
                  <span className="login_err">
                    {AdminformikOtp.errors.otp}{" "}
                  </span>
                ) : null}

                <button
                  onClick={AdminformikOtp.handleSubmit}
                  type="submit"
                  className="login_btn"
                >
                  proceed
                </button>
              {/* </div> */}
            {/* </div> */}

            <Link onClick={back} className="back_btn">
              Back
            </Link>
          {/* </div> */}
        </>
      ) : null}
 {adminPasswordDiv ? (
        <>
          {/* <div className="content">
            <div className="inside-content">
              <div className="content-top-green">
                <div className="inside-content-top-green"> */}
                  <h2>Create Admin Password</h2>

                  <p>
                    Hi , please enter your New password. <br /> Click the button
                    below to proceed .
                  </p>
                {/* </div>
              </div>
              <div className="content-bottom-green"> */}
                <input
                  type="text"
                  placeholder="New Password"
                  name="newpassword"
                  value={AdminformikPassword.values.newpassword}
                  onChange={AdminformikPassword.handleChange}
                  // onChange={(e)=>touching(e)}
                  onBlur={AdminformikPassword.handleBlur}
                  required
                  id="login_input"
                  className={`
							${AdminformikPassword.touched.newpassword && AdminformikPassword.errors.newpassword ? "error-box" : ""}
							${AdminformikPassword.touched.newpassword && !AdminformikPassword.errors.newpassword ? "success-box" : ""}

							`}
                />
                 {AdminformikPassword.touched.newpassword && AdminformikPassword.errors.newpassword ? (
                  <span className="login_err">
                    {AdminformikPassword.errors.newpassword}{" "}
                  </span>
                ) : null}
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  name="confirmpassword"
                  value={AdminformikPassword.values.confirmpassword}
                  onBlur={AdminformikPassword.handleBlur}
                  onChange={AdminformikPassword.handleChange}
                  required
                  id="login_input"
                  className={`
                  ${AdminformikPassword.touched.confirmpassword && AdminformikPassword.errors.confirmpassword ? "error-box" : ""}
                  ${AdminformikPassword.touched.confirmpassword && !AdminformikPassword.errors.confirmpassword ? "success-box" : ""}
    
                  `}
                />
                 {AdminformikPassword.touched.confirmpassword && AdminformikPassword.errors.confirmpassword ? (
                  <span className="login_err">
                    {AdminformikPassword.errors.confirmpassword}{" "}
                  </span>
                ) : null}
                <button
                  onClick={AdminformikPassword.handleSubmit}
                  type="submit"
                  className="login_btn"
                >
                  proceed
                </button>
              {/* </div>
            </div> */}

            <Link onClick={back} className="back_btn">
              Back
            </Link>
          {/* </div> */}
        </>
      ) : null}

</form>
    
</div>
</>
  )
}

export default Forgotpassword