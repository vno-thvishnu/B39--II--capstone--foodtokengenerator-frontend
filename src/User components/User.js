import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { config } from "../config";
import "./User.css";
import { MdAccountCircle } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import { TbPaperBag } from "react-icons/tb";
import { MdRemoveCircle } from "react-icons/md";
import {IoMdRefreshCircle} from "react-icons/io"
import veg from "../vectors/veg.png";
import nveg from "../vectors/nveg.png";
import cardpay from "../vectors/cardpayment.png";
import upipay from "../vectors/upi.png";
import netpay from "../vectors/netbanking.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
// import { Navigation, Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";

function User() {
  const navigate = useNavigate();
  // const [count , setCount] = [2, 3, 1, 10];
  // count[0] == 2
  // count[2] == 1
  // setCount(...count, count[3] = 10);

  //to get logined person name

  // const { loginBy } = useContext(UserContext);
  const [storeLoginby, setStoreLoginby] = useState([]);
  const removeLocalstorgae = () => {
    localStorage.removeItem("loginperson_user");
    localStorage.removeItem("loginperson_admin");

    navigate("/");
  };

  const getLoginBy = async () => {
    try {
      const server = await axios.get(
        `${config.api}/user/login_by/${localStorage.getItem(
          "loginperson_user"
        )}`
      );
      setStoreLoginby(server.data);
      console.log(server.data);

      getcartid();
    } catch (error) {
      // alert("error");
    }
  };
  // console.log(storeLoginby.cart_list)

  useEffect(() => {
    getLoginBy();
    fetchData();
  }, []);

  // to display dish card
  const [dishData, setDishData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const server = await axios.get(`${config.api}/admin/view_dishes`);
      setDishData(server.data);
      console.log(server.data);

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
      setButtonloading(false);
    } catch (error) {
      alert("error");
    }
  };

  // to add dish to cart
  const [buttonloading, setButtonloading] = useState(false);
  const addtocart = async (e) => {
    try {
      // console.log(e)
      // setLoading(true);
      setButtonloading(true);
      const putting = await axios.put(
        `${config.api}/user/addtocart/${localStorage.getItem(
          "loginperson_user"
        )}`,
        { dish_id: e }
      );
      getLoginBy();
      // fetchData()
      fetchDataNoloading();

      getcartid();
      // setLoading(false);
    } catch (error) {
      alert("error");
    }
  };

  // to open cart
  const [viewCart, setViewCart] = useState(false);
  const [openNext, setOpenNext] = useState(true)
  const [isLoadingTwo, setLoadingTwo] = useState(false);
  const [isLoadingThree, setLoadingthree] = useState(false);


  const viewcartfunction = () => {
    setViewCart(true);
  setOpenNext(true)

    // getcartid();
  };
  const closeviewcartfunction = () => {
    setViewCart(false);
  setOpenNext(true)
  setLoadingthree(false)


  };
