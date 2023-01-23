import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import './Allmodal.css'

function Allmodal() {
    const navigate =useNavigate();
const {failModal,
    setFailModal,
    displaymsg,
successModal,
setSuccessModal,
loginsuccessModal,
setLoginsuccessModal,
loginsuccessRouter,
alertmodal,
setAlertmodal,
// setPostagain,
// postagain
} = useContext(UserContext)
 

const backfunction=()=>{
    setFailModal(false)
}
const backfunctiontwo=()=>{
    setSuccessModal(false)
    navigate("/")
}

const backfunctionthree=()=>{
setLoginsuccessModal(false)
}


const backfunctionfour=()=>{
  setAlertmodal(false)
  setCheck(false)
  navigate(openlink)
  }

const[check,setCheck]=useState(false)
const[openlink,setOpenlink]=useState([])


const checking=()=>{
  setCheck(true)
}


const admin=()=>{
    checking();
    setOpenlink("/admin_dashboard")
}
const user=()=>{
  checking();
  setOpenlink("/user_dashboard")
}

  return (
<>

{failModal?(
     <>
     <div className="forbg"></div>
     <div className="popup">
       <div className="inside_popup">
         <h4 className="h4msg">Oops!</h4>
         <hr></hr>

         <div className="inside_popup_content">
           <div className="msg">
             <h6 className="h3red">{displaymsg}</h6>
           </div>
           <hr></hr>

           <Link  className='popup_btn' onClick={backfunction} >
             Okay
           </Link>
         </div>
       </div>
     </div>
   </>
):""}

{successModal?(
     <>
     <div className="forbg"></div>
     <div className="popup">
       <div className="inside_popup">
         <h4 className="h4msg">Yeah!</h4>
         <hr></hr>

         <div className="inside_popup_content">
           <div className="msg">
             <h6 className="h3green">{displaymsg}</h6>
           </div>
           <hr></hr>

           <button className='popup_btn_success'  onClick={backfunctiontwo}>
             Back to login
           </button>
         </div>
       </div>
     </div>
   </>
):""}

{loginsuccessModal?(
     <>
     <div className="forbg"></div>
     <div className="popup">
       <div className="inside_popup">
         <h4 className="h4msg">Yeah!</h4>
         <hr></hr>

         <div className="inside_popup_content">
           <div className="msg">
             <h6 className="h3green">{displaymsg}</h6>
           </div>
           <hr></hr>

           <Link className='popup_btn' 
           to={loginsuccessRouter}
            onClick={backfunctionthree}
            >
             Okay
           </Link>
         </div>
       </div>
     </div>
   </>
):""}

{alertmodal?(
     <>
     <div className="forbg" ></div>
     <div className="popup" >
       <div className="inside_popup_login_alert">
        <div className='popup_top'>
        <h4 className="h4msg">Alert!</h4>
         <h4 className='h4close' onClick={backfunctionfour}>X</h4>
        </div>
         <hr></hr>

         <div className="inside_popup_content">
           <div className="msg">
             <h6 className="h3green">
              {/* {displaymsg} */}
              You having two role in same <br/>Email-id & Password
             </h6>
           </div>
           <hr></hr>
  {/* <h6 className="h4msg">select your role to open dashboard</h6> */}

<div className='popup_bottom_login_alert'>
<div className='radio_alert'>
<input type="radio" name='tick' className='for_radio' onClick={admin}/>
<label name='tick'>as Admin</label>
</div>
<div className='radio_alert'>
<input type="radio" name='tick' className='for_radio' onClick={user}/>
<label name='tick'>as User</label>
</div>
</div>
          {check?(
             <button type='button' className='popup_btn_alert'    onClick={backfunctionfour}>
                Open
           </button>
          ):
          <div className='popup_btn_alert_low'  >
          Open
        </div>
          }
         </div>
       </div>
     </div>
   </>
):""}
</> 
 )
}

export default Allmodal