import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';
import { config } from "../config";
import './User.css'
import {MdAccountCircle} from "react-icons/md"
import{TbListSearch} from "react-icons/tb"
import {TbPaperBag} from "react-icons/tb"
import {MdRemoveCircle} from "react-icons/md"
import veg from "../vectors/veg.png"
import nveg from "../vectors/nveg.png"

import { Swiper, SwiperSlide } from 'swiper/react';
import  { Autoplay, Navigation, Pagination } from 'swiper';
// import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function User() {

//to get logined person name

  const { loginBy } = useContext(UserContext);
const[storeLoginby,setStoreLoginby]=useState([])

  const getLoginBy = async () => {
    try {
      const server = await axios.get(`${config.api}/user/login_by/${loginBy.user_id}`);
      setStoreLoginby(server.data);
      console.log(server.data)
      getcartid()

    } catch (error) {
      // alert("error");
    }
  };
// console.log(storeLoginby.cart_list)

  useEffect(() => {
    getLoginBy()
   fetchData()
  }, []);

// to display dish card
  const [dishData, setDishData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const server = await axios.get(`${config.api}/admin/view_dishes`);
      setDishData(server.data);
      console.log(server.data)
      setLoading(false);

      // const boo = dishData.map((dish,index)=>{
      //  return dish._id ===storeLoginby.cart_list
      // })
      // console.log(boo)
    } catch (error) {
      alert("error");
    }
  };
  const fetchDataNoloading = async () => {
    try {

      const server = await axios.get(`${config.api}/admin/view_dishes`);
      setDishData(server.data);
      setButtonloading(false)

    
    } catch (error) {
      alert("error");
    }
  };

// to add dish to cart
const[buttonloading,setButtonloading]=useState(false)
  const addtocart = async(e)=>{
    try {
      // console.log(e)
      // setLoading(true);
      setButtonloading(true)
      const putting = await axios.put(`${config.api}/user/addtocart/${loginBy.user_id}`,
      {dish_id:e});
      getLoginBy()
      // fetchData()
      fetchDataNoloading()

      getcartid()
      // setLoading(false);

    } catch (error) {
      alert("error");
    }
  }

// to open cart  
const[viewCart,setViewCart] =useState(false)
const [isLoadingTwo, setLoadingTwo] = useState(false);

const viewcartfunction=()=>{
  setViewCart(true)
  // getcartid();
}
const closeviewcartfunction=()=>{
  setViewCart(false)
}

  

  const[getcartlist,setGetcartlist]=useState([])
  // const[cartData,setCartData]=useState([])

  const getcartid = async()=>{
    try {
  // setLoadingTwo(true)

      // console.log(e)
      const getting = await axios.get(`${config.api}/user/getcart_list/${loginBy.user_id}`)

  setLoadingTwo(false)

      setGetcartlist(getting.data[0].result)
      console.log(getting.data[0].result)
//       let qty = []
//       dishData.map(get=>{
      
//     return   qty.push(get.quantity)
      
//     })
//      console.log(qty)
// let totalqty = []
// for(let i=0; i<qty.length; i++){
//   for(let j=1; j<qty[i]; j++){
//     totalqty.push(j)
//   }
// }
      // console.log(getting.data[2])
      // console.log(getting.data[2].dish_id)
// fun();
      //  await axios.get(`${config.api}/admin/view_dishes/${getcartlist.dish_id}`); 
//  const fun= getcartlist.map(async(get,index) => await axios.get(`${config.api}/admin/view_dishes/${get.dish_id}`)); 

//   getcartlist.map(async(get,index) => {
 
// try {
//   const fun=await axios.get(`${config.api}/admin/view_dishes/${get.dish_id}`) 
//   console.log(fun.data)
//   setCartData(cartData.push(fun.data))

//   console.log(cartData)
  
// } catch (error) {
//   alert(error)
// }}
//  )
  



      // {dish_id:e});
// openview()
    } catch (error) {
      alert("error");
    }
  }


const[decinc,setDecinc]=useState(1)