const nxt=()=>{
  setOpenNext(false)
}
const cartback=()=>{
  setOpenNext(true)
}
  const [getcartlist, setGetcartlist] = useState([]);
  // const[cartData,setCartData]=useState([])

  const getcartid = async () => {
    try {
      // setLoadingTwo(true)

      // console.log(e)
      const getting = await axios.get(
        `${config.api}/user/getcart_list/${localStorage.getItem(
          "loginperson_user"
        )}`
      );

      setLoadingTwo(false);

      setGetcartlist(getting.data[0].result);
      console.log(getting.data[0].result);

      let collections = getting.data[0].result;

      updateDicinc(collections);
      // setDecinc([1])
      // getcartlist.map((a,index)=>{
      // setDecinc(decinc(index).push(1))
      // })

      // console.log(decinc)

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
      alert("error rrr");
    }
  };

  const [decinc, setDecinc] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  // const[initialAmount,setInitialAmount]=useState
  // totalAmount.reduce((pre, cur) => pre+cur)
  // const [displayTotal,setDisplayTotal]=useState("")

  // const redFunc=()=>{
  //   if(getcartlist!==0){
  // setDisplayTotal(
  //   totalAmount.reduce((pre,cru)=>pre + cru))
  //   }

  // }

  let updateDicinc = (arr) => {
    console.log(arr);

    // setDecinc([0])
    // setTotalAmount([0])
    let newArr = [...decinc];
    let amtArr = [...totalAmount];

    for (let index in arr) {
      newArr[index] = 1;

      if (arr[index].quantity !== 0) {
        amtArr[index] = newArr[index] * arr[index].price;
      } else {
        amtArr[index] = newArr[index] * 0;
      }
    }

    setDecinc(newArr);
    setTotalAmount(amtArr);
    // reduceFunction()

    // console.log("check1")

    // redFunc()
    // console.log("check2")
  };

  const dec = (index, price) => {
    // console.log(index)
    // if(setDecinc[index]===undefined){
    //   setDecinc[index]=1
    // }

    // setDecinc(...decinc,decinc[index]-1)

    // let decdish = storeLoginby.cart_list.map(cart => {
    //   return cart === e
    // })
    // console.log(price);

    let newArr = [...decinc];
    let amtArr = [...totalAmount];

    if (newArr[index] === undefined) {
      newArr[index] = 1;
    } else if (newArr[index] > 1) {
      newArr[index] = newArr[index] - 1;
    }
    setDecinc(newArr);

    amtArr[index] = price * newArr[index];
    setTotalAmount(amtArr);

    // console.log(amtArr);
  };
  const inc = (quantity, index, price) => {
    // setDecinc(decinc+1)
    let newArr = [...decinc];
    let amtArr = [...totalAmount];

    if (newArr[index] === undefined) {
      newArr[index] = 1;
    } else if (newArr[index] < quantity) {
      newArr[index] = newArr[index] + 1;
    }
    setDecinc(newArr);

    amtArr[index] = price * newArr[index];
    setTotalAmount(amtArr);
    // console.log(amtArr);
  };

  // console.log(decinc)

  const removecart = async (e, index) => {
    try {
      setLoadingTwo(true);

      let deleteAmount = totalAmount;
      deleteAmount.splice(index, 1);
      setTotalAmount(deleteAmount);

      // setLoading(true);

      const putting = await axios.put(
        `${config.api}/user/removefromtocart/${localStorage.getItem(
          "loginperson_user"
        )}`,
        { dish_id: e }
      );
      getLoginBy();
      // fetchData()
      fetchDataNoloading();
      // setTotalAmount([])
      getcartid();
      // setLoadingTwo(false)

      // setLoading(false);
    } catch (error) {}
  };

  const deletecart = async()=>{
    try {
      const deleting = await axios.delete(
        `${config.api}/user/delete_cart/${localStorage.getItem("loginperson_user")}`);
        if(deleting.data.message==="cart deleted successfully"){
      getLoginBy();
      getcartid();

        }

    } catch (error) {
      
    }
  }

  const buyfunction = async () => {
    // console.log(decinc)
    // console.log(totalAmount)
    // decinc.map((count,index)=>{
    //   return {
    //     qty1:count
    //   }
    // })
    // console.log(getcartlist[1].quantity)
    try {
      setLoadingthree(true)
      const date = new Date();

      const currentDay =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      const currentTime =
        date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();

      const values = {
        date: `${currentDay}`,
        // date: "27.1.2023",
        time: `${currentTime}`,
        user_id: `${storeLoginby._id}`,
        user_name: `${storeLoginby.name}`,
        user_email: `${storeLoginby.email}`,

        ordered_dishes: getcartlist.map((list, index) => {
          if (list.quantity !== 0) {
            return {
              dish_id: list._id,
              dish_name: list.dish_name,
              dish_price: list.price,
              qty: decinc[index],
              price_X_qty: totalAmount[index],
            };
          }
        }),

        total_amount: `Rs. ${totalAmount.reduce((pre, cur) => pre + cur, 0)}`,
      };

      // const qty_value={
      //   ordered_dishes: getcartlist.map((list,index) =>{

      //     if(list.quantity !==0 ){
      //       return({
      //         dish_id:list._id,

      //         qty:decinc[index],
      //       }
      //       )
      //     }

      //   }),
      // }

      // console.log(qty_value)
      const server = await axios.post(`${config.api}/user/create_token`, {
        ...values,
      });

      if(server.data.message==="order placed successfully"){
        deletecart()
        
        closeviewcartfunction()
      fetchDataNoloading();

        toast.success(`Token:${server.data.token},Order placed`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (error) {
      alert("error_token");
    }
  };

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
const [orderView,setOrderView]=useState(false)

const openorder=()=>{
setOrderView(true)
getorder()
}
const closeorderfunction=()=>{
  setOrderView(false)

}
const[saveOrder,setSaveOrder]=useState([])
const[isLoadingFour,setLoadingFour]=useState(false)

const getorder =async()=>{
  try {
    setLoadingFour(true)
    const server = await axios.get(`${config.api}/user/view_order/${localStorage.getItem(
      "loginperson_user"
    )}`);
    // console.log(server)
setSaveOrder(server.data)
    setLoadingFour(false)
    
  } catch (error) {
    
  }
}

const[buttonSpinner,setButtonSpinner]=useState()

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
              <li onClick={openorder}>Order</li>

              <li onClick={removeLocalstorgae}>Logout</li>
            </ul>
            <div className="login_person">
              <span>|</span>
              <span>
                <MdAccountCircle />
              </span>

              <span>{storeLoginby.name}</span>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* <h3 className="head">User - Dashboard</h3> */}

        <div className="banner_contents">
          {/* <div className="sliding_content"> */}
          <Swiper
            className="sliding_content"
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerview={1}
            navigation={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img
                className="slide_img"
                src="https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=600"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="slide_img"
                src="https://images.pexels.com/photos/12261064/pexels-photo-12261064.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="slide_img"
                src="https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="slide_img"
                src="https://images.pexels.com/photos/13743442/pexels-photo-13743442.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              />
            </SwiperSlide>
          </Swiper>

          {/* </div> */}
        </div>

        <div className="search_content">
          <div className="search_bar">
            <input
              type="search"
              placeholder="Type dishes name"
              id="user_input"
            />
            <div className="search_button">
              <TbListSearch /> Search
            </div>
          </div>
        </div>
        <div className="cart" onClick={viewcartfunction}>
          <TbPaperBag className="cart_icon_one" /> Cart
        </div>

        <div className="display_foods">
          <div className="inside_display_foods">
            {isLoading ? (
              <>
                <div class="blocks margintop">
                  <div class="block orange"></div>
                  <div class="block blue"></div>
                </div>
              </>
            ) : (
              <>
                <div className="foods_containers">
                  {dishData.map((get, index) => {
                    //         if(get.status==="available"){
                    // setStatus(true)
                    //         }
                    return (
                      <>
                        <div
                          className={
                            get.quantity === 0 ? "food_box_black" : "food_box"
                          }
                        >
                          {/* {get.quantity===0?<div className='food_box_black'>
Not-available
</div>:null} */}

                          <div className="food_box_left">
                            <img src={get.url} />
                          </div>
                          <div className="food_box_right">
                            <div className="food_box_right_top">
                              <table>
                                <tr>
                                  <td>
                                    <h5> {get.dish_name} </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6>{get.dish_type}</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    {get.veg_or_nonveg === "vegetarian" ? (
                                      <>
                                        <img
                                          className="tr_veg_nveg"
                                          src={veg}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          className="tr_veg_nveg"
                                          src={nveg}
                                        />
                                      </>
                                    )}
                                    <h6 className="price"> Rs.{get.price} </h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p>{get.description}</p>
                                  </td>{" "}
                                </tr>
                              </table>
                            </div>
                            <div className="food_box_right_bottom">
                              {get.quantity === 0 ? (
                                <button className="addtocart_added">
                                  Not-available
                                </button>
                              ) : (
                                <>
                                  {/* {console.log(storeLoginby.cart_list)} */}

                                  {
                                  // get._id !== undefined &&
                                  storeLoginby.cart_list !== undefined ? (
                                    <>
                                      {storeLoginby.cart_list.some((e) => {
                                        // console.log(e===get._id)
                                        return e === get._id;
                                      }) ? (
                                        <button className="addtocart_added">
                                          Added
                                        </button>
                                      ) : (
                                        <button
                                          className="addtocart"
                                          onClick={() => {addtocart(get._id);setButtonSpinner(get._id)}}
                                        >
                                          {buttonloading && get._id===buttonSpinner ? (
                                            <>
                                              <div class="blocks ">
                                                <div class="block orange forbtnspinner"></div>
                                                <div class="block blue forbtnspinner"></div>
                                              </div>
                                            </>
                                          ) : (
                                            " Add to Cart"
                                          )}
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                    className="addtocart"
                                    onClick={() => {addtocart(get._id);setButtonSpinner(get._id)}}
                                  >
                                    {buttonloading && get._id===buttonSpinner  ? (
                                      <>
                                        <div class="blocks ">
                                          <div class="block orange forbtnspinner"></div>
                                          <div class="block blue forbtnspinner"></div>
                                        </div>
                                      </>
                                    ) : (
                                      " Add to Cart"
                                    )}
                                  </button>
                                  // ""
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {viewCart ? (
        <>
          <div className="view_bg zindex">
            <div onClick={closeviewcartfunction} className="view_bg_two">
              {" "}
            </div>
            <div className="cart_box">
              <h4>Your Cart</h4>
              <div className="inside_cart_box">
                {isLoadingTwo ? (
                  <>
                    <div class="blocks blockstwo">
                      <div class="block orange"></div>
                      <div class="block blue"></div>
                    </div>
                  </>
                ) : (
               <>
               {openNext?(<>
                <>
                    {/* {removeloading?(<>
                <div className='whitebg'>
                <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </div>
                </>):""} */}
                    {getcartlist.length === 0 ? <h3 >empty</h3> : ""}

                    {getcartlist.map((get, index) => (
                      <>
                        {/* {updateVal(index)} */}

                        {/* {setDecinc(decinc.push(3))} */}
                        {/* {setDecinc(decinc[index]=1)} */}

                        <table className="cart_table" key={index}>
                          <tr className={get.quantity === 0 ? "tr_black" : ""}>
                            <th>{index + 1}</th>
                            <td>
                              <img className="cart_img" src={get.url} />
                            </td>
                            <td>{get.dish_name}</td>
                            {get.quantity === 0 ? (
                              <td className="cart_notavi">Not-available</td>
                            ) : (
                              <>
                                <td className="cart_notavi">
                                  <td>
                                    <div className="cart_inc_dec">
                                      <h2 onClick={() => dec(index, get.price)}>
                                        -
                                      </h2>
                                      <div className="display_inc_dec">
                                        {decinc[index]}
                                      </div>
                                      <h2
                                        onClick={() =>
                                          inc(get.quantity, index, get.price)
                                        }
                                      >
                                        +
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="cart_price">
                                    <h5>
                                      Rs.
                                      {/* {console.log(get.price * decinc[index])} */}
                                      {get.price * decinc[index]}
                                      {/* {totalAmount[index]} */}
                                    </h5>{" "}
                                  </td>
                                </td>
                              </>
                            )}
                            <td>
                              <MdRemoveCircle
                                onClick={() => removecart(get._id, index)}
                                className="cart_icon"
                              />
                            </td>
                          </tr>
                        </table>
                      </>
                    ))}
                  </>
               </>):(<>
{isLoadingThree?(<>

  
                    <div class="blocks blockstwo">
                      <div class="block orange"></div>
                      <div class="block blue"></div>
                    </div>
                  
</>):(<>
  <div className="payment_div">
  <div className="pay_list">
  <h4>Select your payment method</h4>

<div onClick={buyfunction}> <img src={netpay}/>Net Banking</div>
<div  onClick={buyfunction}>  <img src={upipay}/> UPI</div>
<div  onClick={buyfunction}>  <img src={cardpay}/> Credit/Debit card</div>
<button onClick={cartback}>Back</button>


  </div>
  </div> 
</>)}       
         </>)}
               </>
                )}
              </div>
              {getcartlist.length === 0 ? "" : 
<>
             {openNext?<>
              <div className="cart_bottom">
                <button onClick={() => nxt()}>Buy</button>
                <div className="total_price">
                  <div className="total_price_display">
                    {getcartlist.length === 0
                      ? ""
                      : totalAmount.reduce((pre, cur) => pre + cur, 0)}
                    {/* {displayTotal} */}
                    {/* {totalAmount} */}
                  </div>
                  : Total{" "}
                </div>
              </div>
             </>:""}
             </>}
            </div>
          </div>
        </>
      ) : null}



{orderView?(<>
  <div className="view_bg zindex yellowlow">
            <div onClick={closeorderfunction} className="view_bg_two">
              {" "}
            </div>
            <div className="cart_box primary">
              <h4>Your Order</h4>
              <div className="inside_cart_box fororder">
<button onClick={getorder} className="refresh_btn"> 
<IoMdRefreshCircle  className="refresh_btn_icon" />


Refresh</button>
{isLoadingFour? <>
                    <div class="blocks blockstwo">
                      <div class="block orange"></div>
                      <div class="block blue"></div>
                    </div>
                  </>:<>
                 {saveOrder.slice().reverse().map((get,index)=>(
<>
{get.order_status!=="delivered"?
<div className="order_box">
                    <div className="order_box_top">
                      <div className="order_box_top_one">
<h2>{get.token}</h2>
{get.order_status==="droped"? <h3>...waiting ⏳</h3>:"" }
{get.order_status==="picked"? <h3>...preparing 🔥</h3>:"" }



                      </div>
                      <div className="order_box_top_two">
                      
<h6>Date: {get.date} </h6>
<h6>Time: {get.time}</h6>

                       
<h6>Amount paid: {get.total_amount}</h6>

                        </div>
                    </div>
                    <div className="order_box_bottom">
{get.ordered_dishes.map((get,index)=>(
  <>
  <div className="inside_order_box_bottom">
    <p>{index+1}</p>
    <p>{get.dish_name}</p>
    <p>price: {get.dish_price}</p>
    <p>quantity: {get.qty}</p>
    <p>total: {get.price_X_qty}</p>



  </div>
  </>
))}
                    </div>
                  </div>
:null}


</>
))}
<hr></hr>
<h4>Order history</h4>
{saveOrder.slice().reverse().map((get,index)=>(
<>
{get.order_status=="delivered"?
<div className="order_box_black">
                    <div className="order_box_top">
                      <div className="order_box_top_one">
<h2>{get.token}</h2>
{get.order_status==="droped"? <h3>...waiting ⏳</h3>:"" }
{get.order_status==="picked"? <h3>...preparing 🔥</h3>:"" }
{get.order_status==="delivered"? <h3>...delivered ✔</h3>:"" }




                      </div>
                      <div className="order_box_top_two">
                      
<h6>Date: {get.date} </h6>
<h6>Time: {get.time}</h6>

                       
<h6>Amount paid: {get.total_amount}</h6>

                        </div>
                    </div>
                    <div className="order_box_bottom">
{get.ordered_dishes.map((get,index)=>(
  <>
  <div className="inside_order_box_bottom">
    <p>{index+1}</p>
    <p>{get.dish_name}</p>
    <p>price: {get.dish_price}</p>
    <p>quantity: {get.qty}</p>
    <p>total: {get.price_X_qty}</p>



  </div>
  </>
))}
                    </div>
                  </div>
:null}


</>
))}
                  </>}

                </div>
                </div>
                </div>

</>):""}



<ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

    </>
  );
}

export default User;
