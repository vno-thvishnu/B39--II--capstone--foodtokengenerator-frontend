import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";
import "./view.css";
import "./loading.css";
import { MdAddBox } from "react-icons/md";
import { config } from "../config";
import axios from "axios";
import { AiOutlineFullscreen } from "react-icons/ai";
import { RiEditBoxFill, RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdRefreshCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
  const removeLocalstorgae = () => {
    localStorage.removeItem("loginperson_user");
    localStorage.removeItem("loginperson_admin");

    navigate("/");
  };
  const routerorderhistory = () => [navigate("/admin_orderhistory")];

  const [storeLoginby, setStoreLoginby] = useState([]);

  const getLoginBy = async () => {
    try {
      const server = await axios.get(
        `${config.api}/admin/login_by/${localStorage.getItem(
          "loginperson_admin"
        )}`
      );
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
    getLoginBy();
    fetchData();
    getordersloading();
    setView(false);
    setForDelete(true);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const server = await axios.get(`${config.api}/admin/view_dishes`);
      setDishData(server.data);
      setLoading(false);
    } catch (error) {
      alert("error");
    }
  };

  const [isLoadingTwo, setLoadingTwo] = useState(false);
  const [view, setView] = useState(false);
  const [singleDish, setSingleDish] = useState([]);
  const [forDelete, setForDelete] = useState(true);
  const openview = async (fun) => {
    try {
      setView(true);
      setLoadingTwo(true);
      const getting = await axios.get(`${config.api}/admin/view_dishes/${fun}`);
      setSingleDish(getting.data);
      setLoadingTwo(false);
    } catch (error) {
      alert("error ");
    }
  };
  const openDelete = () => {
    setForDelete(false);
  };
  const closeView = () => {
    setView(false);
    setForDelete(true);
  };
  const dontDelete = () => {
    setForDelete(true);
  };
  const confirmDelete = async () => {
    try {
      setForDelete(true);

      const deleting = await axios.delete(
        `${config.api}/admin/delete_dishes/${singleDish.dish_name}`
      );
      if (deleting.data.message === "Dish deleted successfully") {
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
        setTimeout(() => closeView(), 1500);
      }
    } catch (error) {
      alert("error ");
    }
  };
  const [newOrder, setNewOrder] = useState([]);
  const [isLoadingThree, setLoadingthree] = useState(false);
  const getordersloading = async () => {
    try {
      setLoadingthree(true);
      const getting = await axios.get(`${config.api}/admin/view_tokens`);
      setNewOrder(getting.data);
      setLoadingbutton(false);
      setLoadingthree(false);
    } catch (error) {
      alert("error");
    }
  };
  const getorders = async () => {
    try {
      const getting = await axios.get(`${config.api}/admin/view_tokens`);
      setNewOrder(getting.data);
      setLoadingbutton(false);
    } catch (error) {
      alert("error");
    }
  };

  const [openMore, setOpenMore] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [getMoreDetails, setGetMoreDetails] = useState([]);
  const openmoredetails = () => {
    setOpenMore(true);
  };

  const closemoredetails = () => {
    setOpenMore(false);
  };

  const getdetails = async (e) => {
    try {
      setLoadingMore(true);
      const getting = await axios.get(`${config.api}/admin/order_details/${e}`);
      setLoadingMore(false);
      setGetMoreDetails(getting.data);
    } catch (error) {
      alert("error");
    }
  };
  const [isLoadingbutton, setLoadingbutton] = useState(false);
  const [buttonIdpass, setButtonIdpass] = useState([]);

  const changetopicked = async (e) => {
    try {
      setLoadingbutton(true);
      const edit = await axios.put(
        `${config.api}/admin/order_status_picked/${e}`
      );
      if (edit.data.message === "Order picked") {
        getorders();
        toast(`${edit.data.message}`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      alert("error");
    }
  };
  const changetodelivered = async (e, f, g) => {
    try {
      setLoadingbutton(true);
      const edit = await axios.put(
        `${config.api}/admin/order_status_delivered/${e}`,
        { user_email: f, token: g }
      );
      if (edit.data.message === "Order ready to delivery") {
        getorders();
        toast(`${edit.data.message}`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      alert("error");
    }
  };
  return (
    <>
      <div className="_bg">
        <div className="nav_bar">
          <div className="company_name">
            <span>ON!</span> {""}
            <span>kitchen</span>
          </div>
          <div className="others admin_other">
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li onClick={routerorderhistory}>Order history</li>

              <li onClick={removeLocalstorgae}>Logout</li>
            </ul>

            <div className="login_person_admin">
              <span>|</span>
              <span>
                <MdAccountCircle />
              </span>

              <span>{storeLoginby.name}</span>
            </div>
          </div>
        </div>
        <h3 id="home" className="head">
          Admin - Dashboard
        </h3>

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
          <div className="side_content">
            <div className="token_box">
              <div className="token_box_top">
                <h4>Tokens</h4>
              </div>
              <div className="token_box_bottom">
                <button
                  onClick={getordersloading}
                  className="refresh_btn rbtn_admin"
                >
                  <IoMdRefreshCircle className="refresh_btn_icon rbtn_admin_icon" />
                  refresh
                </button>
                {isLoadingThree ? (
                  <>
                    <div class="blocks">
                      <div class="block orange"></div>
                      <div class="block blue"></div>
                    </div>
                  </>
                ) : (
                  <>
                    {newOrder
                      .slice()
                      .reverse()
                      .map((get, index) => (
                        <>
                          {get.order_status === "delivered" ? (
                            ""
                          ) : (
                            <>
                              <div className="inside_token_box_bottom">
                                <div className="token_data">
                                  <h4>{get.token}</h4>
                                  <h6>paid: {get.total_amount}</h6>
                                  {get.order_status === "droped" ? (
                                    <button
                                      className="token_data_droped"
                                      onClick={() => {
                                        changetopicked(get._id);
                                        setButtonIdpass(get._id);
                                      }}
                                    >
                                      {isLoadingbutton &&
                                      get._id === buttonIdpass ? (
                                        <>
                                          <>
                                            <div class="blocks ">
                                              <div class="block orange forbtnspinner"></div>
                                              <div class="block blue forbtnspinner"></div>
                                            </div>
                                          </>
                                        </>
                                      ) : (
                                        <>pick !</>
                                      )}
                                    </button>
                                  ) : null}
                                  {get.order_status === "picked" ? (
                                    <button
                                      className="token_data_picked"
                                      onClick={() => {
                                        changetodelivered(
                                          get._id,
                                          get.user_email,
                                          get.token
                                        );
                                        setButtonIdpass(get._id);
                                      }}
                                    >
                                      {isLoadingbutton &&
                                      get._id === buttonIdpass ? (
                                        <>
                                          <>
                                            <div class="blocks ">
                                              <div class="block orange forbtnspinner"></div>
                                              <div class="block blue forbtnspinner"></div>
                                            </div>
                                          </>
                                        </>
                                      ) : (
                                        <> over ! </>
                                      )}
                                    </button>
                                  ) : null}{" "}
                                </div>
                                <div className="more_details">
                                  <h6
                                    onClick={() => {
                                      openmoredetails();
                                      getdetails(get._id);
                                    }}
                                  >
                                    <span>click here for </span>more details
                                  </h6>
                                  {get.ordered_dishes.map((get) => (
                                    <div className="inside_more_details">
                                      <p>{get.dish_name}</p>
                                      <p>price: {get.dish_price}</p>
                                      <p>quantity: {get.qty}</p>
                                      <p>total: {get.price_X_qty}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <h6>Powered-by</h6>
        <h6>ON! kitchen</h6>
      </div>

      {view ? (
        <>
          <div className="view_bg">
            <div onClick={closeView} className="view_bg_two">
              {" "}
            </div>
            <div className="view_box">
              {isLoadingTwo ? (
                <>
                  <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </>
              ) : (
                <>
                  {forDelete ? (
                    <>
                      <div className="view_box_top">
                        <div className="view_img">
                          <img src={singleDish.url} />
                        </div>
                        <div className="view_details">
                          <h6>
                            <span>Dish_name :</span> {singleDish.dish_name}
                          </h6>
                          <h6>
                            <span>Dish_type :</span> {singleDish.dish_type}
                          </h6>
                          <h6>
                            <span>Price :</span> {singleDish.price}
                          </h6>
                          <h6>
                            <span>Quantity :</span> {singleDish.quantity}
                          </h6>
                          <h6>
                            <span>Status :</span> {singleDish.status}
                          </h6>
                          <h6>
                            <span>Category :</span> {singleDish.veg_or_nonveg}
                          </h6>
                          <h6>
                            <span>Country :</span> {singleDish.country}
                          </h6>
                          <p>
                            <span>Description :</span> {singleDish.description}
                          </p>
                        </div>
                        <div className="view_edit_delete">
                          <Link
                            to={`/admin_edit_dishes/${singleDish._id}`}
                            className="add_btn"
                          >
                            <RiEditBoxFill className="icons_edit_delete" />
                            Edit
                          </Link>
                          <button className="add_btn" onClick={openDelete}>
                            <RiDeleteBin6Fill className="icons_edit_delete" />
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="view_box_bottom">
                        <div>
                          <button onClick={closeView} className="view_back_btn">
                            Back
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="delete_dish">
                        <h4>
                          Are you sure want delete &nbsp;{" "}
                          <span>{singleDish.dish_name} </span>?
                        </h4>
                        <div className="yes_no_btn">
                          <button
                            onClick={dontDelete}
                            className="view_back_btn delete_red"
                          >
                            No
                          </button>
                          <button
                            onClick={confirmDelete}
                            className="view_back_btn delete_green"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : null}

      {openMore ? (
        <>
          <div className="view_bg">
            <div onClick={closemoredetails} className="view_bg_two">
              {" "}
            </div>
            <div className="view_box_two">
              {isLoadingMore ? (
                <>
                  <div class="blocks blockstwo">
                    <div class="block orange"></div>
                    <div class="block blue"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="more_box">
                    <div className="more_box_top">
                      <h3>Customer details</h3>
                      <div className="indise_more_box_top">
                        <h5>Name : {getMoreDetails.user_name}</h5>
                        <h5>Email : {getMoreDetails.user_email}</h5>
                      </div>
                    </div>
                    <div className="more_box_bottom">
                      <h3>Order details</h3>
                      <div className="indise_more_box_bottom">
                        <h5>Date : {getMoreDetails.date}</h5>
                        <h5>Time : {getMoreDetails.time}</h5>
                      </div>
                    </div>
                  </div>
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