const dec=()=>{
  if(decinc>1){
  setDecinc(decinc-1)

  }
}
const inc=(e)=>{
  // console.log(e)
  setDecinc(decinc+1)
}
const removecart=async(e)=>{
  try {
    setLoadingTwo(true)

    // setLoading(true);

    const putting = await axios.put(`${config.api}/user/removefromtocart/${loginBy.user_id}`,
    {dish_id:e});
    getLoginBy()
    // fetchData()
    fetchDataNoloading()
    getcartid()
    // setLoadingTwo(false)

    // setLoading(false);
    
  } catch (error) {
    
  }
}

  // const[cartData,setCartData]=useState([])
  // const fun =getcartlist.map(async(get,index) => {
               
  //   try {
 
  //     const getting = await axios.get(`${config.api}/admin/view_dishes/${get.dish_id}`); 
  //     console.log(getting)
  //     setCartData(getting.data)
  // console.log(cartData)

  //   } catch (error) {
  //     alert("error ");
  //   }
  // })
  return (
    <>
     <div className="_bg">
       {/* <div className='user_home'> */}
       <div className="user_nav_bar">
          <div className="company_name">
            <span>ON!</span> {""}
            <span>kitchen</span>
          </div>
          <div className="others">
            <ul>
                <li>Home</li>
                <li>Search</li>
                {/* <li>Cart</li> */}

            </ul>
            <div className='login_person'>
            <span>|</span>
            <span><MdAccountCircle/></span>

            <span>{storeLoginby.name}</span>
            </div>
          </div>
        {/* </div> */}
       </div>
        {/* <h3 className="head">User - Dashboard</h3> */}

        <div className="banner_contents">
          {/* <div className="sliding_content"> */}
           <Swiper className="sliding_content" 
           modules={[Navigation,Pagination,Autoplay]}
           slidesPerview={1}
           navigation={true}
          //  autoplay={{delay:2000 }}
           pagination={{clickable:true}}
           >
<SwiperSlide >
      <img  className="slide_img"  src="https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600"  />
    </SwiperSlide>
    <SwiperSlide>
      <img  className="slide_img"  src="https://images.pexels.com/photos/12261064/pexels-photo-12261064.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  />
    </SwiperSlide> 
    <SwiperSlide>
      <img  className="slide_img"  src="https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  />
    </SwiperSlide> <SwiperSlide>
      <img  className="slide_img"  src="https://images.pexels.com/photos/13743442/pexels-photo-13743442.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  />
    </SwiperSlide> 
           </Swiper>

          
          {/* </div> */}
        
        </div>

        <div className='search_content'>
          <div className='search_bar'>
            <input
            type="search"
            placeholder='Type dishes name'
            id="user_input"/>
            <div className='search_button'><TbListSearch/> Search</div>

          </div>
        </div>
        <div className='cart' onClick={viewcartfunction}>
         <TbPaperBag className='cart_icon_one' /> Cart
        </div>

        <div className='display_foods'>
          <div className='inside_display_foods'>
        {isLoading ? (
                <>
                  <div class="blocks margintop">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </>):(<>
                <div className='foods_containers'>
                {dishData.map((get, index) => {
                      //         if(get.status==="available"){
                      // setStatus(true)
                      //         }
                      return (
                        <>
                      
                      <div className={get.quantity===0?"food_box_black":'food_box'}>
                          {/* {get.quantity===0?<div className='food_box_black'>
Not-available
</div>:null} */}
                   


                        <div className='food_box_left'>
<img src={get.url}/>
                        </div>
 <div className='food_box_right'>
  <div className='food_box_right_top'>
    <table>
      <tr>
<td>
<h5> {get.dish_name}  </h5>
  
  </td> 
       </tr>
      <tr>
<td>
<h6>
{get.dish_type}  
  
  </h6>
  </td>    
    </tr>
      <tr >
     <td>  {get.veg_or_nonveg==="vegetarian"?(<>
       <img className='tr_veg_nveg' src={veg}/></>):
       <><img className='tr_veg_nveg' src={nveg}/></>} 
       <h6 className='price'>  Rs.{get.price} </h6></td>
      </tr>
      <tr>
<td>
<p>{get.description}</p>
  
  </td>        </tr>
    </table>
  </div>
  <div className='food_box_right_bottom'>
    {get.quantity===0? 
      <button className='addtocart_added' >Not-available</button>:
    <>
  
    {storeLoginby.cart_list.some(e=>{
      // console.log(e===get._id)
     return  e===get._id
    })
    ?
      <button className='addtocart_added' >Added</button>
    
    :
    <button className='addtocart' onClick={()=>addtocart(get._id)}>
      {buttonloading?<>
        <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
      </>:" Add to Cart"}
     </button>
    
    
  }
  </>
  }
  </div>
                          
                        </div>
                        </div>

                      </>
                      );
                    })}
                </div>
                </>)}
                </div>
        </div>
      </div>

      {viewCart ? (
        <>
          <div  className="view_bg zindex">
          <div onClick={closeviewcartfunction}className="view_bg_two">  </div>
          <div className="cart_box">
<h4>Your Cart</h4>
           <div className='inside_cart_box'>
           {isLoadingTwo?(<>
              <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
            </>):(
                <>
                {/* {removeloading?(<>
                <div className='whitebg'>
                <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </div>
                </>):""} */}
             {getcartlist.length===0?<h3>empty</h3>:""}
                
             {getcartlist.map((get,index)=>(<>
               <table className='cart_table'>
                 <tr>
                   <th>{index + 1}</th>
                   <td>
                     <img className='cart_img' src={get.url} />
                   </td>
                   <td>
                     {get.dish_name}
                   </td>
                   <td>
                 
                     {/* <input className='cart_input' type="number" /> */}
                     {/* <select>
                     
                      <option>{}</option>

                    
                     </select> */}
                     <div className='cart_inc_dec'>
                      <h2 onClick={dec}>-</h2>
                      <div className='display_inc_dec'>{decinc}</div>
                      <h2 onClick={()=>inc(get.quantity)}>+</h2>
                     </div>
                   </td>
                   <td>
                     <h5>Rs.
                       {get.price*decinc}
                     </h5>                  </td>

                   <td >
                     <MdRemoveCircle onClick={()=>removecart(get._id)} className='cart_icon' />
                   </td>
                 </tr>
               </table>
             </>))}
              </>
            )}
           </div>
           <div className='cart_bottom'>
            <button>Buy</button>
            <div className='total_price'><div className='total_price_display'>hlo</div>:Total </div>
           </div>
             </div>
        
          </div>
        </>
      ) : null}
    </>
  )
}

export default User