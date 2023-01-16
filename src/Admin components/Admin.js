import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  './admin.css'
import {MdAddBox} from 'react-icons/md';

function Admin() {
  const navigate = useNavigate();

const openadddishes=()=>{
navigate("/admin_add_dishes")
}

  return (
<>
<div className='_bg'>
<div className="nav_bar">
  <div className='company_name'>
    <span>ON!</span> {""}
    <span>kitchen</span>
  </div>
  <div className='others'>

  <span>|</span>
  <span></span>

  <span>My account</span>


  </div>
</div>
<h3 className='head'>
  Admin - Dashboard
</h3>

<div className='all_contents'>
<div className='main_content'>
<div className='center_btn'>
<div className='inside_center_btn' onClick={openadddishes}>
<MdAddBox/>

<Link className='add_btn'> 
 Add New Dishes</Link>
</div>

  </div>
</div>
<div className='side_content'>

</div>
</div>

</div>


</>
  )
}

export default Admin