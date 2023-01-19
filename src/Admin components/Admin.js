import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import "./view.css";
import "./loading.css";
import { MdAddBox } from "react-icons/md";
import { config } from "../config";
import axios from "axios";
import { AiOutlineFullscreen } from "react-icons/ai";
import{RiEditBoxFill,RiDeleteBin6Fill} from "react-icons/ri"
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {

  //to get logined person name
  const { loginBy } = useContext(UserContext);
  console.log(loginBy.admin_id);
const[storeLoginby,setStoreLoginby]=useState([])

  const getLoginBy = async () => {
    try {
      const server = await axios.get(`${config.api}/admin/login_by/${loginBy.admin_id}`);
      setStoreLoginby(server.data);
    } catch (error) {
      // alert("error");
    }
  };
  
  const navigate = useNavigate();
  const openadddishes = () => {
    navigate("/admin_add_dishes");
  };

  const [dishData, setDishData] = useState([]);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    getLoginBy()
    fetchData();
    setView(false)
    setForDelete(true)
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const server = await axios.get(`${config.api}/admin/view_dishes`);
      setDishData(server.data);
      setLoading(false);
    } catch (error) {
      alert("error");
    }
  };

  const[isLoadingTwo,setLoadingTwo]=useState(false)
  const [view, setView] = useState(false);
  const [singleDish, setSingleDish] = useState([]);
  const [forDelete,setForDelete] =useState(true)
  const openview = async (fun) => {
    // e.preventDefault()
    // setName(e);
    // getOneDish()
    try {
      setView(true);
setLoadingTwo(true)
      const getting = await axios.get(`${config.api}/admin/view_dishes/${fun}`);
      setSingleDish(getting.data);
setLoadingTwo(false)

      // console.log(getting)
    } catch (error) {
      alert("error ");
    }
  };
  const openDelete =()=>{
    setForDelete(false)
  }
  const closeView=()=>{
    setView(false)
    setForDelete(true)
    fetchData()

  }
  const dontDelete=()=>{
    setForDelete(true)

  }
  const confirmDelete=async()=>{
    try {
      setForDelete(true)

      const deleting = await axios.delete(`${config.api}/admin/delete_dishes/${singleDish.dish_name}`);
      if(deleting.data.message==="Dish deleted successfully"){
        toast.success(`${deleting.data.message}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
setTimeout(()=> closeView(), 1500)
   

      }
      // console.log(getting)
    } catch (error) {
      alert("error ");
    }
  }
  // console.log(singleDish);
  // console.log(singleDish.url);


  return (
    <>
      <div className="_bg">
        <div className="nav_bar">
          <div className="company_name">
            <span>ON!</span> {""}
            <span>kitchen</span>
          </div>
          <div className="others">
            <span>|</span>
            <span></span>

            <span>{storeLoginby.name}</span>
          </div>
        </div>
        <h3 className="head">Admin - Dashboard</h3>

        <div className="all_contents">
          <div className="main_content">
            <div className="center_btn">
              <div className="inside_center_btn" onClick={openadddishes}>
                <MdAddBox />

                <Link className="add_btn">Add New Dishes</Link>
              </div>
            </div>

            <div className="table_content">
              {isLoading ? (
                <>
                  <div class="blocks">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </>
              ) : (
                <table className="table">
                  <thead class="table-head">
                    <tr>
                      <th>No Of Dishes</th>
                      <th>Name</th>
                      <th>status</th>
                      <th>quantity</th>
                      <th>Full details </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dishData.map((get, index) => {
                      //         if(get.status==="available"){
                      // setStatus(true)
                      //         }
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{get.dish_name}</td>
                          <td
                            className={
                              get.status === "available"
                                ? "green_color"
                                : "red_color"
                            }
                          >
                            {get.status}
                          </td>
                          <td>{get.quantity}</td>
                          <td>
                            <button
                              // onClick={openview(get.dish_name)}
                              onClick={() => openview(get._id)}
                              className="view_btn"
                            >
                              {" "}
                              <AiOutlineFullscreen className="icon" />
                              view
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="side_content"></div>
        </div>
      </div>

      {view ? (
        <>
          <div  className="view_bg">
          <div onClick={closeView}className="view_bg_two">  </div>
          <div className="view_box">

            {isLoadingTwo?(<>
              <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
            </>):(
                <>
              {forDelete?(<>
              <div className="view_box_top">
              <div className="view_img">
               <img src={singleDish.url} />
 
               </div>
               <div className="view_details">
                 <h6><span>Dish_name :</span> {singleDish.dish_name}</h6>
                 <h6><span>Dish_type :</span> {singleDish.dish_type}</h6>
                 <h6><span>Price :</span> {singleDish.price}</h6>
                 <h6><span>Quantity :</span> {singleDish.quantity}</h6>
                 <h6><span>Status :</span> {singleDish.status}</h6>
                 <h6><span>Category :</span> {singleDish.veg_or_nonveg}</h6>
                 <h6><span>Country :</span> {singleDish.country}</h6>
                 <p><span>Description :</span> {singleDish.description}</p>
 
 
               </div>
               <div className="view_edit_delete">
                 <Link to={`/admin_edit_dishes/${singleDish._id}`}   className="add_btn"><RiEditBoxFill className="icons_edit_delete"/>Edit</Link>
                 <button className="add_btn" onClick={openDelete}><RiDeleteBin6Fill className="icons_edit_delete"/>Delete</button>
               </div>
              </div>
              <div className="view_box_bottom">
              <div>
                 <button onClick={closeView} className="view_back_btn">Back</button>
               </div>
              </div>
              </>):(<>
              <div className="delete_dish">
               <h4>Are you sure want delete &nbsp; <span>{singleDish.dish_name} </span>?</h4>
               <div className="yes_no_btn">
                 <button onClick={dontDelete} className="view_back_btn delete_red">No</button>
                 <button onClick={confirmDelete} className="view_back_btn delete_green">Yes</button>
               </div>
              </div>
              </>)}
              </>
            )}
             </div>
        
          </div>
        </>
      ) : null}

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
theme="colored"
/>
    </>
  );
}

export default Admin;
