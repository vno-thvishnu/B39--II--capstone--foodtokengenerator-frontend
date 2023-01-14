import React, { useContext } from 'react'
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import './Login.css'
import { UserContext } from '../UserContext';


function Adminregister() {
    // const [modal, setModal] = useState(false);
    // const [message, setMessage] = useState([]);
    // const [modalBack, setModalBack] = useState(false);

const {setFailModal,
  setSuccessModal,
  displaymsg,
  setDisplaymsg} = useContext(UserContext)

  const[divisionopen,setDivisionopen]=useState(true)
  // const[divisionopentwo,setDivisionopentwo]=useState(false)

  const[passvalue,setPassvalue]=useState()

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        otp: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.name === "") {
          error.name = "please enter Name";
        }
        if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
          error.name = "Name must be between 3 to 15 characters";
        }
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
        if (values.confirmpassword === "") {
          error.confirmpassword = "please enter Password again";
        }
        if (
          values.confirmpassword &&
          (values.confirmpassword.length <= 7 ||
            values.confirmpassword.length > 12)
        ) {
          error.confirmpassword = "Password must be between 8 to 12 characters";
        }
  
        if (
          values.password.length > 7 &&
          values.confirmpassword.length > 7 &&
          values.password.length < 13 &&
          values.confirmpassword.length < 13 &&
          values.password !== values.confirmpassword
        ) {
          error.password = "Password not matching";
          error.confirmpassword = "Password not matching";
        }
        return error;
      },
      onSubmit: async (values) => {
        try {
          const server = await axios.post(`${config.api}/admin/register`, values);
          // console.log(values)
          
if(server.data.message==="Email-id already registered, use another"){
  setFailModal(true)
  setDisplaymsg(server.data.message)
}
if(server.data.message==="Admin Account created successfully"){
  setSuccessModal(true)
  setDisplaymsg(server.data.message)
            formik.resetForm();
}

if(server.data.message==="User account finded in this email_id"){
  setDivisionopen(false)
  // setDivisionopentwo(true)
  setDisplaymsg(server.data.message)

setPassvalue(values)

}
         
        } catch (error) {
          alert("error");
        }
      },
      

    });
 



  // console.log(passvalue)

   const pushagain=async(e)=>{
      try {
        // console.log(passvalue.name)
        setDivisionopen(true)

        // e.preventDefault()
        const server = await axios.post(`${config.api}/admin/register_confirm`, {
          name: `${passvalue.name}`,
          email: `${passvalue.email}`,
          password: `${passvalue.password}`,
          confirmpassword: `${passvalue.confirmpassword}`,
          otp: `${passvalue.otp}`,
        });
        
        if(server.data.message==="Admin Account created successfully"){
          setSuccessModal(true)
          setDisplaymsg(server.data.message)
                    formik.resetForm();
        }
        
      } catch (error) {
        alert(error)
      }

    }
    // console.log(passvalue)
   
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
  
    const [passwordDispalyBack, setPasswordDisplayBack] = useState("Show");
  
    const [passwordTypeBack, setPasswordTypeBack] = useState("password");
    const changeTypeBack = () => {
      if (passwordTypeBack === "password") {
        setPasswordDisplayBack("Hide");
        setPasswordTypeBack("text");
      } else {
        setPasswordTypeBack("password");
        setPasswordDisplayBack("Show");
      }
    };
  
    // postagain = () => {
    //   formik.onSubmitTwo()
    // };
    const backfunctionfour=()=>{
      setDivisionopen(true)
      }

const[check,setCheck]=useState(false)

    const checking=()=>{
      setCheck(!check)
  }
  return (
    <>
   
        <div className="verification_box">
            <form className="input_groups">
            {divisionopen?(
      <>
              <h2>
                Create <b>Admin</b> Account
              </h2>
              <input
                type="text"
                placeholder=" Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                id="login_input"
                className={`
							${formik.touched.name && formik.errors.name ? "error-box" : ""}
							${formik.touched.name && !formik.errors.name ? "success-box" : ""}

							`}
              />

              {formik.touched.name && formik.errors.name ? (
                <span className="login_err" style={{ color: "red" }}>
                  {formik.errors.name}{" "}
                </span>
              ) : null}

              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                id="login_input"
                className={`
							${formik.touched.email && formik.errors.email ? "error-box" : ""}
							${formik.touched.email && !formik.errors.email ? "success-box" : ""}

							`}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="login_err" style={{ color: "red" }}>
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
                <span className="login_err" style={{ color: "red" }}>
                  {formik.errors.password}{" "}
                </span>
              ) : null}
              <div
                id="password_div"
                className={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
              >
                <input
                  type={passwordTypeBack}
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formik.values.confirmpassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                  required
                  id="login_input_password"
                />
                <span onClick={changeTypeBack} className="password_show">
                  {passwordDispalyBack}
                </span>
              </div>
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <span className="login_err" style={{ color: "red" }}>
                  {formik.errors.confirmpassword}{" "}
                </span>
              ) : null}
              <button
                onClick={formik.handleSubmit}
                type="submit"
                className="login_btn"
              >
                Create
              </button>
            <Link to="/"className='back_btn'>Back</Link>
      </>

            ): 
             <>
            {/* <div className="forbg_alert" ></div> */}
            <div className="popup_alert" >
              <div className="inside_popup_alert">
               <div className='popup_top'>
               <h4 className="h4msg_alert">Alert!</h4>
                <h4 className='h4close_alert' onClick={backfunctionfour}>X</h4>
               </div>
                <hr></hr>
          
                <div className="inside_popup_content">
                  <div className="msg_alert">
                    <h6 className="h4orange">{displaymsg}</h6>
                  </div>
                  <hr></hr>
          <div className='popup_bottom'>
          <input type="checkbox" onClick={checking} />
          <label >Anyway create Admin account also.</label>
          </div>
                 {check?(
                    <button className='popup_btn_alert'type='button' onClick={pushagain} >
                    Create
                  </button>
                 ):
                 <div className='popup_btn_alert_low'   >
                 Create
               </div>
                 }
          
                </div>
              </div>
            </div>
          
          </>
}


            </form>
          </div>
      
  
    
    </>
  )
}

export default Adminregister