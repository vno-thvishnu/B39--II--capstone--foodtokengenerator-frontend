import React, { useEffect, useState } from 'react'
import "./Orderhistory.css";
import {FaHistory} from 'react-icons/fa'
import axios from 'axios';
import { config } from "../config";
import {IoMdRefreshCircle} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi'


function Orderhistory() {
    useEffect(()=>{
        getordersloading()
    },[])

    const [newOrder,setNewOrder]=useState([])
    const[isLoadingThree,setLoadingthree]=useState(false)

    const getordersloading=async()=>{
      try {
        setLoadingthree(true)
        const getting = await axios.get(`${config.api}/admin/view_tokens`);
        console.log(getting.data)
        setNewOrder(getting.data)
        setLoadingthree(false)
    
    
      } catch (error) {
        alert("error")
      }
    }
  const navigate = useNavigate();

    const back_function=()=>{
        navigate("/admin_dashboard")
    }
//   const getorders=async()=>{
//     try {
//       // setLoadingthree(true)
//       const getting = await axios.get(`${config.api}/admin/view_tokens`);
//       console.log(getting.data)
//       setNewOrder(getting.data)
//       // setLoadingthree(false)
  
  
//     } catch (error) {
//       alert("error")
//     }
//   }

  return (
<>
<div className='history_overallbg'>
    <h3> <FaHistory/> Order history</h3>
<div className='history_content'> 

<div className='history_btn'>
<button onClick={getordersloading} className="refresh_btn"> 
<IoMdRefreshCircle  className="refresh_btn_icon" />refresh
</button>
<button className='refresh_btn' onClick={back_function}>
   <BiArrowBack/> Back</button>
</div>
             {isLoadingThree?<>
              <div class="blocks">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
             </>:
             <> 
             <div className='inside_history_content'>

                {newOrder.slice().reverse().map((get,index)=>(
                  <>
                  {get.order_status==="delivered"?
                  <>
                    <div className="history_data_box">

                    <div className='history_one'>
                        <div className='history_d_t'>
<h5><b>Date :</b> {get.date}</h5>
<h5><b>Time :</b> {get.time}</h5>

                            </div>
                        <div className='history_token'>
                            <h5>{get.token}</h5>
                            </div>
                            <div className='history_delvry'>
                            <h5>{get.order_status}</h5>
                            </div>
                            
                    </div>
                    <div className='history_two'>
                    <h5> <b>Name :</b>{get.user_name}</h5>
                    <h5>{get.user_email} <b>: Email</b></h5>
                    </div>
                    <div className='history_three'>
{get.ordered_dishes.map((get)=>(
    <>
 <div className='inside_history_three'>
 <p>{get.dish_name}</p>
    <p>price: {get.dish_price}</p>
    <p>quantity: {get.qty}</p>
    <p>total: {get.price_X_qty}</p>
 </div>



    </>
))}
<div className='inside_history_two_amount'>
    <p><b>Amount paid : {get.total_amount}</b></p>
</div>
                    </div>

                    
                   </div>
                   <hr></hr>
                   </>
                  :
                
                  
                  null}
                  </>
                ))}
             </div>

             </>
             }
</div>

</div>

</>
  )
}

export default Orderhistory