import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { config } from "../config";

import "./Add_dishes.css";
import { Link } from "react-router-dom";

function Add_dishes() {
  const formik = useFormik({
    initialValues: {
      dish_name: "",
      veg_or_nonveg: "",
      url: "",
      dish_type: "",
      price: "",
      quantity:"",
      status:"",
      country:"",
    },
    validate: (values) => {
      let error = {};

      if (values.name === "") {
        error.name = "please enter Name";
      }
      if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
        error.name = "Name must be between 3 to 15 characters";
      }
      
      return error;
    },
    onSubmit: async (values) => {
      try {
        const server = await axios.post(`${config.api}/user/register`, values);
        if (
          server.data.message === "Email-id already registered, use another"
        ) {
        }
        if (server.data.message === "User Account created successfully") {
        }
        if (server.data.message === "Admin account finded in this email_id") {
        }
      } catch (error) {
        alert("error");
      }
    },
  });
  return (
    <>
      <div className="add_dishes_bg">
        <form className="add_box">
          {/* < className="add_groups"> */}

          <h2>Add Dishes</h2>
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
                ${formik.touched.dish_name && formik.errors.dish_name ? "error-box" : ""}
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
          <div
            id="add_div_row"
          
          >
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

          <div id="add_div">
            <input
              type="url"
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
           {/* {formik.touched.url && formik.errors.url ? (
            <span className="login_err">{formik.errors.url} </span>
          ) : null} */}


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

<div
            id="add_div_row_70"
          
          >
           
            <input
            type="text"
            placeholder="price"
            name="price"
            value={"rs"}
            // value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="add_input"
            className={`
                ${formik.touched.price && formik.errors.price ? "error-box" : ""}
                ${
                  formik.touched.price && !formik.errors.price
                    ? "success-box"
                    : ""
                }

                `}
          />
          {formik.touched.price && formik.errors.price ? (
            <span className="add_err">{formik.errors.price} </span>
          ) : null}
            

            
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
                ${formik.touched.quantity && formik.errors.quantity ? "error-box" : ""}
                ${
                  formik.touched.quantity && !formik.errors.quantity
                    ? "success-box"
                    : ""
                }

                `}
          />
          {formik.touched.price && formik.errors.price ? (
            <span className="add_err">{formik.errors.price} </span>
          ) : null}
            
          </div>


          <div
            id="add_div_row"
          
          >
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
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            id="add_input_textarea"
            className={`
                ${
                  formik.touched.country && formik.errors.country
                    ? "error-box"
                    : ""
                }
                ${
                  formik.touched.country && !formik.errors.countyr
                    ? "success-box"
                    : ""
                }

                `}
          />
          {formik.touched.country && formik.errors.country ? (
            <span className="add_err">{formik.errors.country} </span>
          ) : null}
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="login_btn"
          >
            Create
          </button>
          <Link to="/" className="back_btn">
            Back
          </Link>
        </form>
        {/* </div> */}
      </div>
    </>
  );
}

export default Add_dishes;
