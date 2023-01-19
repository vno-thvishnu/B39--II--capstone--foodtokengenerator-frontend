import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { config } from "../config";
import { useFormik } from "formik";
import "./Add_dishes.css";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit_dishes() {
    const {_id}=useParams()
  // const [singleDish, setSingleDish] = useState([]);



 
  const openview = async () => {
    // e.preventDefault()
    // setName(e);
    // getOneDish()
    try {
      //       setView(true);
      // setLoadingTwo(true)
            const getting = await axios.get(`${config.api}/admin/view_dishes/${_id}`);
          //   setSingleDish(getting.data);
      // setLoadingTwo(false)
      formik.setValues(getting.data)
      
            // console.log(getting)
          } catch (error) {
            alert("error ");
          }
        }
  

useEffect(()=>{
openview();
},[])
    const navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      dish_name: "",
      veg_or_nonveg: "",
      url: "",
      dish_type: "",
      price: "",
      quantity: "",
      status: "",
      country: "",
      description:"",
    },
    validate: (values) => {
      let error = {};

      if (values.dish_name === "") {
        error.dish_name = "please enter Name";
      }
      if (values.dish_name && (values.dish_name.length <= 2 || values.dish_name.length > 25)) {
        error.dish_name = "Name must be between 3 to 25 characters";
      }
      if (values.veg_or_nonveg === "") {
        error.veg_or_nonveg = "please select one";
      }
      if (values.url === "") {
        error.url = "please enter Url";
      }
// if(values.url && 
  // /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
  // /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/ 
// ){
//   error.url="please enter valid Url"
// }
if (values.dish_type === "") {
  error.dish_type = "please choose one";
}
if (values.price === "" && values.quantity) {
  error.price = "please enter price";
}
if (values.quantity === "" && values.price) {
  error.quantity = "please enter quantity";
}
if (values.quantity === "" && values.price==="") {
  error.price=" "
  error.quantity = "please enter price and quantity";
}
if (values.status === "") {
  error.status = "please select one";
}
if (values.country === "") {
  error.country = "please choose one";
}
if (values.description === "") {
  error.description = "please enter description";
}
if (values.description && (values.description.length <= 20 || values.description.length > 60)) {
  error.description = "Description must be between 20 to 60 characters";
}
      return error;
    },
    onSubmit: async (values) => {  
      try {
        // toastId.current = toast.loading('wait a second', {
        //     position: "bottom-right",
        //     autoClose: true,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //     });
        // const id=toast.loading('wait a second', {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        //   });
        // toast("Default Notification !");
        // toast("Default Notification !");
    // console.log(dish_name)
   
        const server = await axios.put(`${config.api}/admin/edit_dishes/${_id}`, values);
        // toast.update(toastId.current, {
        //   type: toast.TYPE.SUCCESS,
        //   autoClose: 50000,
        //   closeButton: null 
        // });
       // toast.update(toastId.current,{
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        //   });
        // if (
        //   server.data.message ==="Dish name already there, use another"
        // ) {
        //   toast.warn(`${server.data.message}`, {
        //     position: "bottom-right",
        //     autoClose: 4000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     });
        // }
        if (server.data.message === "Changes updated successfully") {
          toast.success(`${server.data.message}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
setTimeout(()=> navigate("/admin_dashboard"), 3500)
setTimeout(()=> formik.resetForm(), 3000)


        }
       
      } catch (error) {
        alert("error");
      }
    }
  });
  

// const backNavigate=()=>{
//   navigate("/admin_dashboard")
// }

  return (
    <>
    <div className="add_dishes_bg">
      <form  className="add_box" >
        {/* < className="add_groups"> */}

        <h2>Edit Dishes</h2>
        <input
          type="text"
          placeholder="Dish name"
          name="dish_name"
          value={formik.values.dish_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          id="add_input"
          className={`
              ${
                formik.touched.dish_name && formik.errors.dish_name
                  ? "error-box"
                  : ""
              }
              ${
                formik.touched.dish_name && !formik.errors.dish_name
                  ? "success-box"
                  : ""
              }

              `}
        />
        {formik.touched.dish_name && formik.errors.dish_name ? (
          <span className="add_err">{formik.errors.dish_name} </span>
        ) : null}

        <div id="add_div_row">
          <div id="add_div_row_inside">
            <input
              type="radio"
              name="veg_or_nonveg"
              // value={formik.values.vegetarian}
              value="vegetarian"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              
            />
            <label className="add_label_main">Vegetarian</label>
          </div>

          <div id="add_div_row_inside">
            <input
              type="radio"
              name="veg_or_nonveg"
              // value={formik.values.vegetarian}
              value="non-vegetarian"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label className="add_label_main">Non-Vegetarian</label>
          </div>
        </div>
        {formik.touched.veg_or_nonveg && formik.errors.veg_or_nonveg ? (
          <span className="login_err">{formik.errors.veg_or_nonveg} </span>
        ) : null}

        <div id="add_div">
          <input
            type="text"
            placeholder="Image URL"
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="add_input_div"
            className={`
              ${formik.touched.url && formik.errors.url ? "error-box" : ""}
              ${formik.touched.url && !formik.errors.url ? "success-box" : ""}

              `}
          />
          <label className="add_label">(image should be 1:1 ratio)</label>

          {formik.touched.url && formik.errors.url ? (
            <span className="login_err">{formik.errors.url} </span>
          ) : null}
        </div>
        

        <select
          // placeholder=" Name"
          name="dish_type"
          value={formik.values.dish_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          id="add_input"
          className={`
              ${
                formik.touched.dish_type && formik.errors.dish_type
                  ? "error-box"
                  : ""
              }
              ${
                formik.touched.dish_type && !formik.errors.dish_type
                  ? "success-box"
                  : ""
              }

              `}
        >
          <option value="">select type</option>
          <option value="berger">burger</option>
          <option value="bbq">bbq</option>
          <option value="cakes">cakes</option>
          <option value="desserts">desserts</option>
          <option value="fries">fries</option>
          <option value="noodles">nooodels</option>
          <option value="pizza">pizza</option>
          <option value="pasta">pasta</option>
          <option value="rice">rice</option>
          <option value="soups">soups</option>
        </select>
        {formik.touched.dish_type && formik.errors.dish_type ? (
          <span className="add_err">{formik.errors.dish_type} </span>
        ) : null}

        <div id="add_div_row_70">
          <input
            type="number"
            placeholder="price"
            name="price"
            // value={"rs"}
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="add_input"
            className={`
              ${
                formik.touched.price && formik.errors.price ? "error-box" : ""
              }
              ${
                formik.touched.price && !formik.errors.price
                  ? "success-box"
                  : ""
              }

              `}
          />
         

          <input
            type="number"
            placeholder="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="add_input"
            className={`
              ${
                formik.touched.quantity && formik.errors.quantity
                  ? "error-box"
                  : ""
              }
              ${
                formik.touched.quantity && !formik.errors.quantity
                  ? "success-box"
                  : ""
              }

              `}
          />
        
        </div>
        {formik.touched.quantity && formik.errors.quantity ? (
            <span className="add_err">{formik.errors.quantity} </span>
          ) : null}
           {formik.touched.price && formik.errors.price ? (
            <span className="add_err">{formik.errors.price} </span>
          ) : null}

        <div id="add_div_row">
          <div id="add_div_row_inside">
            <input
              type="radio"
              name="status"
              // value={formik.values.vegetarian}
              value="available"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label className="add_label_main">Available</label>
          </div>

          <div id="add_div_row_inside">
            <input
              type="radio"
              name="status"
              // value={formik.values.vegetarian}
              value="non-available"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <label className="add_label_main">Not available</label>
          </div>
        </div>
        {formik.touched.status && formik.errors.status ? (
          <span className="add_err">{formik.errors.status} </span>
        ) : null}

        <select
          // placeholder=" Name"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          id="add_input"
          className={`
              ${
                formik.touched.country && formik.errors.country
                  ? "error-box"
                  : ""
              }
              ${
                formik.touched.country && !formik.errors.country
                  ? "success-box"
                  : ""
              }

              `}
        >
          <option value="">select country</option>
          <option value="north_indian">north indian</option>
          <option value="south_indian">south_indian</option>
          <option value="italian">italian</option>
          <option value="chinese">chinese</option>
          <option value="american">american</option>
        </select>
        {formik.touched.country && formik.errors.country ? (
          <span className="add_err">{formik.errors.country} </span>
        ) : null}

        <textarea
          type="text"
          placeholder="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          id="add_input_textarea"
          className={`
              ${
                formik.touched.description && formik.errors.description
                  ? "error-box"
                  : ""
              }
              ${
                formik.touched.description && !formik.errors.description
                  ? "success-box"
                  : ""
              }

              `}
        />
        {formik.touched.description && formik.errors.description ? (
          <span className="add_err">{formik.errors.description} </span>
        ) : null}

        <button
          onClick={formik.handleSubmit}
          type="submit"
          className="login_btn"
        >Update</button>
    
    <Link to="/admin_dashboard" className="page_back_btn">
          Back
        </Link>
      </form>
    
      {/* </div> */}
    </div>
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
  )
}

export default Edit_dishes