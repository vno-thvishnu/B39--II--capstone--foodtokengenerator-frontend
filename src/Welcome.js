import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Allmodal from "./Modals/Allmodal";
import "./Design.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";

import burger from "./vectors/burger a.png";
import logowhite from "./vectors/logo4.png";

function Welcome() {
  const [sidebar, setSidebar] = useState(true);
  const [rightpart, setRightpart] = useState(true);

  const [firsttouch, setFirsttouch] = useState(false);

  const forsidebar = () => {
    setSidebar(!sidebar);
    setRightpart(!rightpart);
  };
  const fortouch = () => {
    if (!firsttouch) {
      setFirsttouch(true);
      forsidebar();
    }
    // setFirsttouch(true)
    // rightpart(false)
  };

  return (
    <>
      <div className="overall_bg">
        <div className="welcome_sidebar">
          <img className="logo" src={logowhite} />
          <div className="display_bar">
            <h5>Order Online Now</h5>
          </div>
        </div>
        <div className={sidebar ? "welcome_content" : "welcome_content_off"}>
          <div className="welcome_content_one">
            <div className="title">
              <h3 className="the">The</h3>
              <h1 className="on">ON!</h1>
              <h3 className="kitchen_club">kitchen</h3>
            </div>
            <div className="content">
              <h2 className="oldnew">Old & New</h2>
              <h5 className="dishes">DISHES</h5>
              <p>
                we are specialist making old and new foods, spices. we serve
                with our love .<br />
                successfully finished 20years. Lorem Ipsum is simply dummy text
                of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s
              </p>
            </div>
          </div>

          <div className="welcome_content_two">
            <div className="image1">
              <img className="vectorone" src={burger} />
            </div>
          </div>
        </div>

        <div className={rightpart ? "right_part" : "right_part_off"}>
          <div className="swipe">
            <div className="swipe_btn" onClick={forsidebar}>
              <p>
                {rightpart ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
              </p>
            </div>
          </div>
          <div className="for_outlets" onClick={fortouch}>
            <Outlet />
          </div>
          <Allmodal />
        </div>
      </div>
    </>
  );
}

export default Welcome;
