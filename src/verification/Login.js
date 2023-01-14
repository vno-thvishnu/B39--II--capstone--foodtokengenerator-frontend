import React, { useContext } from 'react'
import './Login.css'
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from '../UserContext';
import { config } from '../config';

function Login() {
    // const [modal, setModal] = useState(false);
    // const [message, setMessage] = useState([]);
    // const [modalTwo, setModalTwo] = useState(false);
  
    // const [color, setColor] = useState("");
    const {setFailModal,
      setSuccessModal,
      setDisplaymsg,
      setLoginsuccessModal,
setLoginsuccessRouter,
setAlertmodal
} = useContext(UserContext)
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
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
        if (values.password === "") {
          error.password = "please enter Password";
        }
        if (
          values.password &&
          (values.password.length <= 7 || values.password.length > 12)
        ) {
          error.password = "Password must be between 8 to 12 characters";
        }
  
        return error;
      },
      onSubmit: async (values) => {
        try {
          const server = await axios.post(`${config.api}/login`, values);
          if(server.data.message==="email or password incorrect"){
            setFailModal(true)
            setDisplaymsg(server.data.message)
          }
          if(server.data.message==="User Login successfully"){
            setLoginsuccessRouter("/user_dashboard")
            setLoginsuccessModal(true)
            setDisplaymsg(server.data.message)
                      formik.resetForm();
          }
          if(server.data.message==="Admin Login successfully"){
            setLoginsuccessRouter("/admin_dashboard")
            setLoginsuccessModal(true)
            setDisplaymsg(server.data.message)
                      formik.resetForm();
          }
          if(server.data.message==="Finded user & admin account successfully"){
            setAlertmodal(true)
            setDisplaymsg(server.data.message)
            formik.resetForm();

          }
        } catch (error) {
          alert("error");
        }
      },
    });
    const [passwordDispaly, setPasswordDisplay] = useState("Show");
  
    const [passwordType, setPasswordType] = useState("password");
    const changeType = () => {
      if (passwordType === "password") {
        setPasswordDisplay("Hide");
        setPasswordType("text");
      } else {
        setPasswordType("password");
        setPasswordDisplay("Show");
      }
    };
    // const btn = () => {
    //   setModalTwo(false);
    // };
  return (
<>
<div className='verification_box'>

<form className='input_groups' >
                <h2>Admin & Users</h2>
                <h5>login here</h5>
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
							// ${color ? "error-box" : ""}

                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="login_err" >
                    {formik.errors.email}{" "}
                  </span>
                ) : null}

                <div 
id="password_div"
                  className={`
							${formik.touched.password && formik.errors.password ? "error-box" : ""}
							${formik.touched.password && !formik.errors.password ? "success-box" : ""}

							`}
                >
                  <input
                    type={passwordType}
                    placeholder="Password"
                    name="password"
                    value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                    required
                  id="login_input_password"


                  />
                  <span onClick={changeType} className="password_show">
                    {passwordDispaly}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <span className="login_err" >
                    {formik.errors.password}{" "}
                  </span>
                ) : null}

                <button
                  onClick={formik.handleSubmit}
                  type="submit"
                  className='login_btn'
                >
                  Login
                </button>
                <div className='login_links'>
                  <Link className='link' to="/forgotpassword">
                    Forgot password
                  </Link>
                  <Link className='link' to="/changepassword" >
                    Change password
                  </Link>
                </div>
                <h6  className='linkh6'> Don't have an account?
                  </h6>
                <div  className='login_links_reg'>
                  

                    
                    <Link className='link' to="/admin_register" >
                    Admin-Sign up
                  </Link> 
                  <Link className='link' to="/user_register" >
                    User-Sign up
                  </Link> 
                </div>
              </form>
</div>
</>  
)
}

export default Login